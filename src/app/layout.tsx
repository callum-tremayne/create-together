import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ModeToggle } from "@/components/mode-toggle";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "./header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create -> Together",
  description: "Collaboration Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
