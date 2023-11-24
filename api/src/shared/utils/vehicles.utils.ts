import {
  _IDbVehicleImage,
  _IVehicleImage,
} from '../interfaces/images.interface';
import { _IDbVehicle, _IVehicle } from '../interfaces/vehicles.interface';

function sanitizeVehicleImage(images: _IDbVehicleImage[]): _IVehicleImage[] {
  return images.map((image) => {
    const { _id, file_id, filename, mimetype } = image;

    return {
      _id: _id.toString() as string,
      file_id,
      filename,
      mimetype,
    };
  });
}

function sanitizevehicle(vehicle: _IDbVehicle): _IVehicle {
  const { _id, vehicle_no, isVerified, hasSlot, driver } = vehicle;
  const images = vehicle?.images;

  return {
    _id: _id.toString() as string,
    vehicle_no,
    isVerified,
    hasSlot,
    driver,
    images: sanitizeVehicleImage(images) || null,
  };
}

function sanitizeVehicles(vehicles: _IDbVehicle[]): _IVehicle[] {
  return vehicles.map((vehicle) => {
    const { _id, vehicle_no, isVerified, hasSlot, driver, images } = vehicle;
    return {
      _id: _id.toString(),
      vehicle_no,
      isVerified,
      hasSlot,
      driver,
      images: sanitizeVehicleImage(images) || null,
    };
  });
}

export { sanitizevehicle, sanitizeVehicles };
