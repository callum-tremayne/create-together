"use client";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();
  return (
    <div className="flex gap-2 flex-wrap pb-5">
      {tags.map((tag) => (
        <button
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
          className={cn(badgeVariants())}
          key={tag}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
