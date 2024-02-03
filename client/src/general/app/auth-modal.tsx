'use client'
import { Fragment } from 'react';
import { Transition, Dialog } from "@headlessui/react";
import { XMarkIcon } from '@heroicons/react/24/outline';
import { cardsBg, textColor } from './ui/shared/themes';

const Modal = ({reason, text, children, isOpen, closeModal}: _IModal) => {

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/70 dark:bg-black/80" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={`w-full max-w-md md:max-w-xl lg:max-w-4xl transform overflow-hidden rounded-md dark:bg-white bg-white p-6 text-left align-middle shadow-xl transition-all`}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-2 right-2 p-1 rounded-full hover:scale-[1.04] transition-all duration-500"
                >
                  <XMarkIcon className="h-5 w-5 text-red-600 font-extrabold" />
                </button>
                <Dialog.Title
                  as="h3"
                  className={`text-lg font-medium leading-6 text-gray-700 dark:text-[#000]`}
                >
                  {reason}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500 dark:text-gray-800">
                    {text}
                  </p>
                </div>

                <div className="mt-4">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;