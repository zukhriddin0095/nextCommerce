import type { Metadata } from "next";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "../../global.css"
import childrenType from "@/types/childrenType";

export const metadata: Metadata = {
  title: "E-commerce Project",
  description: "E-commerce wepsite forever",
};

export default function RootLayout({
  children,
}: childrenType) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
