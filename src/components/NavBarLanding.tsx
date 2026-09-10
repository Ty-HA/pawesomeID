"use client";
import Image from "next/image";
import { Navbar } from "flowbite-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { LangSwitch, useLang } from "@/contexts/LanguageContext";

export default function NavBarLanding() {
  const { t } = useLang();
  return (
    <>
      <Navbar
        fluid
        rounded
        className="w-[100vw] top-0 py-6 z-50 bg-[15,16,46] border-b border-blue-900"
      >
        <Navbar.Brand href="/">
          <Image
            src="/pawesome-id-logo.png"
            alt="Pawesome ID logo"
            className="ml-4 sm:h-20 h-12 w-auto rounded-xl"
            width="512"
            height="341"
          />
        </Navbar.Brand>
        <div className="flex items-center gap-4 md:order-2 mr-4">
          <LangSwitch />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            href="#contact"
            className="text-4xl flex justify-left items-center text-[#35C4E5] mr-16"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-4" />
            {t({ en: "Stay tuned!", fr: "Restez informés !" })}
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
