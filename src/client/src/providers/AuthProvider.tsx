"use client";

import authService from "@/services/auth.service";
import tokenService from "@/services/token.service";
import { useUserStore } from "@/stores/user_store";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser } = useUserStore();
  const route = useRouter();

  useEffect(() => {
    if (tokenService.accessToken) {
      (async () => {
        try {
          const response = await authService.getInfoUser({ token: tokenService.accessToken });
          if (response && response.data) {
            setUser(response.data);
          } 
        } catch (error) {
          console.error("Error fetching user info:", error);
          tokenService.clearTokens();
          route.push("/login");
        }
      })();
    }
  }, [setUser, route]);

  const {} = useQuery({
    queryKey: ["user_info"],
    queryFn: async () => {
      const response = await authService.getInfoUser({ token: tokenService.accessToken });
      if (response && response.data) {
        setUser(response.data);
      }
      return response.data;
    },
    enabled: !!tokenService.accessToken,
  });

  return <>{children}</>;
}
