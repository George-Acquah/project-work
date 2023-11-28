// // import { AuthRequiredError, NetworkError } from "@/public/lib/exceptions";

// import { auth } from "@/auth";


// const DEV = process.env.NEXT_PUBLIC_API_URL;
// const PROD = "prod-base-url";

// export const API = process.env.NODE_ENV === "development" ? DEV : PROD;

// export async function fetcher<JSON = any>(
//   url: string,
//   method?: RequestMethod,
//   cache?: RequestCache,
//   body?: any,
// ): Promise<JSON> {
//   const fetchUrl = `${API}/${url}`;

//   const options: RequestInit = {
//     method: method ?? "GET",
//     cache: cache ?? "default",
//     credentials: "include",
//     body: JSON.stringify(body) ?? null,
//     headers: await authHeader(),
//   };

//   try {
//     const res = await fetch(fetchUrl, options);

//     if (!res.ok) {
//       if (res.status === 401)
//         throw new Error(`${res.statusText}: Login again and come back.`);

//       throw new Error(`Network response was not ok`);
//     }
//     const data = await res.json();

//     return data;
//   } catch (err: any) {
//     if (err.message.toLowerCase() === "fetch failed")
//     //   throw new NetworkError();
//     throw new Error(`${err.code}: Network Error`);

//     throw new Error(err.message);
//   }
// }

// export async function uploadFetcher(
//   url: string,
//   method?: RequestMethod,
//   cache?: RequestCache
// ): Promise<Response> {
//   const fetchUrl = `${API}/${url}`;
//   console.log(await authHeader());
//   const options: RequestInit = {
//     method: method ? method : "GET",
//     cache: cache ? cache : "default",
//     credentials: "include",
//     headers: await authHeader(),
//   };

//   try {
//     const res = await fetch(fetchUrl, options);

//     if (!res.ok) {
//       if (res.status === 401)
//         throw new Error(`${res.statusText}: Login again and come back.`);

//       throw new Error(`Network response was not ok`);
//     }
//     return res;
//   } catch (err: any) {
//     console.log(err.message);
//     return err.message;
//   }
// }

// export const authHeader = async (isUpload?: boolean) => {
//   const session = await auth();

//   const headers = {
//     "Content-Type": "application/json",
//     authorization:
//       session && session.access_token
//         ? `Bearer ${session.access_token}`
//         : `Bearer invalid-token`,
//   };

//   if (isUpload) {
//     headers["Content-Type"] = "multipart/form-data";
//   }

//   return headers;
// };


