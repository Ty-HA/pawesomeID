import React from "react";

import "./globals.css";
import { Poppins } from "next/font/google";
//import Head from "next/head";
import { Metadata } from "next";

const roboto = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pawesome ID",
  description: "Decentralized Passport for pets",
  keywords: "web, web3, passport, blockchain, pet, dog, cat",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>PAWESOME ID</title>
        <script async src="https://xumm.app/assets/cdn/xumm-oauth2-pkce.min.js"></script>
      </head>

      <body className={roboto.className}>{children}</body>
    </html>
  );
}
