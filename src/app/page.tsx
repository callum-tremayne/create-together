import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { GithubIcon } from "lucide-react";
import { getRooms } from "@/services/rooms";
import TagsList, { splitTags } from "@/components/tags-list";
import { SearchBar } from "./search-bar";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-1">
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      <CardFooter className="flex justify-between">
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon />
            Github Project
          </Link>
        )}
        <Button asChild>
          <Link href={`rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  const rooms = await getRooms(searchParams.search);
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find a Room</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>
    </main>
  );
}
