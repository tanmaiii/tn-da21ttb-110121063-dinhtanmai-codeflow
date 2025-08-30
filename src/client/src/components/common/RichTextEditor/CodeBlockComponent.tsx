import { NodeViewContent, NodeViewWrapper } from "@tiptap/react";
import { Copy } from "lucide-react";
import React, { useEffect } from "react";
import { toast } from "sonner";

interface CodeBlockNode {
  node: {
    attrs: {
      language?: string;
    };
    textContent: string;
  };
}

export const CodeBlockComponent = ({ node }: CodeBlockNode) => {
  const language = node.attrs.language || "text";
  const code = node.textContent;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Copied to clipboard!");
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  useEffect(() => {
    console.log("Code block content:", language);
  },[language])

  return (
    <NodeViewWrapper as="div" className="relative group font-mono text-sm">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 bg-gray-800 text-white cursor-pointer hover:bg-gray-700 text-xs px-2 py-2 rounded opacity-0 group-hover:opacity-100 transition"
      >
        <Copy size={14} width={14} height={14} />
      </button>

      <pre className={`language-${language}`}>
        <code>
          <NodeViewContent as="code" />
        </code>
      </pre>
    </NodeViewWrapper>
  );
};


