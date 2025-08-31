import axiosInstance, { BASE_URL } from "./root";
import axios from "axios";

const PAYMENT_BASE_URL = `payments`;
// export const initiatePayment = async ({
//   mobileNumber,

// }: any) => {
//       const url = `${PAYMENT_BASE_URL}/initiate-payment`;
//       const config: _IApiConfig<any> = {
//         url: url,
//         method: "POST",
//         data: {
//           customerMobileNumber: mobileNumber,
//           centerId: "cid",
//           customerId: "cuid",
//           slotId: "slid",
//         },
//       };

//       return callApi<any, any>(config);
// };




export const initiatePayment = async ({ mobileNumber }: any) => {
  try {
    const response = await axiosInstance<{ checkoutDirectUrl: string; checkoutUrl: string; message: string; ok: boolean}>({
      url: `${BASE_URL}${PAYMENT_BASE_URL}/initiate-payment`,
      method: "POST",
      data: {
        customerMobileNumber: mobileNumber,
        centerId: "cid",
        customerId: "cuid",
        slotId: "slid",
      },
      withCredentials: true,
    });

    return response.data; // Handle the response as needed
  } catch (error: any) {
    console.error("Error requesting money:", error);
    throw error;
  }
};
