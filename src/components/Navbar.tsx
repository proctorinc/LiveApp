import { useNavigate } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";
import { formatDate } from "@/utils";
import { Chats, Pencil, SignOut } from "@phosphor-icons/react";
import { useState } from "react";
import UserProfileModal from "@/features/user/components/UserProfileModal";
import UserProfileImage from "@/features/user/components/UserProfileImage";

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="flex w-full items-center justify-between border-b border-gray-300 p-2 px-4 shadow-xl">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-xl"
        >
          <Chats size={25} />
          Live Chat
        </button>
        <div className="group">
          <UserProfileImage
            user={currentUser}
            color={currentUser.color}
            disableTooltip
          />
          <div className="absolute right-0 top-12 z-50 w-64 translate-x-96 transform flex-col overflow-clip rounded-xl border border-gray-300 bg-white text-xs opacity-0 shadow-2xl transition delay-200 duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100 group-hover:delay-0 sm:w-72">
            <div className="flex flex-col gap-3 p-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-light">{currentUser.name}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="aspect-square h-fit w-fit rounded-md border border-gray-300 bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                >
                  <Pencil size={15} />
                </button>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3>Email:</h3>
                <h3 className="text-sm font-light">{currentUser.email}</h3>
              </div>
              <div className="flex flex-col gap-1 text-left">
                <h3>User since:</h3>
                <h3 className="text-sm font-light">
                  {currentUser.createdAt
                    ? formatDate(currentUser.createdAt)
                    : "..."}
                </h3>
              </div>
            </div>
            <div className="flex w-full flex-col border-t border-gray-300 bg-gray-50 p-4">
              <button
                onClick={logout}
                className="flex w-full items-center justify-center gap-1 rounded-xl border border-gray-300 bg-white p-2 hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
              >
                <SignOut size={15} /> Log out
              </button>
            </div>
          </div>
        </div>
      </div>
      <UserProfileModal
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
};

export default Navbar;
