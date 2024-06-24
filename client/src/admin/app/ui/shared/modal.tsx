"use client";

import React from "react";
import {
  Transition,
  Dialog,
  TransitionChild,
} from "@headlessui/react";

interface _IModal extends _IChildren {
  /** A void function to close the modal */
  onClose?: () => void;
  /** A boolean to check the current state of the modal */
  isOpen: boolean;
}
const Modal = ({ isOpen, onClose, children }: _IModal) => {

  return (
    <>
      {isOpen && (
        <Transition appear show={isOpen}>
          <Dialog
            as="div"
            className="relative z-10 focus:outline-none "
            onClose={onClose ?? (() => {})}
          >
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-gray-800 bg-opacity-70">
              <div className="flex min-h-full items-center justify-center p-4 ">
                <TransitionChild
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 transform scale-95"
                  enterTo="opacity-100 transform scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 transform scale-100"
                  leaveTo="opacity-0 transform scale-95"
                >
                  {children}
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default Modal;
