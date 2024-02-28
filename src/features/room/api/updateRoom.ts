import { fetchQuery } from "@/lib/fetch";
import { Room, UpdateRoomBody } from "@/types";

type updateRoomProps = {
  roomId: string;
  updateRoomBody: UpdateRoomBody;
};

export const updateRoom = async (props: updateRoomProps) => {
  const { roomId, updateRoomBody } = props;

  return fetchQuery<Room>({
    method: "PATCH",
    endpoint: `/room/${roomId}`,
    body: updateRoomBody,
  });
};
