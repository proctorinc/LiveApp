import { useParams } from "react-router-dom";
import useRoom from "@/features/room/hooks/useRoom";
import { FormEvent, useEffect, useState } from "react";
import { copyToClipboard, formatTimeSince } from "../utils";
import Navbar from "@/components/Navbar";
import useAuth from "../features/auth/hooks/useAuth";
import { Copy, DoorOpen, PaperPlaneRight } from "@phosphor-icons/react";
import UserProfileImage from "@/features/user/components/UserProfileImage";

const Room = () => {
  const { roomId } = useParams();
  const { isRoomLoaded, loadRoom, leaveRoom, sendMessage, room, alertQueue } =
    useRoom();
  const { currentUser } = useAuth();
  const [message, setMessage] = useState("");

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (message.length > 0) {
      sendMessage(message);
      setMessage("");
    } else {
      console.error("Cannot send empty message");
    }
  };

  useEffect(() => {
    loadRoom(roomId as string);
  }, [roomId]);

  if (!room) {
    return <div>Loading Room...</div>;
  }

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Navbar />
      <div className="relative flex w-full flex-grow flex-col items-center justify-center gap-4 overflow-hidden bg-gray-50 p-4 pb-10">
        {isRoomLoaded && (
          <>
            <div className="absolute left-5 top-20 z-50 h-1/3 w-full">
              {alertQueue.map((alert, i) => (
                <div
                  key={i}
                  className="flex w-fit gap-2 rounded-xl border border-gray-300 bg-white p-2 text-sm font-light shadow-xl"
                >
                  <span>{alert}</span>
                </div>
              ))}
            </div>
            <div className="flex w-full max-w-3xl items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-1">
                <h1>Room ID: {roomId}</h1>
                <button
                  className="w-fit rounded-md border border-gray-300 bg-white p-1 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                  onClick={() =>
                    copyToClipboard(`http://localhost:5173/room/${roomId}`)
                  }
                >
                  <Copy size={15} />
                </button>
              </div>
              <div className="flex gap-1">
                {room.activeUsers.map((user) => (
                  <UserProfileImage key={user.id} user={user} />
                ))}
              </div>
              <button
                className="flex w-fit items-center gap-1 rounded-xl border border-gray-300 bg-white p-2 text-xs hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-300"
                onClick={leaveRoom}
              >
                <DoorOpen size={15} weight="fill" /> Leave
              </button>
            </div>
            <div className="relative flex w-full max-w-3xl flex-grow flex-col-reverse overflow-y-scroll rounded-xl border border-gray-300 bg-gradient-to-tr from-gray-200 to-gray-50 p-4">
              {room.messages.length === 0 && (
                <div className="text-sm text-gray-600">No Messages Yet</div>
              )}
              {room.messages.map((message, i) => {
                if (message.sender) {
                  return (
                    <div
                      key={i}
                      className={`flex w-full ${
                        currentUser.id === message.sender.id
                          ? "justify-end"
                          : "justify-start"
                      } ${
                        i > 0 &&
                        room.messages[i - 1].sender &&
                        message.sender.id === room.messages[i - 1].sender.id
                          ? "pb-1"
                          : "pb-5"
                      }`}
                    >
                      <div
                        className={`flex w-full max-w-xs flex-col gap-1 rounded-xl px-4 py-2 shadow-md ${
                          currentUser.id === message.sender.id
                            ? "border border-gray-300 bg-white"
                            : "border border-blue-400 bg-blue-200 text-blue-900"
                        }`}
                      >
                        <div className="w-full">
                          <p>{message.text}</p>
                        </div>
                        <div className="flex w-full justify-between text-xs font-light">
                          <span>
                            {currentUser.id === message.sender.id
                              ? ""
                              : message.sender.name}
                          </span>
                          <span>{formatTimeSince(message.sentAt)}</span>
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className="flex w-full justify-center pb-4 text-sm font-light italic first:pb-0"
                    >
                      {message.text} - {formatTimeSince(message.sentAt)}
                    </div>
                  );
                }
              })}
            </div>
            <div className="sticky bottom-0 flex w-full justify-center gap-4">
              <form
                onSubmit={submitForm}
                className="flex w-full max-w-md justify-center rounded-xl border border-gray-300 text-sm shadow-md"
              >
                <input
                  type="text"
                  placeholder="Write a message"
                  className="w-full rounded-l-xl border-r border-gray-300 bg-white px-4 py-2"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button
                  type="submit"
                  className="w-fit rounded-r-xl bg-gradient-to-tr from-gray-50 to-gray-200 px-3 text-sm text-gray-700"
                >
                  <PaperPlaneRight size={15} weight="fill" />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Room;
