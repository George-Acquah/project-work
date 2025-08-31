import { _ISlotImage } from '../interfaces/images.interface';
import {
  _IFormattedReservation,
  _IPaymentReservation
} from '../interfaces/refactored/slots.interface';
import { _INewProfile } from '../interfaces/refactored/user.interface';
import { _IDbSlotReservation } from '../interfaces/slot.interface';
import { convertDateToString } from '../utils/global.utils';

export function sanitizeReservationsFn(
  reservation: _IDbSlotReservation & {
    slot_image: _ISlotImage[];
    slot_name: string;
    driver_profile: _INewProfile;
    vehicle_no: string;
  }
  // reservation: any
): _IFormattedReservation {
  // Extract first image's filename if available
  const image = reservation?.slot_image[0]?.file_id ?? null;
  // console.log(reservation?.vehicle as unknown as any);
  const driver_name = reservation?.driver_profile
    ? `${reservation?.driver_profile?.first_name} ${reservation?.driver_profile?.last_name}`
    : 'no name';

  // Format the vehicle object according to _IFormattedVehicle interface
  const formattedReservation = {
    _id: reservation._id.toString() as string,
    image: image,
    slot_name: reservation.slot_name ?? 'Unknown',
    driver_name,
    vehicle_no: reservation?.vehicle_no ?? 'not set',
    wait_time: reservation.wait_time,
    time_reserved: convertDateToString(
      reservation.time_of_reservation.toDateString() ??
        new Date().toDateString()
    ),
    start_time: convertDateToString(
      reservation.start_time.toDateString() ?? new Date().toDateString()
    ),
    end_time: convertDateToString(
      reservation.end_time.toDateString() ?? new Date().toDateString()
    ),
    duration: reservation.duration_of_reservation,
    cost: reservation.cost_of_reservation,
    status: reservation.isValid ? 'set' : 'not set'
  };

  return formattedReservation;
}

export function sanitizeReservationsPaymentFn(
  reservation: _IDbSlotReservation & {
    driver: any;
    center: any;
  }
  // reservation: any
): _IPaymentReservation {
  // Format the vehicle object according to _IFormattedVehicle interface
  const customerId =
    typeof reservation?.driver !== 'string'
      ? (reservation?.driver.toString() as unknown as string)
      : reservation?.driver;
  const centerId =
    typeof reservation?.center !== 'string'
      ? (reservation?.center.toString() as unknown as string)
      : reservation?.center;
  const formattedReservation = {
    _id: reservation._id.toString() as string,
    vehicle_no: reservation?.number_plate,
    cost: reservation.cost_of_reservation,
    customerId,
    centerId,
    slotId: reservation.slot_id.toString()
  };

  return formattedReservation;
}
