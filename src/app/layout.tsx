import React from "react";
import { Metadata } from "next";

import "./globals.css";
import Providers from "@/app/provider";
import { Rubik } from "next/font/google";

import NavBarLanding from "@/components/NavBarLanding";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";

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
        {/* La langue englobe navbar + contenu + footer (sélecteur dans la navbar) */}
        <LanguageProvider>
          <NavBarLanding />
          <main>
            <Providers>{children}</Providers>
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
