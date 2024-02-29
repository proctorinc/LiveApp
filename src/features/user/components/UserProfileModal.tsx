import { FloppyDisk } from "@phosphor-icons/react";
import { FC, FormEvent, useState } from "react";

import UserProfileImage from "./UserProfileImage";
import { formatDate } from "@/utils";
import Modal from "@/components/Modal";
import { useUpdateUserMutation } from "../hooks/useUpdateUserMutation";
import useUser from "../hooks/useUser";

type UserProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const UserProfileModal: FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const currentUser = useUser();
  const [name, setName] = useState(currentUser.name ?? "");
  const [color, setColor] = useState(currentUser.color ?? "blue");

  const updateUser = useUpdateUserMutation();

  const submitUpdateUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser
      .mutateAsync({ name, color })
      .then(() => onClose())
      .catch((error) => console.error(error));
  };

  return (
    <Modal title="My Profile" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={submitUpdateUser} className="flex flex-col">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-col gap-4 p-4">
            <div className="flex w-full flex-col items-center justify-center gap-4">
              <UserProfileImage
                user={currentUser}
                color={color}
                className="h-20 w-20 text-3xl"
              />
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setColor("red")}
                    className={`h-8 w-8 rounded-lg border border-red-500 bg-red-300 ${
                      color === "red" ? "ring-2 ring-gray-600" : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("orange")}
                    className={`h-8 w-8 rounded-lg border border-orange-500 bg-orange-300 ${
                      color === "orange" ? "ring-2 ring-gray-600" : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("yellow")}
                    className={`h-8 w-8 rounded-lg border border-yellow-500 bg-yellow-300 ${
                      color === "yellow" ? "ring-2 ring-gray-600" : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("green")}
                    className={`h-8 w-8 rounded-lg border border-green-500 bg-green-300 ${
                      color === "green" ? "ring-2 ring-gray-600" : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("blue")}
                    className={`h-8 w-8 rounded-lg border border-blue-500 bg-blue-300 ${
                      color === "blue" ? "ring-2 ring-gray-600" : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("purple")}
                    className={`h-8 w-8 rounded-lg border border-purple-500 bg-purple-300 ${
                      color === "purple" ? "ring-2 ring-gray-600" : ""
                    }`}
                  ></button>
                  <button
                    type="button"
                    onClick={() => setColor("pink")}
                    className={`h-8 w-8 rounded-lg border border-pink-500 bg-pink-300 ${
                      color === "pink" ? "ring-2 ring-gray-600" : ""
                    }`}
                  ></button>
                </div>
              </div>
            </div>
          </div>
          <div className="text-md relative flex w-full items-center gap-1">
            <h3 className="absolute left-4">Username:</h3>
            <input
              type="text"
              value={name}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 pl-28"
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className="text-md relative flex w-full items-center gap-1">
            <h3 className="absolute left-4">Email:</h3>
            <input
              readOnly
              type="text"
              value={currentUser.email ?? ""}
              className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 pl-28 text-gray-500"
            />
          </div>
          <div className="pl-1 text-sm font-light">
            User since:{" "}
            {currentUser ? formatDate(currentUser.createdAt) : "..."}
          </div>
        </div>
        <div className="flex w-full flex-col items-center border-t border-gray-300 bg-gray-50 p-4">
          <button
            type="submit"
            className="flex w-full max-w-sm items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white p-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
          >
            <FloppyDisk size={20} /> Save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default UserProfileModal;
