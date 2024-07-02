import {
  _IDbVehicleNew,
  _IFormattedVehicle
} from '../interfaces/vehicles.interface';
import { convertDateToString } from '../utils/global.utils';

export function sanitizeVehiclesFn(
  vehicle: _IDbVehicleNew
): _IFormattedVehicle {
  // Extract first image's filename if available
  const image =
    vehicle.vehicle_images.length > 0
      ? vehicle.vehicle_images[0].filename
      : null;

  // Check if the vehicle has insurance documents
  const hasInsurance = vehicle.vehicle_insurance.length > 0;

  // Extract the latest registration details
  const latestRegistration = vehicle.vehicle_registration ?? null;

  // Format the vehicle object according to _IFormattedVehicle interface
  const formattedVehicle = {
    _id: vehicle._id.toString() as string,
    image: image,
    vehicle_no: vehicle.vehicle_no as string,
    registration_number: latestRegistration
      ? (latestRegistration.registrationNumber as string)
      : ('' as string),
    description: `Vehicle ${vehicle.vehicle_no}`,
    registration_date: convertDateToString(
      latestRegistration.registrationDate.toDateString() ??
        new Date().toDateString()
    ),
    expiry_date: convertDateToString(
      latestRegistration.expiryDate.toDateString() ?? new Date().toDateString()
    ),
    last_updated: convertDateToString(new Date().toDateString()), // Assuming current date as last updated for this example
    has_insurance: hasInsurance ? 'insured' : 'not insured',
    has_reservation: vehicle.hasSlot ? 'has reservation' : 'no reservation',
    isVerified: vehicle.isVerified ? 'verified' : 'not verified'
  };

  return formattedVehicle;
}
