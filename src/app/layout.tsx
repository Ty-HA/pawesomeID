import React from "react";

import "./globals.css";
import { Poppins } from "next/font/google";
//import Head from "next/head";
import { Metadata } from "next";

const roboto = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trust Point",
  description: "Trust Point",
  keywords: "web, web3, loyalty, blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Trust Point</title>
      </head>

      <body className={roboto.className}>{children}</body>
    </html>
  );
}
