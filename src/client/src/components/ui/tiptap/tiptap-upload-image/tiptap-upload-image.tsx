"use client";

import IconLoading from "@/components/common/IconLoading/IconLoading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import uploadService from "@/services/file.service";
import { ImageIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Toggle } from "../../toggle";

export default function ImageUploader({
  onSubmit,
}: {
  onSubmit: (url: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadService.upload(formData);
      if (res?.data?.files?.length > 0) {
        const data = await res.data.files[0].path;
        if (data) {
          const path = `/images/${data}`;
          onSubmit(path);
          setOpen(false);
          setFile(null);
        }
      } else {
        toast.error("Upload failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Toggle size="sm">
          <ImageIcon className="size-4" />
        </Toggle>
      </DialogTrigger>
      <DialogContent className="w-[90%] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Image</DialogTitle>
        </DialogHeader>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Input
            id="picture"
            type="file"
            className="w-full"
            onChange={handleFileChange}
          />
        </div>
        <div className="flex justify-end">
          <Button
            disabled={!file || uploading}
            onClick={handleUpload}
            className="max-w-fit mt-2 color-white"
          >
            {uploading ? <IconLoading /> : "Upload"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
