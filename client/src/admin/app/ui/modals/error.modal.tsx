"use client";

import React from "react";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import useCustomSearchParams from "@/hooks/search-params.hook";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import Modal from "../modal";

const ErrorModal = () => {
  const { handleSetParams, modalValue,paramValues } = useCustomSearchParams("ERROR", ['ERR_MSG', 'BTN_LABEL','ERR_DESC']);
  const modal = !!modalValue;
  const error_message = paramValues.ERR_MSG;
  const error_description = paramValues.ERR_DESC;
  const button_label = paramValues.BTN_LABEL;

  const CloseButton = () => (
    <button
      onClick={() => handleSetParams(false)}
      className="inline-flex items-center gap-2 rounded-md bg-slate-800/70 dark:bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
    >
      { button_label ?? 'Close'}
    </button>
  );

  return (
    <Modal isOpen={modal}>
      <DialogPanel className="w-full max-w-lg rounded-xl bg-white/90 dark:bg-white/5 p-6 backdrop-blur-2xl">
        <div className="flex items-center">
          <ExclamationCircleIcon className="w-10 h-10 text-red-500" />
          <DialogTitle
            as="h2"
            className="ml-3 text-lg font-medium text-gray-700 dark:text-white"
          >
            Error Occurred
          </DialogTitle>
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-white/70">
          { error_message ?? `An unexpected error occurred. Please try again later or contact
          support if the issue persists.`}
        </p>
        { error_description && <p className="mt-2 text-sm text-gray-700 dark:text-white/70">
          { error_description }
        </p>}
        <div className="mt-12 flex justify-end">
          <CloseButton />
        </div>
      </DialogPanel>
    </Modal>
  );
};

export default ErrorModal;
