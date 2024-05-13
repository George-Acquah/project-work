/* eslint-disable prettier/prettier */
import { DownloadResponse, Storage, SaveOptions } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { StorageFile } from './storage.config';
import { _ICloudRes } from 'src/shared/interfaces/images.interface';
import { ConfigService } from '@nestjs/config';
import { getPath } from 'src/shared/utils/global.utils';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;
  private tokenPath: string;
  private cache: Map<string, { url: string; expiresAt: number }>; // In-memory cache for signed URLs
  private cacheExpiry: number; // Cache expiration time in seconds
  // private url: string;

  constructor(private readonly configService: ConfigService) {
    const {
      mediaBucket,
      path,
      url
    }: { mediaBucket: string; path: string; url: string } =
      this.configService.get('GCPStorageConfig');

    this.tokenPath = getPath(path);
    console.debug(this.tokenPath);

    // this.url = url;

    this.storage = new Storage({
      keyFilename: this.tokenPath
    });

    this.bucket = mediaBucket;
    this.cache = new Map(); // initialiizes the cache
    this.cacheExpiry = 600; // Setting the default expiry of the cache
  }

  private async getSignedUrl(
    fileName: string,
    expiresIn = 300
  ): Promise<string> {
    if (this.cache.has(fileName)) {
      const cachedUrl = this.cache.get(fileName);
      const isExpired = Date.now() > cachedUrl.expiresAt;
      if (!isExpired) {
        return cachedUrl.url; // Use cached URL if not expired
      }
      else {
        this.clearCache(fileName);
      }
    }

    const file = this.storage.bucket(this.bucket).file(fileName);
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: Date.now() + expiresIn * 1000 // Expires in 5 minutes by default
    });
    this.cache.set(fileName, {
      url,
      expiresAt: Date.now() + this.cacheExpiry * 1000
    });
    return url;
  }

  async uploadFile(
    name: string,
    mimetype: string,
    buffer: Buffer,
    filename: string
  ): Promise<_ICloudRes> {
    try {
      const options: SaveOptions = {
        contentType: mimetype
      };
      const file = this.storage.bucket(this.bucket).file(name);
      // Check if a file with the same name already exists
      const [exists] = await file.exists();

      if (exists) {
        throw new Error('A file with the same name already exists.');
      }

      await file.save(buffer, options);

      const publicUrl = await this.getSignedUrl(file.name);
      console.log(publicUrl);

      // Optionally, you can store metadata in a database
      const fileInfo: _ICloudRes = {
        filename,
        mimetype,
        file_id: file.id,
        publicUrl
      };

      return fileInfo;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new BadRequestException(
        error.message || 'File upload failed. Please try again.'
      );
    }
  }

  async delete(path: string) {
    await this.storage
      .bucket(this.bucket)
      .file(path)
      .delete({ ignoreNotFound: true });
  }

  async get(path: string): Promise<StorageFile> {
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;
    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>();
    return storageFile;
  }

  async getWithMetaData(path: string): Promise<StorageFile> {
    const [bucketObj] = await this.storage
      .bucket(this.bucket)
      .file(path)
      .getMetadata();
    const { metadata } = bucketObj;
    const fileResponse: DownloadResponse = await this.storage
      .bucket(this.bucket)
      .file(path)
      .download();
    const [buffer] = fileResponse;

    const storageFile = new StorageFile();
    storageFile.buffer = buffer;
    storageFile.metadata = new Map<string, string>(
      Object.entries(metadata || {})
    );
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }

  clearCache(fileName: string) {
    this.cache.delete(fileName);
  }
}

// private getFullFilePath(destination: string, uploadedFile: _IFile): string {
//   return this.setDestination(destination) + this.setFilename(uploadedFile);
// }

//   private setDestination(destination: string): string {
//   let escDestination = '';
//   escDestination += destination
//     .replace(/^\.+/g, '')
//     .replace(/^\/+|\/+$/g, '');
//   if (escDestination !== '') escDestination = escDestination + '/';
//   return escDestination;
// }

// private setFilename(uploadedFile: _IFile): string {
//   const fileName = parse(uploadedFile.originalname);
//   return `${fileName.name}-${Date.now()}${fileName.ext}`
//     .replace(/^\.+/g, '')
//     .replace(/^\/+/g, '')
//     .replace(/\r|\n/g, '_');
// }
