import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Health Monitor Dashboard",
  description: "Real-time health and analytics dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
