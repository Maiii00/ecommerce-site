import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google"
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/providers/CartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My E-commerce",
  description: "A simple e-commerce website built with Nest.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          <main className="container mx-auto p-4">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
