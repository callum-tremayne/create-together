"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editRoomAction } from "./actions";
import { useParams } from "next/navigation";
import { Room } from "@/db/schema";

const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(250),
  tags: z.string().min(1).max(50),
  githubRepo: z.string().min(1).max(50),
});

export function EditRoomForm({ room }: { room: Room }) {
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: room.name,
      description: room.description,
      tags: room.tags,
      githubRepo: room.githubRepo,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await editRoomAction({
      id: params.roomId as string,
      ...values,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Name</FormLabel>
              <FormDescription>
                Enter the name of the project you are working on.
              </FormDescription>
              <FormControl>
                <Input placeholder="Create -> Together" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormDescription>
                Describe the project that you are working on.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="A collaborative working web application for project collaboration"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormDescription>
                List any tags related to the project.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="NextJS, Typescript, TailwindCSS"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormDescription>
                Please put a link to the project you are working on.
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="https://github.com/tremayne97/create-together"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
