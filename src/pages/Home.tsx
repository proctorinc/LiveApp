import { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RoomCard from "@/features/room/components/RoomCard";
import { ArrowRight, Plus } from "@phosphor-icons/react";
import useUserRooms from "@/features/room/hooks/useUserRooms";

function Home() {
  const [roomId, setRoomId] = useState("");
  const { rooms, joinRoom, getRooms, createNewRoom } = useUserRooms();

  useEffect(() => {
    getRooms();
  }, []);

  const submitJoinRoom = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (roomId) {
      joinRoom(roomId);
      setRoomId("");
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center">
      <Navbar />
      <div className="flex w-full flex-grow flex-col items-center justify-center gap-4 bg-gray-50 sm:p-4">
        <div className="flex w-full flex-col px-2 py-4">
          <div className="flex w-full flex-col items-center gap-2 py-8">
            <h1 className="text-3xl font-light">Welcome to Live Chat</h1>
            <h3 className="text-sm">
              Create or join a room to chat live with friends!
            </h3>
          </div>
          <div className="sticky bottom-0 flex w-full flex-col items-center gap-4">
            <form
              onSubmit={submitJoinRoom}
              className="flex w-full max-w-xs justify-center rounded-xl border border-gray-300 shadow-md"
            >
              <input
                type="text"
                placeholder="Enter Room ID"
                className="w-full rounded-l-xl border-r border-gray-300 bg-white px-4 py-2"
                value={roomId}
                onChange={(event) => setRoomId(event.target.value)}
              />
              <button
                disabled={!roomId}
                type="submit"
                className="flex w-fit items-center gap-1 rounded-r-xl bg-gradient-to-tr from-gray-50 to-gray-200 px-3 py-2 text-sm text-gray-700 disabled:bg-white disabled:from-white disabled:to-white disabled:text-gray-400"
              >
                <ArrowRight className="text-gray-700" weight="bold" size={15} />
              </button>
            </form>
          </div>
        </div>
        <div className="flex w-full max-w-3xl flex-grow flex-col items-center gap-4 overflow-y-scroll rounded-xl border border-gray-300 bg-gradient-to-tr from-gray-200 to-gray-50 p-4 sm:p-6">
          <div className="flex w-full max-w-xs flex-col gap-4 sm:max-w-xl lg:max-w-3xl">
            {/* <div className="border-b border-gray-300 py-4">
            <h3>Recently Joined Rooms:</h3>
          </div> */}
            <div className="w-full pl-2 text-left">
              <h3>My Rooms:</h3>
            </div>
            <div className="grid grid-flow-row grid-cols-1 justify-center gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {!!rooms &&
                rooms.map((room) => <RoomCard key={room.id} room={room} />)}
              <div
                onClick={() => createNewRoom()}
                className="flex h-full min-h-56 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 text-3xl font-light text-gray-600 hover:border-blue-500 hover:bg-gradient-to-tr hover:from-blue-300 hover:to-blue-100 hover:text-blue-800 hover:shadow-lg"
              >
                <Plus size={25} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
