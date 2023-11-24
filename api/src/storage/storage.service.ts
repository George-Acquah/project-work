import { DownloadResponse, Storage, SaveOptions } from '@google-cloud/storage';
import { BadRequestException, Injectable } from '@nestjs/common';
import { StorageFile } from './storage.config';
import { parse } from 'path';
import { _IFile } from 'src/shared/interfaces/file.interface';
import { _ICloudRes } from 'src/shared/interfaces/images.interface';
import { ConfigService } from '@nestjs/config';
import { getPath } from 'src/shared/utils/global.utils';

@Injectable()
export class StorageService {
  private storage: Storage;
  private bucket: string;
  private tokenPath: string;

  constructor(private readonly configService: ConfigService) {
    const { mediaBucket, path } = this.configService.get('GCPStorageConfig');

    this.tokenPath = getPath(path);
    console.debug(this.tokenPath);

    this.storage = new Storage({
      keyFilename: this.tokenPath,
    });

    this.bucket = mediaBucket;
  }

  private getFullFilePath(destination: string, uploadedFile: _IFile): string {
    return this.setDestination(destination) + this.setFilename(uploadedFile);
  }

  private getPublicUrl(fileName: string): string {
    return `https://storage.googleapis.com/${this.storage.bucket(
      this.bucket,
    )}/${fileName}`;
  }

  private setDestination(destination: string): string {
    let escDestination = '';
    escDestination += destination
      .replace(/^\.+/g, '')
      .replace(/^\/+|\/+$/g, '');
    if (escDestination !== '') escDestination = escDestination + '/';
    return escDestination;
  }

  private setFilename(uploadedFile: _IFile): string {
    const fileName = parse(uploadedFile.originalname);
    return `${fileName.name}-${Date.now()}${fileName.ext}`
      .replace(/^\.+/g, '')
      .replace(/^\/+/g, '')
      .replace(/\r|\n/g, '_');
  }

  async uploadFile(
    name: string,
    mimetype: string,
    buffer: Buffer,
    filename: string,
    bucket: string,
  ): Promise<_ICloudRes> {
    try {
      const options: SaveOptions = {
        contentType: mimetype,
      };
      const file = this.storage.bucket(bucket).file(name);
      // Check if a file with the same name already exists
      const [exists] = await file.exists();

      if (exists) {
        throw new Error('A file with the same name already exists.');
      }

      await file.save(buffer, options);

      const publicUrl = this.getPublicUrl(file.name);

      // Optionally, you can store metadata in a database
      const fileInfo: _ICloudRes = {
        filename,
        mimetype,
        file_id: file.id,
        publicUrl,
      };

      return fileInfo;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new BadRequestException('File upload failed. Please try again.');
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
      Object.entries(metadata || {}),
    );
    storageFile.contentType = storageFile.metadata.get('contentType');
    return storageFile;
  }
}
