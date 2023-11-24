import { Document } from 'mongoose';

interface _IDbImage extends Document {
  file_id: string;
  filename: string;
  mimetype: string;
}

interface _IAddImage {
  file_id: string;
  filename: string;
  mimetype: string;
}

interface _Image {
  _id: string;
  file_id: string;
  filename: string;
  mimetype: string;
}

interface _IDbUserImage extends _IDbImage {
  userId: string;
}

type _IDbVehicleImage = _IDbImage;

interface _IUserImage extends _Image {
  userId: string;
}

type _IVehicleImage = _Image;

type _IAddVehicleImage = _IAddImage;

interface _IAddUserImage extends _IAddImage {
  userId: string;
}

interface _ICloudRes {
  file_id: string;
  filename: string;
  mimetype: string;
  publicUrl: string;
}

export {
  _IUserImage,
  _IDbUserImage,
  _IAddUserImage,
  _ICloudRes,
  _IAddVehicleImage,
  _IDbVehicleImage,
  _IVehicleImage,
};
