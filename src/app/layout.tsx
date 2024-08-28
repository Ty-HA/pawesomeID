import React from "react";
import { Metadata } from "next";

import "./globals.css";
import Providers from "@/app/provider";
import { Rubik } from "next/font/google";
//import Head from "next/head";

// import NavBar from "@/components/NavBar";
import NavBarLanding from "@/components/NavBarLanding";
import Footer from "@/components/Footer";

const rubik = Rubik({ weight: "400", subsets: ["latin"] });

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

      <body className={rubik.className}>
        <NavBarLanding />
        <main>
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
