import { Button } from "@/components/ui/button";
import { TextDescription } from "@/components/ui/text";
import { paths } from "@/data/path";
import apiConfig from "@/lib/api";
import { useUserStore } from "@/stores/user_store";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import MyImage from "../MyImage";
import CommentInput from "./CommentInput";

export default function CommnetInputDefault({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [active, setActive] = useState<boolean>(false);
  const t = useTranslations("comment");
  const { user } = useUserStore();
  const router = useRouter();
  
  if(!user){
    return (
      <div className="flex flex-col w-full bg-input/20 border rounded-lg p-4 gap-3">
          <TextDescription>Vui lòng đăng nhập để bình luận</TextDescription>
          <Button variant="default" onClick={() => router.push(paths.LOGIN)}>Đăng nhập</Button>
      </div>
    )
  }
  
  return (
    <div className="mt-4">
      {!active ? (
        <div
          onClick={() => setActive(true)}
          className="flex flex-col w-full bg-input/20 border rounded-lg"
        >
          <div className="flex items-center gap-2 p-3 cursor-pointer">
            <div className="w-10 h-10 min-h-10 min-w-10 ">
              <MyImage
                src={user?.avatar ?? apiConfig.avatar(user?.name ?? "c")} 
                alt="logo"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-lg"
                defaultSrc={apiConfig.avatar(user?.name ?? "c")}
              />
            </div>
            <div className="flex items-center gap-2">
              <TextDescription className="text-md">
                {t("placeholder")}
              </TextDescription>
            </div>
          </div>
        </div>
      ) : (
        <CommentInput
          onSubmit={(value) => {
            if (value.length > 0) {
              onSubmit(value);
            }
            setActive(false);
          }}
          turnOff={() => {
            setActive(false);
          }}
        />
      )}
    </div>
  );
}
