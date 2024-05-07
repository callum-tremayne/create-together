"use server";

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await getSession();

  if (!session) {
    throw new Error("No session found");
  }

  const api_key = process.env.GET_STREAM_API_KEY!;
  const api_secret = process.env.GET_STREAM_API_SECRET!;

  const serverClient = StreamChat.getInstance(api_key, api_secret);

  const token = serverClient.createToken(session.user.id);
  return token;
}
