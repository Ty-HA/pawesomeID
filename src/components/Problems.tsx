"use client";
import "@fortawesome/fontawesome-free/css/all.css";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";

const ButtonStart = () => {
  const { t } = useLang();
  return (
    <a
      href="#contact"
      className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-white sm:px-12 px-4 py-2 sm:py-1.5 md:py-3 text-lg font-semibold rounded-full whitespace-nowrap mt-8 md:mt-12"
    >
      {t({ en: "Stay tuned! →", fr: "Restez informés ! →" })}
    </a>
  );
};

const Explication = ({
  title,
  paragraph,
  srcImage,
  direction,
}: {
  title: string;
  paragraph: string;
  srcImage: string;
  direction: boolean;
}) => (
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
      <h1 className="bg-white text-red-700 font-bold xl:text-5xl lg:text-3xl text-2xl whitespace-normal mt-6">
        {title}
      </h1>
      <p className="bg-white text-gray-500 whitespace-normal mt-8 mb-8 mr-8 xl:text-2xl text-xl">
        {paragraph}
      </p>
      <ButtonStart />
    </div>
  </section>
);

export default function Problems() {
  const { t } = useLang();
  return (
    <>
      <section className="bg-white">
        <h1 className="text-red-700 pt-10 font-bold xl:text-7xl lg:text-3xl text-2xl text-center bg-white">
          {t({
            en: "Traditional ID's problems",
            fr: "Les limites de l'identification classique",
          })}
        </h1>
        <Explication
          title="Adoptions"
          paragraph={t({
            en: "The 'wrong pet': “80% of sponsored search links for pet sales may be fraudulent, advertising animals the supposed sellers don't own”. Puppy scams inside Pet Fairs, fake breed papers by fake breeders.",
            fr: "Le « mauvais animal » : « 80 % des liens sponsorisés de vente d'animaux seraient frauduleux, proposant des animaux que les vendeurs ne possèdent pas ». Arnaques aux chiots dans les salons, faux papiers de race par de faux éleveurs.",
          })}
          srcImage="/images/adoption.png"
          direction
        />
        <Explication
          title={t({ en: "Emergencies", fr: "Urgences" })}
          paragraph={t({
            en: "No access to pet ID or medical records during outdoor activities.",
            fr: "Aucun accès à l'identité ni au dossier médical de l'animal lors d'une urgence en extérieur.",
          })}
          srcImage="/images/emergencies.png"
          direction
        />
        <Explication
          title={t({ en: "Travels", fr: "Voyages" })}
          paragraph={t({
            en: "If you lost or forget your pet's ID, you can't travel with your pet.",
            fr: "Papiers perdus ou oubliés ? Impossible de voyager avec votre animal.",
          })}
          srcImage="/images/travels.png"
          direction
        />
      </section>
    </>
  );
}
