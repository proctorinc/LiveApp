import { fetchQuery } from "@/lib/fetch";
import { Room } from "@/types";

type UpdateRoomShareIdProps = {
  roomId: string;
};

export const updateRoomShareId = async (props: UpdateRoomShareIdProps) => {
  const { roomId } = props;

  return fetchQuery<Room>({
    method: "PATCH",
    endpoint: `/room/${roomId}/shareId`,
  });
};
