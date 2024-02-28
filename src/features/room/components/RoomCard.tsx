import { FC, useState } from "react";
import { Room } from "@/types";
import { copyToClipboard } from "@/utils";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Copy, GearSix, Link } from "@phosphor-icons/react";
import RoomSettingsModal from "./RoomSettingsModal";
import UserProfileImage from "@/features/user/components/UserProfileImage";

type RoomCardProps = {
  room: Room;
};

const RoomCard: FC<RoomCardProps> = ({ room }) => {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div
        key={room.id}
        className="flex w-full flex-col overflow-clip rounded-xl border border-gray-300 bg-white text-sm shadow-md transition duration-150 hover:scale-105 hover:shadow-2xl"
      >
        <div className="flex flex-col gap-2 p-4">
          <div className="flex w-full items-center justify-between">
            <h3 className="text-xl font-light">{room.name ?? "New Room"}</h3>
            <div className="w-fit select-none rounded-xl border border-gray-300 bg-gray-50 p-1 px-2 text-xs disabled:bg-gray-200 disabled:text-gray-300">
              {room.isPublic ? "Public" : "Private"}
            </div>
          </div>
          <div className="flex items-center gap-1 font-light">
            <h4>Share ID: {room.shareId}</h4>
            <button
              className="w-fit rounded-md border border-gray-300 bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
              onClick={() => copyToClipboard(room.shareId)}
            >
              <Copy size={15} />
            </button>
            <button
              className="w-fit rounded-md border border-gray-300 bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
              onClick={() =>
                copyToClipboard(`http://localhost:5173/room/${room.shareId}`)
              }
            >
              <Link size={15} />
            </button>
          </div>
          <span className="text-xs font-light">
            {room.joinList
              .sort((joined) => (joined.isActive ? 1 : 0))
              .filter((joined) => joined.isActive).length > 0
              ? `${room.joinList.length} active user${
                  room.joinList.filter((joined) => joined.isActive).length > 1
                    ? "s"
                    : ""
                }`
              : "No active users"}
          </span>
          <div className="flex h-10 gap-1">
            {room.joinList.map((joined) => {
              if (joined.isActive) {
                return (
                  <UserProfileImage key={joined.user.id} user={joined.user} />
                );
              } else {
                return (
                  <UserProfileImage
                    key={joined.user.id}
                    user={joined.user}
                    color="gray"
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="flex w-full justify-between border-t border-gray-300 bg-gray-50 text-xs">
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center justify-center border-r border-gray-300 bg-gray-100/50 p-3 hover:bg-gradient-to-tr hover:from-gray-100 hover:to-gray-200 hover:text-gray-700"
          >
            <GearSix className="text-gray-700" weight="fill" size={15} />
          </button>
          <button
            onClick={() => navigate(`/room/${room.shareId}`)}
            className="flex w-full items-center justify-end gap-1 bg-gray-100/50 p-3 hover:bg-gradient-to-tr hover:from-gray-100 hover:to-gray-200 hover:text-gray-700"
          >
            Join{" "}
            <ArrowRight className="text-gray-700" weight="bold" size={15} />
          </button>
        </div>
      </div>
      <RoomSettingsModal
        room={room}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
};

export default RoomCard;
