import MUIProvider from "@/providers/MUIProvider";
import { Container } from "@mui/material";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <MUIProvider>
          <Container className="mx-auto">{children}</Container>
        </MUIProvider>
      </body>
    </html>
  );
}
