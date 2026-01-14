import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import LoadingScreen from "./components/LoadingScreen";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TurboTechnik Marine Trading",
  description: "Official website of TurboTechnik Marine Trading. Leading provider of marine engineering solutions, ship maintenance, marine equipment, and comprehensive maritime services. Your trusted partner in marine engineering excellence with cutting-edge technology and unparalleled expertise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingScreen />
        {children}
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
