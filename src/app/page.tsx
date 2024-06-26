"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Contact from "../components/Contact";
import Problems from "@/components/Problems";
import Solution from "@/components/Solution";

function ButtonStart() {
  return (
    <a
      href="#contact"
      className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-white sm:px-12 px-4 py-2 sm:py-1.5 md:py-3 text-lg font-semibold rounded-full whitespace-nowrap mt-8 md:mt-12"
    >
      Stay tuned! →
    </a>
  );
}

const FirstSection = () => {
  return (
    <section className="flex sm:flex-row flex-col-reverse justify-center items-center mt-16 pb-20 w-full md:h-[75vh] h-auto">
      <div className="sm:w-1/2 xl:pl-60 lg:pl-32 animate-slide-in-up items-center px-4">
        <h1 className="text-[#ECAA00] mt-16 md:mt-4 md:text-7xl font-semibold whitespace-normal text-4xl sm:pb-6">
          Your Pawesome passport
        </h1>
        <p className="text-gray-300 whitespace-normal my-5 md:text-3xl w-full text-2xl">
          Our solution to elevate the recognition of animal welfare in society!
        </p>
        <p className="text-gray-300 whitespace-normal my-5 md:text-3xl w-full text-2xl pb-8">
          The first self-sovereign identity for pets, powered by Decentralized
          Identifiers (DiD).
        </p>

        <ButtonStart />
      </div>
      <div className="flex sm:w-1/2 xl:pl-60 lg:pr-32 pt-2 px-8 animate-slide-in-right justify-center items-center sm:block">
        <Image src="/mobile0.png" alt="Pet" width="600" height="600" />
      </div>
    </section>
  );
};

const information = (title: string, paragraph: string) => {
  return (
    <div className="px-2 min-h-7">
      <div className="flex items-center flex-row">
        <h1
          className="text-black xl:text-4xl lg:text-2xl text-m font-semibold whitespace-normal
      "
        >
          {title}
        </h1>
      </div>
      <p className="text-gray-500 whitespace-normal mt-4 xl:text-2xl text-m">
        {paragraph}
      </p>
    </div>
  );
};

const App = () => {
  return (
    <>
      {FirstSection()}
      <Problems />
      <Solution />
      <section className="my-10">
        <div className="md:mx-16 mx-6">
          <h1
            className="text-[#ECAA00] xl:text-3xl lg:text-2xl text-xl font-semibold whitespace-normal my-4 
      "
          >
            What is DiD?
          </h1>
          <p className="text-white xl:text-xl lg:text-2xl text-m whitespace-normal my-4">
            DiD is like a digital ID card that isn&apos;t controlled by any single
            company or government. It lets you prove who you are online without
            needing a central authority to verify it.
          </p>
          <h1
            className="text-[#ECAA00] xl:text-3xl lg:text-2xl text-xl font-semibold whitespace-normal my-4 pt-10
      "
          >
            What is Self Sovereign Identity?
          </h1>
          <p className="text-white xl:text-xl lg:text-2xl text-m whitespace-normal my-4">
            SSI is a way to manage your digital identity where you, and only
            you, have full control over your personal information. It allows you
            to share only the necessary details with others, enhancing privacy
            and security.
          </p>
        </div>
      </section>

      <div className="bg-white pb-8">
        <div className="bg-white pb-8">
          <section className="grid grid-cols-1 lg:grid-cols-4 pt-12 sm:px-32 px-4 w-full bg-white gap-4">
            {information("Trust", "Only professionals create the Pet DID")}
            {information(
              "XRPL",
              `Scalable, stable, low fees, fast, sustainable`
            )}
            {information(
              "DiD",
              "Self-sovereign, secure, private, verifiable"
            )}
            {information(
              "Solidarity",
              "The more pets are registered, the less they will be abandoned."
            )}
          </section>
        </div>
      </div>
      <div className="flex flex-col items-center bg-teal-300 pb-12">
        <div className="flex flex-col items-center w-full ">
          <p className="font-bold text-2xl md:text-4xl text-left mt-12 md:w-1/2 text-teal-950 mx-4">
            “When the world begins to accept that animals should have digital
            identities like humans, animal’s social status will increase, which
            will improve the well-being of humans, animals and our environment.”
          </p>
          <p className="text-xl text-left mt-4 md:w-1/2 text-teal-950">
            Alex Preukschat & Drummond Reed
          </p>
          <p className="text-sm text-left md:w-1/2 text-teal-950 mx-4">
            Self-Sovereign Identity: Decentralized digital identity and
            verifiable credentials
          </p>
        </div>
      </div>
      <Contact />
    </>
  );
};

export default App;
