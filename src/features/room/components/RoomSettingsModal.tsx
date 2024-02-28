import {
  ArrowClockwise,
  FloppyDisk,
  Question,
  Trash,
  UserCirclePlus,
  X,
} from "@phosphor-icons/react";
import { FC, Fragment, useState } from "react";
import { formatDate } from "@/utils";
import { Room } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import UserProfileImage from "@/features/user/components/UserProfileImage";

type RoomSettingModalProps = {
  room: Room;
  isOpen: boolean;
  onClose: () => void;
};

const RoomSettingsModal: FC<RoomSettingModalProps> = ({
  room,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState(room.name);
  const [isPublic, setIsPublic] = useState(room.isPublic);
  const [shareId, setShareId] = useState(room.shareId);

  const updateRoomName = async () => {
    fetch(`http://localhost:3000/api/room/${room.id}/name`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    }).catch((error) => console.error(error));
  };

  const updateRoomPrivacy = async (isPublic: boolean) => {
    setIsPublic(isPublic);
    fetch(`http://localhost:3000/api/room/${room.id}/privacy`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPublic,
      }),
    }).catch((error) => console.error(error));
  };

  const updateShareId = () => {
    fetch(`http://localhost:3000/api/room/${room.id}/refresh/share-id`, {
      method: "PATCH",
    })
      .then((response) => response.json())
      .then((id) => {
        setShareId(id);
      })
      .catch((error) => console.error(error));
  };

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
            <Dialog.Title className="ml-1 flex justify-between px-4 pt-4">
              <span className="text-2xl">Room Settings:</span>
              <button
                type="button"
                className="aspect-square h-fit w-fit rounded-md bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                onClick={onClose}
              >
                <X size={15} />
              </button>
            </Dialog.Title>
            <div className="flex flex-col">
              <div className="flex flex-col gap-4 p-4">
                <div className="pl-1 text-sm font-light">
                  Room created: {formatDate(new Date())}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex w-fit items-center overflow-clip rounded-xl border border-gray-300">
                    <div className="text-md relative flex items-center gap-1">
                      <h3 className="absolute left-4">Share ID:</h3>
                      <input
                        type="text"
                        readOnly
                        placeholder={shareId}
                        className="w-36 rounded-l-xl border-r border-gray-300 bg-gray-50 px-4 py-2 pl-[90px]"
                      />
                    </div>
                    <button
                      type="button"
                      className="text-md flex w-fit items-center justify-center gap-2 bg-white px-4 py-2  hover:bg-gray-200 hover:text-gray-700"
                      onClick={updateShareId}
                    >
                      <ArrowClockwise size={15} /> Update
                    </button>
                  </div>
                  <button
                    type="button"
                    className="aspect-square h-fit w-fit rounded-md bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                  ></button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex w-fit items-center overflow-clip rounded-xl border border-gray-300">
                    <div className="text-md relative flex items-center gap-1">
                      <h3 className="absolute left-4">Name:</h3>
                      <input
                        type="text"
                        placeholder="New Room"
                        className="w-full rounded-l-xl border-r border-gray-300 bg-gray-50 px-4 py-2 pl-[90px]"
                        onChange={(event) => setName(event.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className="text-md flex w-fit items-center justify-center gap-2 bg-white px-4 py-2  hover:bg-gray-200 hover:text-gray-700"
                      onClick={updateRoomName}
                    >
                      <FloppyDisk size={15} /> Save
                    </button>
                  </div>
                  <button
                    type="button"
                    className="aspect-square h-fit w-fit rounded-md bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                  ></button>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-md flex w-fit items-center overflow-clip rounded-xl border border-gray-300">
                    <button
                      type="button"
                      disabled={isPublic}
                      className="w-full border-r border-gray-300 bg-gray-50 px-4 py-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 disabled:bg-white disabled:text-black"
                      onClick={() => updateRoomPrivacy(true)}
                    >
                      Public
                    </button>
                    <button
                      disabled={!isPublic}
                      className="w-full bg-gray-100 px-4 py-2 text-gray-400 hover:bg-gray-200 hover:text-gray-700 disabled:bg-white disabled:text-black"
                      onClick={() => updateRoomPrivacy(false)}
                    >
                      Private
                    </button>
                  </div>
                  <button
                    type="button"
                    className="aspect-square h-fit w-fit rounded-md bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                  >
                    <Question size={15} />
                  </button>
                </div>
              </div>
              {!isPublic && (
                <div className="flex w-full flex-col gap-4 border-t border-gray-300 p-4">
                  <div className="flex w-full justify-between">
                    <div className="text-md pl-1">Invited Users</div>
                  </div>
                  <div className="flex w-full overflow-x-scroll px-2">
                    {room.authorizedUsers.map((authorization) => (
                      <UserProfileImage
                        key={authorization.user.id}
                        user={authorization.user}
                      />
                    ))}
                  </div>
                  <div className="flex w-full items-center overflow-clip rounded-xl border border-gray-300">
                    <input
                      type="text"
                      placeholder="Invite by Username"
                      className="h-full w-full rounded-l-xl border-r border-gray-300 bg-gray-50 px-4 py-3"
                    />
                    <button
                      type="button"
                      disabled={true}
                      className="text-md flex w-fit items-center justify-center gap-2 bg-red-500 px-4 py-2 text-red-900 disabled:bg-gray-50 disabled:text-gray-400"
                    >
                      <UserCirclePlus size={25} />
                    </button>
                  </div>
                </div>
              )}
              <div className="flex w-full flex-col gap-4 border-t border-gray-300 bg-gray-100 p-4">
                <div className="text-md pl-1">Delete Room</div>
                <div className="flex flex-col gap-2">
                  <div className="flex w-fit items-center overflow-clip rounded-xl border border-gray-300">
                    <input
                      type="text"
                      placeholder="confirm delete"
                      className="w-full rounded-l-xl border-r border-gray-300 bg-white px-4 py-2"
                    />
                    <button
                      type="button"
                      disabled={true}
                      className="text-md flex w-fit items-center justify-center gap-2 bg-red-500 px-4 py-2 text-red-900 disabled:bg-gray-100 disabled:text-gray-400"
                    >
                      <Trash size={15} /> Delete
                    </button>
                  </div>
                  <div className="w-full pl-1 text-xs font-light">
                    Enter "confirm delete" to permanently delete
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Transition>
    </Dialog>
  );
};

export default RoomSettingsModal;
