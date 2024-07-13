import { registerAs } from '@nestjs/config';
import { GCP_STORAGE_KEY } from './constants.config';
import { _IGCPStorage } from './types.config';

const StorageConfig: _IGCPStorage = {
  path: process.env.TOKEN_PATH,
  mediaBucket: process.env.IMAGES_BUCKET,
  url: process.env.GCP_URL
};

export const GCPStorageConfig = registerAs(
  GCP_STORAGE_KEY,
  () => StorageConfig
);

class StorageFile {
  buffer: Buffer;
  metadata: Map<string, string>;
  contentType: string;
}

export { StorageFile };
