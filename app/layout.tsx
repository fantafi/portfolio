import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tai Pham | Software Engineer",
  description:
    "Full-stack software engineer focused on reliable web products, AI tooling, and freelance project delivery.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
