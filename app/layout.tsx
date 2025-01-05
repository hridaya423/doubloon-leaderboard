import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doubloon Leaderboard",
  description: "Doubloon leaderboard for High Seas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="https://highseas.hackclub.com/doubloon.svg" sizes="any" />
      <body>
        {children}
      </body>
    </html>
  );
}
