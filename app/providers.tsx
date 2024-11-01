"use client";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useRouter } from "next/navigation";
import { ArtworkProvider } from "./ArtworkContext";

export function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      <NextUIProvider navigate={router.push}>
        <ArtworkProvider>{children}</ArtworkProvider>
      </NextUIProvider>
    </NextThemesProvider>
  );
}
