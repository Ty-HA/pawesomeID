"use client";

import React from "react";

// import Web3AuthLogin from "../../components/Web3AuthLogin";
// import XamanButton from "@/components/XamanButton";
import CrossmarkButton from "@/components/CrossmarkButton";



export default function LoginHome() {

  return (
    <>
       <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-center mt-32 w-full bg-white">
            <h1 className="mt-16 text-2xl font-semibold text-blue-900 mb-4">WELCOME</h1>
            <h2 className="text-base text-center md:text-xl font-semibold text-blue-900 mb-8 pr-12 pl-12">Connect your wallet to access to your Account</h2>
          <div className="flex bg-white">
         
            <CrossmarkButton title="Create your PawesomeID"/>
           
           
          </div>
          
        </section>
        </main>
        
    </>
  );
}
