"use client";

import React, { useEffect } from "react";

import NavBar from "../../components/NavBar";
import Web3AuthLogin from "../../components/Web3AuthLogin";


export default function LoginHome() {

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-center mt-32 w-full">
            <h1 className="mt-16 text-2xl font-semibold text-blue-900 mb-4">WELCOME</h1>
            <h2 className="text-base text-center md:text-xl font-semibold text-blue-900 mb-8 pr-12 pl-12">Connect your wallet to access to your Account</h2>
          <div className="flex">
            <Web3AuthLogin />
          </div>
          
        </section>
        </main>
        
    </>
  );
}
