import { callApi } from "./shared";

const CENTER_BASE_URL = `owner/parking-center`;

export async function filteredCenters(
  centers: string = "",
  currentPage: number = 1,
  pageSize: number = 5
) {
  // const { centers, currentPage, pageSize } = params;
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
  };

  return callApi<_IParkingCenter[]>(config);
}

export async function availableCenters(
  centers: string,
  currentPage: number,
  pageSize: number
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/available?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
    toast: true
  };

  return callApi<_IParkingCenter[]>(config);
}

export async function singleCenter(
  centers_id: string
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/${centers_id}`,
    method: "GET",
  };

  return callApi<_IParkingCenter>(config);
}

export async function popularCenters(
  centers: string,
  currentPage: number,
  pageSize: number
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/popular?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
    toast: true,
  };
  return callApi<_IParkingCenter[]>(config);
}

export async function nearbyCenters(
  centers: string,
  currentPage: number,
  pageSize: number
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/nearby?centers=${centers}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
    toast: true,
  };
  return callApi<_IParkingCenter[]>(config);
}

export async function addCenterAddress(
  center_id: string,
  data: _IAddress
) {
  const config: _IApiConfig = {
    url: `${CENTER_BASE_URL}/${center_id}/add-address`,
    method: "POST",
    toast: true,
  };
  return callApi<_IParkingCenter[]>(config);
}
