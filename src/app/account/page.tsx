"use client";

import React from "react";

import Web3AuthLogin from "@/components/web3auth/Web3AuthLogin";



export default function Account() {

  return (
    <>
<section className="flex sm:flex-row-reverse flex-col items-center w-full h-[82vh] bg-white pb-8">
  <img src="/image/get-started.png" alt="get started" className="w-1/2 mt-8 sm:mr-16 lg:mr-60 mx-8" />
  <div className="flex flex-col sm:w-1/2 xl:ml-60 lg:mr-32 px-8 items-center">
    <h1 className="mt-16 text-2xl font-semibold text-blue-900 mb-4">Your account</h1>
    <p className="md:text-xl sm:text-left text-center text-gray-600 mb-8">Manage your informations</p>
    <div className="flex bg-white">
      <Web3AuthLogin />
    </div>     
  </div>          
</section>
        
    </>
  );
}
