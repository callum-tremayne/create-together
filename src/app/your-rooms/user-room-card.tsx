"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import TagsList from "@/components/tags-list";
import { cn, splitTags } from "@/lib/utils";
import { Room } from "@/db/schema";
import Link from "next/link";
import { GithubIcon, PencilIcon, TrashIcon } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { deleteRoomAction } from "./actions";

export default function UserRoomCard({ room }: { room: Room }) {
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="relative">
        <Button className="absolute top-2 right-2" size={"icon"}>
          <Link href={`/edit-room/${room.id}`}>
            <PencilIcon />
          </Link>
        </Button>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex gap-1">
        <TagsList tags={splitTags(room.tags)} />
      </CardContent>
      {room.githubRepo && (
        <Link
          href={room.githubRepo}
          className="flex items-center gap-2 p-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
          Github Project
        </Link>
      )}
      <CardFooter className="flex justify-between">
        <Button asChild>
          <Link href={`rooms/${room.id}`}>Join Room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant={"destructive"}>
              <TrashIcon className="w-4 h-4 mr-2" />
              Delete Room
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes, Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
