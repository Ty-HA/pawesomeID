"use client";

import { useState } from "react";
import Image from "next/image";
import { Button, Navbar } from "flowbite-react";
import Web3AuthLogin from "./Web3AuthLogin";


export default function NavBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);


  return (
    <Navbar fluid rounded className="top-0 w-full py-5 z-10 bg-[15,16,46]">
      <Navbar.Brand href="/">
        <Image
          src="/logo_full.png"
          alt="Trust Point"
          className="xl:ml-60 lg:ml-32 sm:ml-8"
          width={240}
          height={122}
        />
      </Navbar.Brand>
      
        <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/home" active className="text-lg flex justify-left items-center mt-2 text-white">
          Demos
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center mt-2 text-white">
          Pages
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center mt-2 text-white">
          Support
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center mt-2 text-white">
          Contact
        </Navbar.Link>
        <Navbar.Link href="/profile" className="text-lg flex justify-left items-center xl:mr-60 lg:mr-32 sm:mr-8">
          <Button className="bg-blue-600 text-white">
          Start a free trial
          </Button>
        </Navbar.Link>
                
      </Navbar.Collapse>
    </Navbar>
  );
}
