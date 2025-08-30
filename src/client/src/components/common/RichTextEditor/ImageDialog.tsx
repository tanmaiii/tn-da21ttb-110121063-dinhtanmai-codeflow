"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ImageDialog({
  trigger,
  onSubmit,
}: {
  trigger: React.ReactNode;
  onSubmit: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url) return;
    onSubmit(url);       
    setUrl("");           
    setOpen(false);     
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thêm ảnh từ URL</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="https://..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button onClick={handleSubmit} className="text-white p-5">Thêm ảnh</Button>
      </DialogContent>
    </Dialog>
  );
}
