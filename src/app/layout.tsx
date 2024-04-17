import Providers from "@/providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techsnovel Project",
  description: "A Nextjs project with MUI and TailwindCSS with Typescript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Toaster />
          <div className="mx-auto container p-5">{children}</div>
          {/* <Container className="mx-auto">{children}</Container> */}
        </Providers>
      </body>
    </html>
  );
}
