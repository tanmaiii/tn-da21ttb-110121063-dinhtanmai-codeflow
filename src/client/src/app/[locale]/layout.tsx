import ThemeInitializer from "@/components/themeInitializer";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Nunito } from "next/font/google";

const roboto = Nunito({
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Code Flow",
  description: "A code review tool for developers",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const messages = await getMessages();

  return (
    <html lang={(await params).locale} suppressHydrationWarning>
      <ThemeInitializer />
      <body className={`${roboto.className} bg-background-2 dark:bg-background-3`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
