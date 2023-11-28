// import { fetcher } from "./data";
// import { endpoints } from "./endpoints";
// import { formatApplicantsTable } from "./utils";

// async function fetchFilteredApplicants(
//   applicant: string,
//   currentPage: number,
//   pageSize: number,
// ) {
//   // await new Promise((resolve) => setTimeout(resolve, 5000));
//   const url = endpoints.USERS.APPLICANTS.BASE;
//   const response = await fetcher<_IUser[]>(
//     `${url}?applicants=${applicant}&currentPage=${currentPage}&totalPages=${pageSize}`,
//     "GET",
//     "no-store"
//   );
//   return formatApplicantsTable(response);
// }

// async function fetchApplicantById(id: string) {

//   const url = endpoints.USERS.APPLICANTS.BASE;
//   const response = await fetcher<_IUser>(
//     `${url}/${id}`,
//     "GET",
//     "no-store"
//   );
//   return response;
// }

// async function fetchRoles() {
//     const url = endpoints.USERS.APPLICANTS.BASE;
//     const response = await fetcher<string[]>(`${url}/roles`, "GET", "no-store");
    
//     return response;
// }

// async function fetchApplicantsPage(applicant: string, pageSize: number) {
//   console.log('about to send: ', pageSize);
//   const url = `${endpoints.USERS.APPLICANTS.BASE}/total-pages`;
//   const response = await fetcher<number>(
//     `${url}?applicants=${applicant}&totalPages=${pageSize}`, "GET", "no-cache"
//   );
//   return response;
// }

// export {
//   fetchFilteredApplicants,
//   fetchApplicantsPage,
//   fetchApplicantById,
//   fetchRoles,
// }