"use client";

import { paths } from "@/data/path";
import authService from "@/services/auth.service";
import tokenService from "@/services/token.service";
import { useUserStore } from "@/stores/user_store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { removeUser } = useUserStore();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await authService.logout();
      removeUser();
      tokenService.clearTokens();
      router.push(paths.LOGIN);
    };
    logout();
  }, [removeUser, router]);

  return <div>See you soon 👋👋👋</div>;
}
