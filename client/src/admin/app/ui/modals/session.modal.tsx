"use client";

import React from "react";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import useCustomSearchParams from "@/hooks/search-params.hook";
import { PowerIcon, ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { signOutHelper } from "@/app/lib/actions";
import Modal from "../modal";

const SessionModal = () => {
  const { handleSetParams, modalValue, paramValues } = useCustomSearchParams(
    "SESSION",
    ["BTN_LABEL"]
  );
  const modal = !!modalValue;
  const button_label = paramValues.BTN_LABEL;

  const SignOutBtn = () => (
    <button
      onClick={async () => {
        await signOutHelper();
        handleSetParams();
      }}
      className="inline-flex items-center gap-2 rounded-md bg-slate-800/70 dark:bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-gray-600"
    >
      <PowerIcon className="w-6" />
      <div className="block">{button_label ?? "Go to login"}</div>
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
            Session Expired
          </DialogTitle>
        </div>
        <p className="mt-4 text-sm text-gray-700 dark:text-white/70">
          Your session has expired due to inactivity. Please log in again to
          continue.
        </p>
        <div className="mt-12 flex justify-end">
          <SignOutBtn />
        </div>
      </DialogPanel>
    </Modal>
  );
};

export default SessionModal;
