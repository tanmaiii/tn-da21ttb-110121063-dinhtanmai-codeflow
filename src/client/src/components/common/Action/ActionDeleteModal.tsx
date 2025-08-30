import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TextDescription } from "@/components/ui/text";
import { useTranslations } from "next-intl";
import { Dispatch, SetStateAction } from "react";

interface ActionDeleteProps {
  title?: string;
  onSubmit: () => void;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}

export default function  ActionDeleteModal({
  title = "this item",
  onSubmit,
  open,
  setOpen,
}: ActionDeleteProps) {
  const t = useTranslations("common");
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{t("deleteConfirmTitle")}</AlertDialogTitle>
          <AlertDialogDescription>
            <TextDescription className="text-base">
              {t("deleteConfirm", { title })}
            </TextDescription>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>{t("delete")}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}