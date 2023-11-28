// import { deleteApplicant } from '@/app/lib/actions';
// import { dashboardRoutes } from '@/app/lib/routes';
// import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
// import Link from 'next/link';

// export function AddApplicant() {
//   return (
//     <Link
//       href={`${dashboardRoutes.USERS.APPLICANTS.ADD}`}
//       className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//     >
//       <span className="hidden md:block">Add Applicant</span>{' '}
//       <PlusIcon className="h-5 md:ml-4" />
//     </Link>
//   );
// }

// export function EditCommon({ id }: _Id) {
//   return (
//     <Link
//       href={`${dashboardRoutes.USERS.APPLICANTS.BASE}/${id}/update`}
//       className="rounded-md border p-2 md:py-1 md:px-4 hover:bg-gray-100 md:flex justify-between items-center gap-2"
//     >
//       <p className='hidden md:flex text-base font-thin'>Edit</p>
//       <PencilIcon className="w-5"/>
//     </Link>
//   );
// }

// export function DeleteCommon({ id }: _Id) {
//   const deleteInvoiceWithId = deleteApplicant.bind(null, id);

//   return (
//     <form action={deleteInvoiceWithId}>
//       <button className="bg-red-500 rounded-md border border-red-500 p-2 hover:bg-red-400">
//         <span className="sr-only">Delete</span>
//         <TrashIcon className="w-4 text-white" />
//       </button>
//     </form>
//   );
// }
