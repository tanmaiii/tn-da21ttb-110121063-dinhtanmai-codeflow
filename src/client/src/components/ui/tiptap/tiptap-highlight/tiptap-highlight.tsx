"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Editor } from "@tiptap/react";
import clsx from "clsx";
import { Highlighter } from "lucide-react";
import "./tiptap-highlight.scss";
import { Toggle } from "../../toggle";

export interface HighlightColor {
  label: string;
  value: string;
  border?: string;
}

export interface HighlightContentProps {
  editor?: Editor | null;
  colors?: HighlightColor[];
  activeNode?: number;
}

export const DEFAULT_HIGHLIGHT_COLORS: HighlightColor[] = [
  {
    label: "Green",
    value: "var(--tt-highlight-green)",
    border: "var(--tt-highlight-green-contrast)",
  },
  {
    label: "Blue",
    value: "var(--tt-highlight-blue)",
    border: "var(--tt-highlight-blue-contrast)",
  },
  {
    label: "Red",
    value: "var(--tt-highlight-red)",
    border: "var(--tt-highlight-red-contrast)",
  },
  {
    label: "Purple",
    value: "var(--tt-highlight-purple)",
    border: "var(--tt-highlight-purple-contrast)",
  },
  {
    label: "Yellow",
    value: "var(--tt-highlight-yellow)",
    border: "var(--tt-highlight-yellow-contrast)",
  },
];

export default function HighlightColorPicker({
  editor,
  colors = DEFAULT_HIGHLIGHT_COLORS,
}: {
  editor: Editor;
  colors?: HighlightColor[];
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Toggle
          className="size-8"
          pressed={editor.isActive("highlight")}
          onPressedChange={() => console.log("pressed")}
        >
          <Highlighter className="size-4" />
        </Toggle>
      </PopoverTrigger>
      <PopoverContent
        className="flex items-center gap-1 py-2 px-3 rounded-xl shadow-md w-fit"
        sideOffset={8}
      >
        {colors.map((color) => (
          <button
            key={color.value}
            onClick={() =>
              editor
                .chain()
                .focus()
                .toggleHighlight({ color: color.value })
                .run()
            }
            className={clsx(
              "p-1 rounded-sm flex items-center justify-center cursor-pointer",
              editor.isActive("highlight", { color: color.value })
                ? "bg-accent"
                : ""
            )}
            title={color.label}
          >
            <div
              className="w-5 h-5 rounded-full "
              style={{
                backgroundColor: color.value,
                border: `1px solid ${color.border}`,
              }}
            ></div>
          </button>
        ))}
        <div className="h-6 w-px bg-muted" />
        <button
          onClick={() => editor.chain().focus().unsetHighlight().run()}
          className="w-6 h-6 rounded-full border flex items-center justify-center text-xs cursor-pointer"
          title="Xóa highlight"
        >
          ⌀
        </button>
      </PopoverContent>
    </Popover>
  );
}
