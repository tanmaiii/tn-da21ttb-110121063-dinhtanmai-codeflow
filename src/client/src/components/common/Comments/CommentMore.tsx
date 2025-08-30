import { useTranslations } from "next-intl";
import { IconTrash } from "@tabler/icons-react";
import { EllipsisVertical, PenIcon } from "lucide-react";
import MoreDropdown, { DropdownAction } from "../MoreDropdown";
import CardPost_Button from "../CardPost/CardPostButton";

interface Comment_MoreProps {
  onUpdate?: () => void;
  onDelete?: () => void;
  commentContent?: string;
}

export default function CommentMore({
  onUpdate,
  onDelete,
  commentContent,
}: Comment_MoreProps) {
  const t = useTranslations("comment");

  if (!onUpdate && !onDelete) return null;
  
  const actions: DropdownAction[] = [
    {
      id: 'update',
      label: t("editComment"),
      icon: <PenIcon size={16} />,
      onClick: onUpdate || (() => {}),
      isVisible: !!onUpdate
    },
    {
      id: 'delete',
      label: t("deleteComment"),
      icon: <IconTrash size={16} />,
      onClick: () => {},
      isVisible: !!onDelete,
      isDeleteAction: true
    }
  ];

  const handleDelete = () => {
    if (onDelete) {
      return Promise.resolve(onDelete());
    }
    return Promise.resolve();
  };

  const customTrigger = (
    <CardPost_Button
      className="p-x-0"
      icon={<EllipsisVertical size={20} />}
      onClick={() => {}}
    />
  );

  return (
    <MoreDropdown
      actions={actions}
      deleteItemName={commentContent || t("comments")}
      onDelete={handleDelete}
      trigger={customTrigger}
    />
  );
}
