import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({weight: ["500"], subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={poppins.className}>{children}</body>
      </html>
  );
}
