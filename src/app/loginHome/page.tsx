"use client";

import React from "react";
import Image from 'next/image';

import Web3AuthLogin from "@/components/web3auth/Web3AuthLogin";
import KaijuLoginPage from "../login/page";

const walletButton = (title: string, imgSrc: string) => {
  return (
    <button className="flex flex-raw my-4 items-center border-2 px-4 py-2 border-gray-300 rounded-lg w-full justify-center">
      <Image src={imgSrc} alt="wallet" className="w-10 h-10 mr-4" width="300" height="300"/>
      <p className="text-gray-900 font-bold">{title}</p>
    </button>
  );
}


export default function LoginHome() {

  return (
    <>
        <section className="flex sm:flex-row-reverse flex-col items-center w-full bg-white pb-8">
          <Image src="/image/get-started.png" alt="get started" className="w-1/2 mt-8 sm:mr-16 lg:mr-60 mx-8" width="300" height="300" />
            <div className="flex flex-col sm:w-1/2 xl:ml-60 lg:mr-32 px-8 items-center">
            <h1 className="mt-16 text-2xl font-semibold text-blue-900 mb-4">Get Started</h1>
            <p className="md:text-xl sm:text-left text-center text-gray-600 mb-8">Create a new Pawesome ID or connect a wallet</p>
          <div className="flex bg-white">
          <Web3AuthLogin />
          </div>
          <p className="md:text-xl font-semibold text-gray-500 mt-8">

          or connect with your DID:
          </p>          
         
          {walletButton("Heirloom", "/image/heirloom-logo.png")}
 
          </div>          
        </section>
        
    </>
  );
}
