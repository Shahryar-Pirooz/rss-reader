import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RSS Reader",
  description: "A small RSS and Atom feed reader.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        {children}
      </body>
    </html>
  );
}
