import { Injectable } from '@nestjs/common';
import { StorageService } from './storage.service';
import { getUniqueFilename } from 'src/shared/utils/uploads.utils';
import { _ICloudRes } from 'src/shared/interfaces/images.interface';

@Injectable()
export class UploadService {
  constructor(private readonly googleStorageService: StorageService) {}
  async uploadFilesToDrive(
    files: { originalname: string; mimetype: string; buffer: Buffer }[]
  ): Promise<Array<_ICloudRes>> {
    const uploadedFiles: Array<_ICloudRes> = [];

    for (const file of files) {
      const filename = getUniqueFilename(file.originalname);

      if (file.mimetype === 'application/pdf') {
        uploadedFiles.push(
          //TODO Some implementation to upload PDF else remove IF ELSE statement
          await this.googleStorageService.uploadFile(
            file.originalname,
            file.mimetype,
            file.buffer,
            filename
          )
        );
      } else {
        uploadedFiles.push(
          await this.googleStorageService.uploadFile(
            file.originalname,
            file.mimetype,
            file.buffer,
            filename
          )
        );
      }
    }

    return uploadedFiles;
  }
}
