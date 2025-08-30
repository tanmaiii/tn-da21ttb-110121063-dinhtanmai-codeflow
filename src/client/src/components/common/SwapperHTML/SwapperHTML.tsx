import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { EditorContent, ReactNodeViewRenderer, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { cx } from "class-variance-authority";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import "highlight.js/styles/monokai.css";
import React from "react";
import { CodeBlockComponent } from "../RichTextEditor/CodeBlockComponent";
import { CustomImage } from "./CustomImage";
import TaskList from "@tiptap/extension-task-list";
import Youtube from "@tiptap/extension-youtube";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { all, createLowlight } from "lowlight";
import TaskItem from "@tiptap/extension-task-item";
import Highlight from "@tiptap/extension-highlight";
import OrderedList from "@tiptap/extension-ordered-list";
import BulletList from "@tiptap/extension-bullet-list";
import Link from "@tiptap/extension-link";

const lowlight = createLowlight(all);
lowlight.register("html", html);
lowlight.register("css", css);
lowlight.register("js", js);
lowlight.register("ts", ts);

interface SwapperHTMLProps extends React.HTMLAttributes<HTMLDivElement> {
  content: string;
  className?: string;
}

export default function SwapperHTML({ content, className }: SwapperHTMLProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent); // 👈 dùng custom CodeBlock
        },
      }).configure({ lowlight }),
      CustomImage, // Moved Image into extensions array
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal ml-3",
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc ml-3",
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight,
      Link.configure({
              openOnClick: false, // không tự mở link khi click
              autolink: true, // tự nhận diện URL
              linkOnPaste: true, // tự tạo link khi paste URL
              HTMLAttributes: {
                rel: "noopener noreferrer",
                target: "_blank", // mở link ở tab mới
                class: "text-blue-600 underline",
              },
            }),
    ],
    content,
    editable: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={cx("tiptap", className)}>
      <EditorContent editor={editor} className="prose max-w-none" />
    </div>
  );
}
