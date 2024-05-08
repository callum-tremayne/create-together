"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TagsList from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { Room } from "@/db/schema";
import Link from "next/link";
import { GithubIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RoomCard({ room }: { room: Room }) {
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
