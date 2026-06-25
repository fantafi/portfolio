import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cây Hoa Sen 3D",
  description: "Một mô phỏng 3D sống động về cây hoa sen.",
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
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
