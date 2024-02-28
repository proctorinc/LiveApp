import { Dialog, Transition } from "@headlessui/react";
import { X } from "@phosphor-icons/react";
import { FC, Fragment, HTMLAttributes, ReactNode } from "react";

type ModalProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  children: ReactNode;
  title?: string;
  isOpen: boolean;
  onClose: () => void;
};

const Modal: FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  ...otherProps
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div
        className="fixed inset-0 bg-gray-800/20 backdrop-blur-sm"
        aria-hidden="true"
      />

      <Transition
        show={isOpen}
        enter="transition-opacity duration-1000"
        enterFrom="scale-0 opacity-0"
        enterTo="transition-opacity opacity-100"
        leave="transition-opacity duration-1000"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm overflow-clip rounded-xl border border-gray-300 bg-white shadow-2xl sm:max-w-lg">
            {!!title && (
              <Dialog.Title className="ml-1 flex justify-between px-4 pt-4">
                <span className="text-2xl">{title}:</span>
                <button
                  type="button"
                  className="aspect-square h-fit w-fit rounded-md bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                  onClick={onClose}
                >
                  <X size={15} />
                </button>
              </Dialog.Title>
            )}
            <div {...otherProps}>{children}</div>
          </Dialog.Panel>
        </div>
      </Transition>
    </Dialog>
  );
};

export default Modal;
