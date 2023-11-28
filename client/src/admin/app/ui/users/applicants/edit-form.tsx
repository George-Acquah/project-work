// 'use client'

// import React, { useState } from 'react';
// import {
//   AtSymbolIcon,
//   UserCircleIcon,
//   TagIcon,
// } from "@heroicons/react/24/outline";
// import { useFormState } from 'react-dom';
// import { updateApplicant } from '@/app/lib/actions';
// import { Select, SelectItem } from '@tremor/react';
// import { dashboardRoutes } from '@/app/lib/routes';
// import { EditBtn } from '../../admin/edit-form-helper';

// interface IEditApplicantForm {
//   applicant: _IUser;
//   roles: string[];
// }

// export default function EditApplicantForm({ applicant, roles }: IEditApplicantForm) {
//   const [selectedRole, setSelectedRole] = useState<string>(applicant.role);

//   // Initial state for form
//   const initialState: any = {
//     message: null,
//     errors: {},
//   };

//   // Function to update applicant with its ID
//   const updateApplicantWithId = updateApplicant.bind(null, applicant.id, selectedRole);

//   // Use useFormState hook for form state
//   const [state, dispatch] = useFormState(updateApplicantWithId, initialState);

//   return (
//     <form action={dispatch}>
//       <div className="rounded-md bg-gray-50 p-4 md:p-6">
//         <div className="lg:flex">
//           {/* Username */}
//           <div className="mb-4 lg:w-1/2 lg:mr-4">
//             <label
//               htmlFor="username"
//               className="mb-2 block text-sm font-medium"
//             >
//               Username
//             </label>
//             <div className="relative">
//               <input
//                 id="username"
//                 name="username"
//                 defaultValue={applicant.username}
//                 placeholder="Enter username"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 disabled
//               />
//               <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>

//           {/* Email */}
//           <div className="mb-4 lg:w-1/2">
//             <label htmlFor="email" className="mb-2 block text-sm font-medium">
//               Email
//             </label>
//             <div className="relative">
//               <input
//                 id="email"
//                 name="email"
//                 defaultValue={applicant.email}
//                 placeholder="Enter email"
//                 className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
//                 disabled
//               />
//               <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             </div>
//           </div>
//         </div>

//         {/* Role */}
//         <div className="mb-4 lg:w-1/2 ">
//           <label htmlFor="role" className="mb-2 block text-sm font-medium">
//             Role
//           </label>
//           <Select
//             id="role"
//             icon={TagIcon}
//             defaultValue={selectedRole}
//             onValueChange={(event) => setSelectedRole(event)}
//           >
//             {roles.map((role) => (
//               <SelectItem key={role} value={role}>
//                 {role}
//               </SelectItem>
//             ))}
//           </Select>
//         </div>
//         {/* isActive */}
//         <fieldset className="mb-4 lg:w-1/2 ">
//           <legend className="mb-2 block text-sm font-medium">
//             Active Status
//           </legend>
//           <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
//             <div className="flex gap-4">
//               <div className="flex items-center">
//                 <input
//                   id="active"
//                   name="isActive"
//                   type="radio"
//                   value="true"
//                   defaultChecked={applicant.isActive}
//                   className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
//                 />
//                 <label
//                   htmlFor="active"
//                   className="ml-2 flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300"
//                 >
//                   Active
//                 </label>
//               </div>
//               <div className="flex items-center">
//                 <input
//                   id="inactive"
//                   name="isActive"
//                   type="radio"
//                   value="false"
//                   defaultChecked={!applicant.isActive}
//                   className="h-4 w-4 border-gray-300 bg-gray-100 text-gray-600 focus:ring-2 focus:ring-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-gray-600"
//                 />
//                 <label
//                   htmlFor="inactive"
//                   className="ml-2 flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5 text-xs font-medium text-white dark:text-gray-300"
//                 >
//                   Inactive
//                 </label>
//               </div>
//             </div>
//           </div>
//         </fieldset>
//       </div>

//       <EditBtn
//         href={dashboardRoutes.USERS.APPLICANTS.BASE}
//         text="Updating Info"
//         label="Edit Applicant"
//       />
//     </form>
//   );
// }
