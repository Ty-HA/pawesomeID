"use client";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";


export default function Solution() {
  return (
    <>
      <section className="bg-white">
        <h1 className="text-[#00bb5f] pt-40 font-bold xl:text-7xl lg:text-3xl text-2xl text-center bg-white">
          Our Solution
        </h1>
        <div className="flex justify-center items-center mt-24 pb-12">
          <Image
            src="/images/solution.png"
            alt="Pet"
            width="1200"
            height="500"
          />
        </div>
      </section>
    </>
  );
}
