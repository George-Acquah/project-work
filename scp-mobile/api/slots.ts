import { BASE_URL } from "./root";
import { callApi } from "./shared";

const CENTER_BASE_URL = `${BASE_URL}owner/parking-center/slots`;

export async function filteredSlots(
  centers: string = "",
  currentPage: number = 1,
  pageSize: number = 5
) {
  // const { centers, currentPage, pageSize } = params;
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
  };

  return callApi<_ISlot[]>(config);
}

export async function singleSlot(centers_id: string) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/${centers_id}`,
    method: "GET",
  };

  return callApi<_ISlot>(config);
}

export async function popularSlots(
  centers: string,
  currentPage: number,
  pageSize: number
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/popular?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
  };
  return callApi<_ISlot[]>(config);
}


export async function nearbySlots(
  centers: string,
  currentPage: number,
  pageSize: number
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/nearby?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
  };
  return callApi<_ISlot[]>(config);
}

export async function availableSlots(
  centers: string,
  currentPage: number,
  pageSize: number
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/available?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
  };

  return callApi<_ISlot[]>(config);
}

