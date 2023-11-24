import { registerAs } from '@nestjs/config';

const StorageConfig = {
  path: process.env.TOKEN_PATH,
  mediaBucket: process.env.STORAGE_MEDIA_BUCKET,
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
