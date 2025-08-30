import { Button } from "@/components/ui/button";
import TextHeading from "@/components/ui/text";
import { utils_ApiImageToLocalImage } from "@/utils/image";
import { cx } from "class-variance-authority";
import { motion } from "framer-motion";
import { ImageUp, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";


interface DragDropImageProps extends React.HTMLProps<HTMLInputElement> {
  file: File | null;
  image_default?: string;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function DragDropImage(props: DragDropImageProps) {
  const { file, onChange, image_default, className } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const [openDrop, setOpenDrop] = useState(false);
  const [imageDefault, setImageDefault] = useState<string | null>(null);
  const t = useTranslations("common");

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onChange) {
        onChange(e);
      }
    }
    setOpenDrop(false);
  };

  const onRemove = () => {
    onChange({
      target: { files: null },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
    if (inputRef.current) {
      inputRef.current.value = "";
      setImageDefault(null);
    }
  };

  useEffect(() => {
    if (file) {
      setImageDefault(URL.createObjectURL(file));
    } else if (image_default) {
      setImageDefault(image_default);
    } else {
      setImageDefault(null);
    }
  }, [file, image_default]);

  return (
    <div
      className={cx("flex flex-col gap-2 ", className)}
      onDragEnter={() => setOpenDrop(true)}
      onDragLeave={() => setOpenDrop(false)}
    >
      <div className="relative flex flex-col gap-2 w-full h-full min-h-[200px]">
        {(file || imageDefault) && (
          <>
            <div className="absolute top-0 left-0 w-full h-full rounded-lg flex justify-center items-center">
              <Image
                src={
                  file
                    ? URL.createObjectURL(file)
                    : utils_ApiImageToLocalImage(imageDefault)
                }
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
                width={200}
                height={200}
              />
            </div>
            <Button
              variant={"outline"}
              onClick={onRemove}
              className="absolute top-2 right-2 z-20 bg-background-1/40"
            >
              <Trash size={12} width={12} height={12} className="text-color-1" />
            </Button>
          </>
        )}
        <label
          htmlFor="file-image"
          className={cx(
            "flex flex-col absolute gap-4 w-full h-full border-2 border-dashed rounded-lg justify-center items-center cursor-pointer z-10",
            {
              "opacity-0 bg-background-1/80 hover:opacity-100":
                file || imageDefault,
            },
            { "opacity-100 ": openDrop }
          )}
        >
          <motion.div
            animate={{
              y: openDrop ? -10 : 0, // Di chuyển lên 10px nếu openDrop
              opacity: openDrop ? 1 : 0.4,
            }}
            transition={{ duration: 0.3 }}
          >
            <ImageUp size={60} className={cx("text-color-2")} />
          </motion.div>
          <TextHeading className="text-color-2 text-center">
            {t("dragDrop", { field: t("image") })}
          </TextHeading>
          <Button id={"file-image"} variant={"outline"} className="w-fit">
            {t("upload", { field: t("image") })}
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="w-full h-full absolute opacity-0 cursor-pointer"
            onChange={onChangeInput}
          />
        </label>
      </div>
    </div>
  );
}
