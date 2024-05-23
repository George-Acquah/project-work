import { BASE_URL } from "./root";
import { callApi } from "./shared";

const VEHICLE_BASE_URL = `${BASE_URL}/customer/vehicle`;

export async function allVehicles(
  vehicles: string = "",
  currentPage: number = 1,
  pageSize: number = 5
) {
  // const { centers, currentPage, pageSize } = params;
  const config: _IApiConfig = {
    url: `${VEHICLE_BASE_URL}?vehicles=${vehicles}&currentPage=${currentPage}&size=${pageSize}`,
    method: "GET",
  };

  return callApi<_IVehicle[]>(config);
}

export async function filteredVehiclesImages(
  vehicles: string = "",
  currentPage: number = 1,
  pageSize: number = 5
) {
  // const { centers, currentPage, pageSize } = params;
  const config: _IApiConfig = {
    url: `${VEHICLE_BASE_URL}`,
    method: "GET",
  };

  return callApi<_IParkingCenter[]>(config);
}

export async function singleVehicles(vehicle_id: string) {
  // const { centers, currentPage, pageSize } = params;
  const config: _IApiConfig = {
    url: `${VEHICLE_BASE_URL}/${vehicle_id}`,
    method: "GET",
  };

  return callApi<_IParkingCenter>(config);
}