/* eslint-disable prettier/prettier */
import { registerAs } from '@nestjs/config';

const StorageConfig = {
  path: process.env.TOKEN_PATH,
  mediaBucket: process.env.IMAGES_BUCKET,
  url: process.env.GCP_URL,
};

export const GCPStorageConfig = registerAs(
  'GCPStorageConfig',
  () => StorageConfig,
);

class StorageFile {
  buffer: Buffer;
  metadata: Map<string, string>;
  contentType: string;
}

export { StorageFile };
