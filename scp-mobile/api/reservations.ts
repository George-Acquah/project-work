import { callApi } from "./shared";

const CENTER_BASE_URL = `owner/parking-center`;

export interface _IReservationParams {
  start_time: Date;
  start_date: Date;
  reservation_duration: number;
  callbackUrl: string;
}

interface _IRequestReservationResponse {
  documents: any[];
  totalPages: number;
}
// :center_id/slots/:slot_id/reserve-slot
export async function RequestReservation(
  center_id: string,
  pageSize: number = 20, 
  params: _IReservationParams,
) {
  const req_url = `${CENTER_BASE_URL}/${center_id}/available-slots`;
  const config: _IApiConfig<typeof params> = {
    url: `${req_url}`,
    method: "GET",
    // data: params,
    callbackUrl: params.callbackUrl
  };

  return callApi<_IRequestReservationResponse, typeof params>(config);
}

export async function reserveSlot(
  center_id: string,
  slot_id: string,
  vehicle_id: string,
  params: _IReservationParams
) {
  const req_url = `${CENTER_BASE_URL}/${center_id}/slots/${slot_id}/reserve-slot`;
  const config: _IApiConfig<typeof params> = {
    url: `${req_url}?vehicle_id=${vehicle_id}`,
    method: "POST",
    data: params,
    callbackUrl: params.callbackUrl
  };

  return callApi<_ISlotReservation, typeof params>(config);
}
