"use client";

import { useState } from "react";
import Image from "next/image";
import { Navbar } from "flowbite-react";
import Web3AuthLogin from "./Web3AuthLogin";
import {
  FaHome,
  FaGift,
  FaPaintBrush,
  FaTasks,
  FaUser,

} from "react-icons/fa";


export default function NavBar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const toggleModal = () => setModalIsOpen(!modalIsOpen);


  return (
    <Navbar fluid rounded className="fixed top-0 w-full bg-white py-5 border-b border-grey z-10">
      <Navbar.Brand href="/">
        <Image
          src="/tp.jpg"
          alt="Trust Point"
          className="ml-2"
          width={120}
          height={61}
        />
      </Navbar.Brand>
      <div className="flex mr-4 md:order-2 gap-4">
        <Web3AuthLogin />
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/home" active className="text-lg flex justify-left items-center">
          <FaHome className="mr-2 ml-2 md:ml-0" /> Home
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center">
          <FaGift className="mr-2 ml-2 md:ml-0" /> Rewards
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center">
          <FaPaintBrush className="mr-2 ml-2 md:ml-0" /> NFT
        </Navbar.Link>
        <Navbar.Link href="#" className="text-lg flex justify-left items-center">
          <FaTasks className="mr-2 ml-2 md:ml-0" /> Challenges
        </Navbar.Link>
        <Navbar.Link href="/profile" className="text-lg flex justify-left items-center">
          <FaUser className="mr-2 ml-2 md:ml-0" /> Profile
        </Navbar.Link>
                
      </Navbar.Collapse>
    </Navbar>
  );
}
