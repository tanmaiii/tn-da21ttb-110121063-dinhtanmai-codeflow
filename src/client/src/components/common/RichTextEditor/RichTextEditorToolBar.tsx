"use client";
import HighlightColorPicker from "@/components/ui/tiptap/tiptap-highlight/tiptap-highlight";
import TiptapLinkPopover from "@/components/ui/tiptap/tiptap-link-popover/tiptap-link-popover";
import ImageUploader from "@/components/ui/tiptap/tiptap-upload-image/tiptap-upload-image";
import TiptapYoutube from "@/components/ui/tiptap/tiptap-youtube/tiptap-youtube";
import { Toggle } from "@/components/ui/toggle";
import { Editor } from "@tiptap/react";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  List,
  ListChecks,
  ListOrdered,
  Strikethrough,
  TextQuote,
} from "lucide-react";
export default function RichTextEditorToolBar({
  editor,
}: {
  editor: Editor | null;
}) {
  if (!editor) return null;
  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      preesed: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      preesed: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      preesed: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      preesed: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      preesed: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      preesed: editor.isActive("strike"),
    },
    {
      icon: <Code className="size-4" />,
      onClick: () => editor.chain().focus().toggleCodeBlock().run(),
      preesed: editor.isActive("code"),
    },
    {
      icon: <AlignLeft className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("left").run(),
      preesed: editor.isActive({ textAlign: "left" }),
    },
    {
      icon: <AlignCenter className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("center").run(),
      preesed: editor.isActive({ textAlign: "center" }),
    },
    {
      icon: <AlignRight className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("right").run(),
      preesed: editor.isActive({ textAlign: "right" }),
    },
    {
      icon: <AlignJustify className="size-4" />,
      onClick: () => editor.chain().focus().setTextAlign("justify").run(),
      preesed: editor.isActive({ textAlign: "justify" }),
    },
    {
      icon: <List className="size-4" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      preesed: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrdered className="size-4" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      preesed: editor.isActive("orderedList"),
    },
    {
      icon: <ListChecks className="size-4" />,
      onClick: () => editor.chain().focus().toggleTaskList().run(),
      preesed: editor.isActive("taskList"),
    },
  ];

  return (
    <div className="border-b p-1.5 mb-1 flex flex-wrap items-center space-x-1 z-4 rounded-tr-xl rounded-tl-xl sticky top-14 bg-background-1">
      {/* Nhóm tiêu đề */}
      {Options.slice(0, 3).map((option, i) => (
        <Toggle
          key={`heading-${i}`}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}

      <div className="w-px h-5 bg-muted" />

      {/* Nhóm định dạng chữ */}
      {Options.slice(3, 7).map((option, i) => (
        <Toggle
          key={`format-${i}`}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}

      <TiptapLinkPopover editor={editor} />

      <HighlightColorPicker editor={editor} />

      <Toggle
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-1 rounded ${
          editor.isActive("blockquote") ? "bg-gray-200" : ""
        }`}
        title="Blockquote"
      >
        <TextQuote size={16} />
      </Toggle>

      <div className="w-px h-5 bg-muted" />

      {/* Danh sách */}
      {Options.slice(11, 14).map((option, i) => (
        <Toggle
          key={`list-${i}`}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}

      <div className="w-px h-5 bg-muted" />
      {/* Nhóm căn lề */}
      {Options.slice(7, 11).map((option, i) => (
        <Toggle
          key={`align-${i}`}
          size="sm"
          pressed={option.preesed}
          onPressedChange={option.onClick}
        >
          {option.icon}
        </Toggle>
      ))}
      <div className="w-px h-5 bg-muted" />

      {/* Upload ảnh - video*/}
      <ImageUploader
        onSubmit={(url) => {
          editor.chain().focus().setImage({ src: url }).run();
        }}
      />
      <TiptapYoutube editor={editor} />
    </div>
  );
}
