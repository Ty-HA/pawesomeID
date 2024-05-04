import React from "react";

import "./globals.css";
import { Poppins } from "next/font/google";
//import Head from "next/head";
import { Metadata } from "next";
import NavBar from "@/components/NavBar";

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
        <title>Pawesome ID</title>
      </head>
      <body className={roboto.className}>
        <>
        <NavBar/>

      <main className="flex min-h-screen flex-col items-center justify-between">
        
          {children}
      </main>
        </>
        </body>
    </html>
  );
}
