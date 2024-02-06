import { useParams } from "react-router-dom";
import useRoom from "../hooks/useRoom";
import { FormEvent, useEffect, useState } from "react";
import { formatTimeSince } from "../utils";

const Room = () => {
  const { roomId } = useParams();
  // const [room, setRoom] = useState<RoomType | null>(null);
  const { isRoomLoaded, users, messages, loadRoom, leaveRoom, sendMessage } =
    useRoom();
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

  const profile = {
    id: "test-id",
  };

  useEffect(() => {
    loadRoom(roomId as string);
  }, [roomId]);

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex justify-between p-2 border-b w-full px-4 items-center shadow-xl border-gray-300">
        <h1 className="text-lg">Live App</h1>
        <div className="w-10 h-10 rounded-full aspect-square flex items-center justify-center border border-purple-400 bg-gradient-to-tr from-purple-400 to-purple-200 text-purple-600">
          MP
        </div>
      </div>
      <div className="flex p-4 pb-10 flex-col gap-4 flex-grow bg-gray-50 items-center justify-center w-full overflow-hidden">
        {!isRoomLoaded && <div>Loading Room...</div>}
        {isRoomLoaded && (
          <>
            <div className="flex px-2 text-sm justify-between gap-2 items-center w-full">
              <h1>Room ID: {roomId}</h1>
              <div className="flex gap-1">
                {users.map((joined) => (
                  <div
                    key={joined.user.id}
                    className="w-10 h-10 rounded-full aspect-square flex items-center justify-center border border-yellow-400 bg-gradient-to-tr from-yellow-400 to-yellow-200 text-yellow-600"
                  >
                    {joined.user.name
                      ? joined.user.name.substring(0, 2).toUpperCase()
                      : "NA"}
                  </div>
                ))}
              </div>
              <button
                className="w-fitshadow-md rounded-xl p-2 border border-gray-300 bg-white disabled:bg-gray-200 disabled:text-gray-300"
                onClick={leaveRoom}
              >
                Leave Room
              </button>
            </div>
            <div className="flex flex-col-reverse max-w-3xl w-full flex-grow p-4 border border-gray-300 rounded-xl overflow-y-scroll bg-gradient-to-tr from-gray-200 to-gray-50">
              {messages.length === 0 && (
                <div className="italic">No Messages Yet</div>
              )}
              {messages.map((message, i) => {
                if (message.sender.id === "server") {
                  return (
                    <div
                      key={i}
                      className="flex font-light text-sm w-full justify-center italic pb-4 first:pb-0"
                    >
                      {message.text} - {formatTimeSince(message.sentAt)}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={i}
                      className={`flex w-full ${
                        profile.id === message.sender.id
                          ? "justify-end"
                          : "justify-start"
                      } ${
                        i > 0 && message.sender.id === messages[i - 1].sender.id
                          ? "pb-1"
                          : "pb-5"
                      }`}
                    >
                      <div
                        className={`flex flex-col gap-1 max-w-xs w-full px-4 py-2 rounded-xl shadow-md ${
                          profile.id === message.sender.id
                            ? "bg-white"
                            : "bg-blue-200 text-blue-900"
                        }`}
                      >
                        <div className="w-full">
                          <p>{message.text}</p>
                        </div>
                        <div className="w-full flex justify-between text-xs font-light">
                          {/* <p>
                      {message.date.toLocaleString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </p> */}
                          <span>
                            {profile.id === message.sender.id
                              ? ""
                              : message.sender.name}
                          </span>
                          <span>{formatTimeSince(message.sentAt)}</span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
            <div className="flex w-full gap-4 sticky bottom-0 justify-center">
              <form
                onSubmit={submitForm}
                className="flex max-w-md w-full rounded-xl justify-center border border-gray-300 shadow-md"
              >
                <input
                  type="text"
                  placeholder="Write a message"
                  className="w-full rounded-l-xl py-2 px-4 border-r border-gray-300 bg-white"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                />
                <button
                  type="submit"
                  className="w-fit rounded-r-xl text-gray-500 p-2 bg-gray-200"
                >
                  Send
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
