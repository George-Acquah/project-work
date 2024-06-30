"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </main>
  );
}

// "use client";

// import Button from "@/app/ui/button";
// import Modal from "@/app/ui/modal";
// import Link from "next/link";
// import React, { useMemo } from "react";

// interface ICommonError {
//   errTitle?: string;
//   children: React.ReactNode;
//   reset: () => void;
// }
// interface IError {
//   error: any;
//   reset: () => void;
// }

// const CommonError = ({
//   reset,
//   errTitle = "There was a problem",
//   children,
// }: ICommonError) => (
//   <Modal isOpen={true} >
//     <main className="grid place-items-center px-6 py-24 sm:py-32 lg:px-8 m-auto">
//       <div className="text-center">
//         <p className="text-bold font-semibold text-emerald-700">{errTitle}</p>
//         {children}
//         <div className="mt-10 flex items-center justify-center gap-x-2 xxs:gap-x6">
//           <Button
//             onClick={reset}
//             className="bg-emerald-50 text-emerald-700 border-emerald-100 focus:ring focus:ring-emerald-400"
//           >
//             Try Again
//           </Button>
//           <Link href="/">Go back Home</Link>
//         </div>
//       </div>
//     </main>
//   </Modal>
// );

// const error = ({ error, reset }: IError) => {
//   const switchErrRes = useMemo(
//     () =>
//       (stack: string = "", message: string) => {
//         console.log(stack);
//         console.log(message);
//         switch (stack.includes(message)) {
//           case true:
//             return {
//               name: message,
//               message,
//             };
//           case false:
//             return {
//               name: message,
//               message,
//             };
//           default:
//             return {
//               name: message,
//               message,
//             };
//         }
//       },
//     [error.message, error.stack]
//   );

//   const errTest = switchErrRes(error.stack, error.message);

//   console.log(errTest);
//   console.log("cccacca", error.cause);

//   return (
//     <>
//       {error.name === "NetworkError" ? (
//         <CommonError reset={reset} errTitle={error.name}>
//           <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
//             {error.message || "Something went wrong"}
//           </h1>
//           <p className="mt-6 text-base leading-7 text-zinc-600">
//             Please try again or contact support if the problem persist
//           </p>
//         </CommonError>
//       ) : (
//         <CommonError reset={reset} errTitle={error.name}>
//           <h1 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900">
//             {error.message || "Something went wrong"}
//           </h1>
//           <p className="mt-6 text-base leading-7 text-zinc-600">
//             Please try again or contact support if the problem persist
//           </p>
//         </CommonError>
//       )}
//     </>
//   );
// };

// export default error;
