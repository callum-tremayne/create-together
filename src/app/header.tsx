"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FoldHorizontalIcon, LogInIcon, LogOutIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"}>
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user?.image ?? ""} />
            <AvatarFallback>
              {session.data?.user?.name
                ?.split(" ")
                .map((part) => part[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })} className="cursor-pointer">
          <LogOutIcon className="mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  return (
    <header className="bg-gray-100 py-2 dark:bg-gray-900 mx-auto">
      <div className="container flex justify-between items-center">
        <Link href="/" className="flex items-center text-xl hover:underline">
          <Image
            src="/icon.png"
            className="mr-6"
            width="60"
            height="60"
            alt="the application icon of collaborating hands on a computer"
          />
          CREATE
          <FoldHorizontalIcon />
          TOGETHER
        </Link>
        <div className="flex items-center gap-4">
          {session.data && <AccountDropdown />}
          {!session.data && (
            <Button onClick={() => signIn("google")} variant="link">
              <LogInIcon className="mr-2" /> Sign In
            </Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
