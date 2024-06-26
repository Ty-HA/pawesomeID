"use client"
import '@fortawesome/fontawesome-free/css/all.css';
import Image from 'next/image';

const ButtonStart = () => {
    return (
      <a
        href="#contact"
        className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-white sm:px-12 px-4 py-2 sm:py-1.5 md:py-3 text-lg font-semibold rounded-full whitespace-nowrap mt-8 md:mt-12"
      >
        Stay tuned! →
      </a>
    );
  };

const explication = (
    title: string,
    paragraph: string,
    srcImage: string,
    direction: boolean
  ) => {
    return (
      <section
        className={`flex ${
          direction ? "sm:flex-row" : "sm:flex-row-reverse"
        } flex-col justify-center mt-24 sm:px-32 px-4 w-full bg-white`}
      >
        <div
          className={`sm:w-1/2 px-4 ${
            direction ? "xl:pl-60 lg:pl-32 sm:pl-8" : "xl:pr-60 lg:pr-32 sm:pr-8"
          }`}
        >
          <Image src={srcImage} alt="Pet" width="600" height="500" />
        </div>
        <div
          className={`sm:w-1/2 px-4 ${
            direction ? "xl:pr-60 lg:pr-32 sm:pr-8" : "xl:pl-60 lg:pl-32 sm:pl-8"
          }`}
        >
          <h1
            className="bg-white text-lime-600 font-bold xl:text-5xl lg:text-3xl text-2xl whitespace-normal
          "
          >
            {title}
          </h1>
          <p className="bg-white text-gray-500 whitespace-normal mt-8 mb-8 mr-8 xl:text-2xl text-xl">
            {paragraph}
          </p>
          <ButtonStart />
        </div>
      </section>
    );
  };

export default function Solution() {
  return (
    <>
    <section className="bg-white">

        <h1 className="text-[#00bb5f] pt-24 font-bold xl:text-7xl lg:text-3xl text-2xl text-center bg-white">
      Our Solution
        </h1>
        <div className="flex justify-center items-center mt-12 pb-12">
  <Image src="/images/solution.png" alt="Pet" width="1200" height="500" />
</div>
        
        </section>
</>



    
  );
}