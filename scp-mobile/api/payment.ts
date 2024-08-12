// import { callApi } from "./shared";

// const PAYMENT_BASE_URL = `payments`;
// export const requestMoney = async ({
//   mobileNumber,
//   amount,
//   title,
//   description,
//   clientReference,
//   callbackUrl,
//   returnUrl,
//   cancellationUrl,
//   logo,
// }: any) => {
//       const url = `${PAYMENT_BASE_URL}/request-money?callBackUrl=${callbackUrl}&returnUrl=${returnUrl}&cancellationUrl=${cancellationUrl}`;

//       const config: _IApiConfig<any> = {
//         url: url,
//         method: "POST",
//         data: {
//           mobileNumber,
//           amount,
//           title,
//           description,
//           clientReference,
//           logo,
//         },
//       };

//       return callApi<any, any>(config);
// };


import axios from "axios";

export const requestMoney = async ({
  mobileNumber,
  amount,
  title,
  description,
  clientReference,
  callbackUrl,
  returnUrl,
  cancellationUrl,
  logo,
}: any) => {
  try {
    console.log(callbackUrl);
    const response = await axios.post(
      `http://192.168.43.215:8080/payments/request-money?callbackUrl=${callbackUrl}&returnUrl=${returnUrl}&cancellationUrl=${cancellationUrl}`, // Replace with your backend URL
      {
        mobileNumber,
        amount,
        title,
        description,
        clientReference,
        logo,
      },
    );

    return response.data; // Handle the response as needed
  } catch (error: any) {
    console.error(
      "Error requesting money:",
      error
    );
    throw error;
  }
};
