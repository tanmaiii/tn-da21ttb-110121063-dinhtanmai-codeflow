"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { CheckIcon, Clapperboard } from "lucide-react";
import { useState } from "react";

export default function TiptapYoutube({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  if (!editor) {
    return null;
  }

  const addYoutubeVideo = () => {
    if (url) {
      editor.commands.setYoutubeVideo({
        src: url,
        width: 640,
        height: 480,
      });
      setOpen(false);
      setUrl("");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          onPressedChange={() => setOpen(!open)}
        >
          <Clapperboard className="size-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2 items-center p-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
          className="text-sm h-6 outline-none border-none focus-visible:ring-0 focus-visible:border-none w-64"
        />
        <Toggle size="sm" onClick={addYoutubeVideo}>
          <CheckIcon />
        </Toggle>
      </PopoverContent>
    </Popover>
  );
}
