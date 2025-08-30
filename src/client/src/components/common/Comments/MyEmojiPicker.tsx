"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useThemeStore } from "@/stores/theme_store";
// import { useUI } from "@/context/UIContext";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { IconMoodSmile } from "@tabler/icons-react";

const MyEmojiPicker = ({ onSelect }: { onSelect: (emoji: string) => void }) => {
  const { theme } = useThemeStore();

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="rounded" size="icon">
          <IconMoodSmile size={26} className="size-6 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-auto p-0">
        <Picker
          autoFocus
          theme={theme === "dark" ? "Dark" : "Light"}
          data={data}
          showPreview={false}
          showSkinTones={false}
          emojiSize={24}
          onEmojiSelect={(emoji: { native: string }) => {
            handleSelect(emoji.native);
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MyEmojiPicker;
