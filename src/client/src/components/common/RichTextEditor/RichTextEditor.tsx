'use client';
import { mergeAttributes } from '@tiptap/core';
import BulletList from '@tiptap/extension-bullet-list';
import Heading from '@tiptap/extension-heading';
import { Highlight as TiptapHighlight } from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import OrderedList from '@tiptap/extension-ordered-list';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import Youtube from '@tiptap/extension-youtube';
import { EditorContent, ReactNodeViewRenderer, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { cx } from 'class-variance-authority';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import 'highlight.js/styles/monokai.css';
import ImageResize from 'tiptap-extension-resize-image';
import RichTextEditorToolBar from './RichTextEditorToolBar';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { all, createLowlight } from 'lowlight';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';
import { CodeBlockComponent } from './CodeBlockComponent';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

export const Highlight = TiptapHighlight.extend({
  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: element => element.style.backgroundColor,
        renderHTML: attributes => {
          if (!attributes.color) return {};
          return {
            style: `background-color: ${attributes.color}`,
          };
        },
      },
    };
  },
  renderHTML({ HTMLAttributes }) {
    return ['mark', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
});

interface RichTextEditorProps {
  content: string;
  onChange: (value: string) => void;
  className?: string;
  registration?: UseFormRegisterReturn;
  error?: FieldError;
}

export default function RichTextEditor({
  content,
  onChange,
  className,
  registration,
  error,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-3',
        },
      }),
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Highlight,
      Image,
      ImageResize,
      Link.configure({
        openOnClick: false, // không tự mở link khi click
        autolink: true, // tự nhận diện URL
        linkOnPaste: true, // tự tạo link khi paste URL
        HTMLAttributes: {
          rel: 'noopener noreferrer',
          target: '_blank', // mở link ở tab mới
          class: 'text-blue-600 underline',
        },
      }),
      Youtube.configure({
        controls: true,
        nocookie: true,
      }),
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlockComponent);
        },
      }).configure({
        lowlight,
      }),
    ],
    content: content,
    editorProps: {
      attributes: {
        class: 'min-h-[156px] focus:outline-none focus:ring-0 focus:border-0 py-4 px-8',
      },
    },
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML(); // Lấy HTML trực tiếp từ editor
      onChange(htmlContent); // Gửi nội dung đã được lưu lại
    },
  });

  return (
    <>
      <div className={cx('min-h-[156px] border rounded-xl dark:bg-input/30', className)}>
        <div className="sticky top-14 z-40">
          <RichTextEditorToolBar editor={editor} />
        </div>
        <EditorContent spellCheck={false} editor={editor} {...registration} />
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </>
  );
}
