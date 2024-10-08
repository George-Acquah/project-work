import { DownloadResponse, Storage, SaveOptions } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { StorageFile } from '../shared/configs/storage.config';
import { _ICloudRes } from 'src/shared/interfaces/images.interface';
import { ConfigService } from '@nestjs/config';
import { GCP_STORAGE_KEY } from 'src/shared/configs/constants.config';
import { _IGCPStorage } from 'src/shared/configs/types.config';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;
  private cache: Map<string, { url: string; expiresAt: number }>; // In-memory cache for signed URLs
  private cacheExpiry: number; // Cache expiration time in seconds

  constructor(private readonly configService: ConfigService) {
    const { mediaBucket, path } =
      this.configService.get<_IGCPStorage>(GCP_STORAGE_KEY);

    const credentials = JSON.parse(path);
    this.storage = new Storage({ credentials });

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
      } else {
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

  // Add a new method to stream the image directly
  async streamFileToResponse(
    fileName: string,
    response: Response
  ): Promise<void> {
    try {
      const file = this.storage.bucket(this.bucket).file(fileName);

      // Check if the file exists
      const [exists] = await file.exists();
      if (!exists) {
        console.error('File does not exist:', fileName);
        throw new BadRequestException('File not found.');
      }

      console.log('FILE EXISTS.......');

      // Get the file metadata to set the correct content type
      const [metadata] = await file.getMetadata();
      console.log(`Streaming file with MIME type: ${metadata.contentType}`);
      response.set(
        'Content-Type',
        metadata.contentType || 'application/octet-stream'
      );

      // Stream the file to the response
      // file.createReadStream().pipe(response);
      // Stream the file to the response
      file
        .createReadStream()
        .on('error', (err) => {
          console.error('Error during streaming:', err);
          response.status(500).send('Internal Server Error');
        })
        .pipe(response)
        .on('finish', () => {
          console.log('File streaming completed:', fileName);
        });
    } catch (error) {
      console.error('Error in streamFileToResponse method:', error);
      throw new BadRequestException(
        error.message || 'Error streaming file. Please try again.'
      );
    }
  }

  // async getWithMetaData(path: string): Promise<StorageFile> {
  //   const [bucketObj] = await this.storage
  //     .bucket(this.bucket)
  //     .file(path)
  //     .getMetadata();
  //   const { metadata } = bucketObj;
  //   const fileResponse: DownloadResponse = await this.storage
  //     .bucket(this.bucket)
  //     .file(path)
  //     .download();
  //   const [buffer] = fileResponse;

  //   const storageFile = new StorageFile();
  //   storageFile.buffer = buffer;
  //   storageFile.metadata = new Map<string, string>(
  //     Object.entries(metadata || {})
  //   );
  //   storageFile.contentType = storageFile.metadata.get('contentType');
  //   return storageFile;
  // }

  clearCache(fileName: string) {
    this.cache.delete(fileName);
  }
}
