import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
          <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">
            POC CSA
          </h2>
          <p className="mb-12 text-lg text-gray-500">
            AI based gender extractor
          </p>
          <div className="w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
