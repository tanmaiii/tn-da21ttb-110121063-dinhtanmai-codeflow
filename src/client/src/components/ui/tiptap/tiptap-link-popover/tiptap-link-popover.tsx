"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import { CheckIcon, Link, TrashIcon } from "lucide-react";
import { useState } from "react";

export default function TiptapLinkPopover({ editor }: { editor: Editor }) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleOpen = () => {
    const { href } = editor.getAttributes("link");
    setUrl(href || "");
    setOpen(true);
  };

  const handleSetLink = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        ?.setLink({ href: url })
        .run();
    } else {
      //   editor.chain().focus().unsetMark(LinkExtension.name).run();
      editor.chain().focus().unsetLink().run();
    }
    setOpen(false);
    setUrl("");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Toggle
          size="sm"
          pressed={editor.isActive("link")}
          onPressedChange={() => handleOpen()}
        >
          <Link className="size-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent className="flex gap-2 items-center p-2">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          className="text-sm h-6 outline-none border-none focus-visible:ring-0 focus-visible:border-none w-64"
        />
        <Toggle size="sm" onClick={handleSetLink}>
          <CheckIcon />
        </Toggle>
        <Toggle
          size="sm"
          onClick={() => editor.chain().focus().unsetLink().run()}
        >
          <TrashIcon />
        </Toggle>
      </PopoverContent>
    </Popover>
  );
}
