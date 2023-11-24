import { registerAs } from '@nestjs/config';

const StorageConfig = {
  path: process.env.TOKEN_PATH,
  userImageBucket: process.env.USER_IMAGES_BUCKET,
  vehicleImageBucket: process.env.VEHICLE_IMAGES_BUCKET,
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
