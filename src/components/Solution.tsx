"use client";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

export default function Solution() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-white">
        <h1 className="text-[#00bb5f] pt-24 font-bold xl:text-7xl lg:text-3xl text-2xl text-center bg-white">
          {t({ en: "Our Solution", fr: "Notre solution" })}
        </h1>
        <div className="flex justify-center items-center mt-12 pb-12">
          <Image src="/images/solution.png"
          unoptimized alt="Pet" width="1200" height="500" />
        </div>
      </section>
    </>
  );
}
