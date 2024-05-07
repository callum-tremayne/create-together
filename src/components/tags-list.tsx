import { Badge } from "@/components/ui/badge";

export function splitTags(tags: string) {
    return tags.split(",").map((tag) => tag.trim());
}

export default function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2 flex-wrap pb-5">
      {tags.map((tag) => (
        <Badge className="w-fit cursor-pointer" key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  );
}
