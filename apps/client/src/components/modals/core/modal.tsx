import { Fragment, useRef, useEffect } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import useOutsideContextClick from "../../../hooks/useOutsideContextClick";

export default function Modal({
  children,
  onClose,
  closeOnOutsideClick = false,
  open,
  className = undefined,
}: ModalProps) {
  const ref = useRef(null);

  useOutsideContextClick(ref, () => {
    if (closeOnOutsideClick) {
      onClose(false);
    }
  });

  // Close the modal if the user presses the escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  // TODO: defaulting the modal to open breaks the closeOnOutsideClick function
  // an issue with useOutsideContextClick !boolean?

  return (
    <Transition show={open} as={Fragment}>
      <Dialog
        ref={ref}
        as="div"
        className="relative z-10"
        onClose={() => {
          if (closeOnOutsideClick) {
            onClose(false);
          }
        }}
      >
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-60 bg-black w-full h-full transition-opacity" />
        </TransitionChild>

        <div className="fixed inset-0 z-10 max-h-min overflow-y-auto my-auto">
          <div className="flex items-center max-h-min justify-center p-4 text-center sm:p-0 ">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel
                className={`relative bg-neutral transform overflow-hidden rounded-lg px-6 py-14 text-left shadow-xl transition-all ${className}`}
              >
                <div>{children}</div>
                <button
                  type="button"
                  className="btn-ghost rounded-md absolute top-4 right-4"
                  onClick={() => onClose(false)}
                >
                  <span className="sr-only">Close</span>
                  <XMarkIcon
                    className="h-8 w-8 focus:outline-none focus:ring-2 focus:ring-offset-2"
                    aria-hidden="true"
                  />
                </button>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export interface ModalProps {
  open: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  closeOnOutsideClick?: boolean;
  children: React.ReactNode;
  className?: string;
}
