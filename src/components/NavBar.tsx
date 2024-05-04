"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "flowbite-react";
import CrossmarkButton from "./CrossmarkButton";


export default function NavBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);


  return (
    <Navbar fluid rounded className="top-0 w-full py-5 z-10 bg-[15,16,46]">
      <Navbar.Brand href="/">
        <Image
          src="/logo_full.png"
          alt="Pawesome ID logo"
          className="xl:ml-60 lg:ml-32 sm:ml-8"
          width={240}
          height={122}
        />
      </Navbar.Brand>
      
        <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active className="text-lg flex justify-left items-center mt-2 text-white">
          Home
        </Navbar.Link>
        <Navbar.Link href="/mypets" className="text-lg flex justify-left items-center mt-2 text-white">
          My pet
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center mt-2 text-white">
          About us
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center mt-2 text-white">
          Contact
        </Navbar.Link>
        <Navbar.Link href="/" className="text-lg flex justify-left items-center xl:mr-60 lg:mr-32 sm:mr-8">
         <CrossmarkButton title="Sign In"/>
        </Navbar.Link>
                
      </Navbar.Collapse>
    </Navbar>
  );
}
