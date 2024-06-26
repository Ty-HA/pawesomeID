"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import CrossmarkButton from "./CrossmarkButton";
import Web3AuthLogin from "./web3auth/Web3AuthLogin";

export default function NavBarLanding() {
  return (
    <>
      <Navbar fluid rounded className="w-[100vw] top-0 py-6 z-50 bg-[15,16,46] border-b border-blue-900">
        <Navbar.Brand href="/">
          <Image
            src="/logo_full.png"
            alt="Pawesome ID logo"
            className="ml-4 sm:w-60 w-32 sm:h-10"
            width="200"
            height="50"
          />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
        <Navbar.Link
            href="#contact"
            className="text-4xl flex justify-left items-center text-[#ECAA00] mr-16"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-4" />Stay tuned!  {/* Add the mail icon next to the text */}
          </Navbar.Link>
          
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
