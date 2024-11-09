"use client";
import { useEffect } from "react";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useNotification } from "../context/NotificationContext";
import styles from "./notification.module.css";

export default function Notification() {
  const { notification, hideNotification } = useNotification();
  const { show, message, description, type } = notification;
  useEffect(() => {
    if (show) {
      // Set a timer to auto-hide the notification after 10 seconds
      const timer = setTimeout(() => hideNotification(), 10000);
      return () => clearTimeout(timer); // Cleanup on component unmount or when `show` changes
    }
  }, [show, hideNotification]);
  return (
    <>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition show={show}>
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="shrink-0">
                    {type === "success" ? (
                      <CheckCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-green-400"
                      />
                    ) : (
                      <ExclamationCircleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-red-400"
                      />
                    )}
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium text-gray-900">
                      {message}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                  </div>
                  <div className="ml-4 flex shrink-0">
                    <button
                      type="button"
                      onClick={hideNotification}
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div
                className={`h-1 ${
                  type === "success" ? "bg-green-500" : "bg-red-500"
                } ${styles["loader-bar"]}`}
              ></div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
}
