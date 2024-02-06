import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Room } from "../types";
import { formatTimeSince } from "../utils";

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);

  const getRooms = async () => {
    return await fetch("http://localhost:3000/api/room")
      .then((response) => response.json())
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getRooms();
  }, []);

  const submitJoinRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomId) {
      setRoomId("");
      fetch(`http://localhost:3000/api/room/join/${roomId}`)
        .then((response) => response.json())
        .then(() => navigate(`/room/${roomId}`))
        .catch((error) => console.error(error));
    }
  };

  const createNewRoom = async () => {
    fetch("http://localhost:3000/api/room", {
      method: "POST",
    })
      .then((response) => response.json())
      .then(() => {
        // Refresh page data
        getRooms();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="flex flex-col items-center w-full h-screen">
      <div className="flex justify-between p-2 border-b w-full px-4 items-center shadow-xl border-gray-300">
        <h1 className="text-lg">Live App</h1>
        <div className="w-10 h-10 rounded-full aspect-square flex items-center justify-center border border-purple-400 bg-gradient-to-tr from-purple-400 to-purple-200 text-purple-600">
          MP
        </div>
      </div>
      <div className="flex sm:p-4 flex-col gap-4 flex-grow bg-gray-50 items-center justify-center w-full">
        <div className="w-full py-4 px-2 flex flex-col">
          <div className="w-full flex flex-col gap-2 py-8 items-center">
            <h1 className="text-3xl font-light">Welcome to Live App</h1>
            <h3 className="text-sm">
              Create or join a room to chat live with friends!
            </h3>
          </div>
          <div className="flex flex-col w-full gap-4 sticky bottom-0 items-center">
            <form
              onSubmit={submitJoinRoom}
              className="flex max-w-xs w-full rounded-xl justify-center border border-gray-300 shadow-md"
            >
              <input
                type="text"
                placeholder="Room ID"
                className="w-full rounded-l-xl py-2 px-4 border-r border-gray-300 bg-white"
                value={roomId}
                onChange={(event) => setRoomId(event.target.value)}
              />
              <button
                disabled={!roomId}
                type="submit"
                className="w-fit text-white bg-gradient-to-tr from-blue-400 to-red-400 py-2 px-3 rounded-r-xl disabled:from-white disabled:to-white disabled:bg-white disabled:text-gray-500"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        <div className="flex flex-col max-w-3xl items-center w-full flex-grow p-6 border border-gray-300 bg-gradient-to-tr from-gray-200 to-gray-50 rounded-xl overflow-y-scroll">
          <div className="max-w-xs sm:max-w-lg lg:max-w-3xl w-full grid grid-flow-row grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3 justify-center">
            {!!rooms &&
              rooms.map((room) => (
                <div
                  key={room.id}
                  onClick={() => navigate(`/room/${room.shareId}`)}
                  className="flex flex-col gap-2 text-sm w-full p-4 border border-gray-300 bg-white rounded-xl hover:shadow-lg hover:bg-gradient-to-tr hover:from-blue-300 hover:to-blue-100 hover:text-blue-800 hover:border-blue-500"
                >
                  <h3 className="font-bold">Room ID: {room.shareId}</h3>
                  <span className="text-xs font-light">
                    {room.joinList
                      .sort((joined) => joined.isActive)
                      .filter((joined) => joined.isActive).length > 0
                      ? `${room.joinList.length} active user${
                          room.joinList.filter((joined) => joined.isActive)
                            .length > 1
                            ? "s"
                            : ""
                        }`
                      : "No active users"}
                  </span>
                  <div className="flex gap-1">
                    {room.joinList.map((joined) => {
                      if (joined.isActive) {
                        return (
                          <div
                            key={joined.user.id}
                            className="w-10 h-10 rounded-full aspect-square flex items-center justify-center border border-yellow-400 bg-gradient-to-tr from-yellow-400 to-yellow-200 text-yellow-600"
                          >
                            {joined.user.name
                              ? joined.user.name.substring(0, 2).toUpperCase()
                              : "NA"}
                          </div>
                        );
                      } else {
                        return (
                          <div
                            key={joined.user.id}
                            className="w-10 h-10 rounded-full aspect-square flex items-center justify-center border border-gray-300 bg-gradient-to-tr from-gray-200 to-gray-100 text-gray-400"
                          >
                            {joined.user.name
                              ? joined.user.name.substring(0, 2).toUpperCase()
                              : "NA"}
                          </div>
                        );
                      }
                    })}
                    {/* <div className="w-10 h-10 rounded-full aspect-square flex items-center justify-center border border-yellow-400 bg-gradient-to-tr from-yellow-400 to-yellow-200 text-yellow-600">
                        AP
                      </div>
                      <div className="w-10 h-10 rounded-full aspect-square flex items-center justify-center border border-green-400 bg-gradient-to-tr from-green-400 to-green-200 text-green-600">
                        JL
                      </div> */}
                  </div>
                  {room.messages.length > 0 && (
                    <span className="text-xs font-light">
                      Last Message: {formatTimeSince(room.messages[0].sentAt)}
                    </span>
                  )}
                  <span className="text-xs font-light">
                    Created:{" "}
                    {new Date(room.createdAt).toLocaleString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              ))}
            <div
              onClick={() => createNewRoom()}
              className="text-3xl h-32 sm:h-40 font-light w-full border flex items-center justify-center text-gray-600 border-gray-300 rounded-xl hover:shadow-lg hover:bg-gradient-to-tr hover:from-blue-300 hover:to-blue-100 hover:text-blue-800 hover:border-blue-500"
            >
              +
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
