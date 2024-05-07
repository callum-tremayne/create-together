import { getRoom } from "@/services/rooms";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import TagsList, { splitTags } from "@/components/tags-list";
import { CreateTogetherVideo } from "./video-player";
import { unstable_noStore } from "next/cache";

export default async function RoomPage(props: { params: { roomId: string } }) {
  unstable_noStore();
  const roomId = props.params.roomId;

  const room = await getRoom(roomId);

  if (!room) {
    return <h1>No room of this ID found.</h1>;
  }

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <CreateTogetherVideo room={room} />
        </div>
      </div>
      <div className="col-span-1 p-4 pl-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
          <h1 className="text-base font-semibold pb-2">{room?.name}</h1>
          <p className="text-sm text-gray-500 pb-4">{room?.description}</p>
          <TagsList tags={splitTags(room.tags)} />
          <div className="flex items-center justify-center">
            {room?.githubRepo && (
              <Link
                href={room?.githubRepo}
                className="flex items-center self-center gap-2 text-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                Github Project
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
