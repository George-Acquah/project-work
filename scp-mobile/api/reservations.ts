import { callApi } from "./shared";

const CENTER_BASE_URL = `owner/parking-center`;

export interface _IReservationParams {
  start_time: Date;
  start_date: Date;
  reservation_duration: number;
  callbackUrl: string;
}
// :center_id/slots/:slot_id/reserve-slot
export async function RequestReservation(
  center_id: string,
  pageSize: number = 20, 
  params: _IReservationParams,
) {
  const req_url = `${CENTER_BASE_URL}/${center_id}/available-slots?currentPage=1&items=${pageSize}`;
  const config: _IApiConfig<typeof params> = {
    url: `${req_url}`,
    method: "POST",
    data: params,
    callbackUrl: params.callbackUrl
  };

  return callApi<_IFormattedAvSlot[], typeof params>(config);
}

export async function reserveSlot(
  center_id: string,
  slot_id: string,
  vehicle_no: string,
  params: _IReservationParams
) {
  const req_url = `${CENTER_BASE_URL}/${center_id}/slots/${slot_id}/reserve-slot`;
  const config: _IApiConfig<typeof params> = {
    url: `${req_url}?vehicle_no=${vehicle_no}`,
    method: "POST",
    data: params,
    callbackUrl: params.callbackUrl
  };

  return callApi<_Reservation, typeof params>(config);
}

export interface _IReservationResponse {
  slotId: string; // Unique identifier for the slot
  reservationId: string; // Unique identifier for the reservation
  cost: number; // Cost of the reservation
  numberPlate: string; // Vehicle's number plate
  startTime: Date; // Start time of the reservation
  duration: number; // Duration of the reservation in minutes
  image?: string; // Optional image associated with the reservation (if applicable)
}
export interface _Reservation{
  reservation: _IReservationResponse;
  reservationToken: string;
}