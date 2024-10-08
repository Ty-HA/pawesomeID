"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
// import CrossmarkButton from "./CrossmarkButton";
import Web3AuthLogin from "./web3auth/Web3AuthLogin";

export default function NavBar() {
  return (
    <>
      <Navbar fluid rounded className="w-[100vw] top-0 py-4 z-50 bg-[15,16,46] border-b border-blue-900">
        <Navbar.Brand href="/">
          <Image
            src="/logo_full.png"
            alt="Pawesome ID logo"
            className="xl:ml-60 lg:ml-32 sm:ml-0 ml-4 sm:w-60 w-32 sm:h-10"
            width="200"
            height="50"
          />
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link
            href="/"
            
            className="text-lg flex justify-left items-center text-white"
          >
            Home
          </Navbar.Link>
          <Navbar.Link
            href="/dashboard"
            className="text-lg flex justify-left items-center text-white"
          >
            Dashboard
          </Navbar.Link>
          <Navbar.Link
            href="#"
            className="text-lg flex justify-left items-center text-white"
          >
            About us
          </Navbar.Link>
          <Navbar.Link
            href="#contact"
            className="text-lg flex justify-left items-center text-white"
          >
            Contact
          </Navbar.Link>
          <Navbar.Link
            href="/account"
            className="text-lg flex justify-left items-center text-white"
          >
            <FontAwesomeIcon icon={faCog} className="mr-4 my-1" />
         
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
