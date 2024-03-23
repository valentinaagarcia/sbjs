'use client';
import { Inter } from "next/font/google";
import "./globals.css";
// 1. import `NextUIProvider` component


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}