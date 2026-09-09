"use client";
import Image from "next/image";

/**
 * Step-by-step "How it works" + schéma Issuer → Holder → Verifiers
 * (public/images/solution.png, jusqu'ici jamais affiché sur la landing).
 */
const STEPS = [
  {
    n: "1",
    icon: "fa-solid fa-wallet",
    title: "Create your account",
    text: "Sign in with Google or your crypto wallet — a secure XRPL wallet is created for you behind the scenes. No blockchain knowledge needed.",
  },
  {
    n: "2",
    icon: "fa-solid fa-user-doctor",
    title: "Your vet issues the Pet DID",
    text: "A trusted professional verifies your pet (microchip, breed, birthdate) and signs its unique Decentralized Identifier on the XRP Ledger.",
  },
  {
    n: "3",
    icon: "fa-solid fa-passport",
    title: "The passport lives in your pocket",
    text: "Your pet's tamper-proof identity card — photo, microchip, pedigree, medical credentials — always with you, shareable as a QR code.",
  },
  {
    n: "4",
    icon: "fa-solid fa-shield-halved",
    title: "Anyone can verify, instantly",
    text: "Customs, shelters, breeders or a new vet scan the QR code and check the signature on-chain. No central database, no fraud.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-20">
      <h2 className="text-[#ECAA00] font-semibold text-center xl:text-5xl lg:text-4xl text-3xl px-4">
        How does it work?
      </h2>
      <p className="text-gray-300 text-center mt-4 xl:text-2xl text-lg px-6">
        From your sofa to the border checkpoint — four steps, zero paperwork.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mt-12 xl:px-40 lg:px-20 px-6">
        {STEPS.map((s) => (
          <div
            key={s.n}
            className="relative bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-[#ECAA00]/60 transition-colors"
          >
            <div className="flex items-center gap-4">
              <span className="bg-[#ECAA00] text-white font-bold rounded-full w-10 h-10 flex items-center justify-center text-lg shrink-0">
                {s.n}
              </span>
              <i className={`${s.icon} text-[#ECAA00] text-2xl`} aria-hidden />
            </div>
            <h3 className="text-white font-semibold text-xl mt-4">{s.title}</h3>
            <p className="text-gray-400 mt-2 leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      {/* Schéma de confiance Issuer → Holder → Verifiers */}
      <div className="bg-white mt-16 py-12 px-4 flex flex-col items-center">
        <h3 className="text-[#00bb5f] font-bold xl:text-4xl lg:text-3xl text-2xl text-center">
          One passport, a whole circle of trust
        </h3>
        <Image
          src="/images/solution.png"
          alt="Schema: the vet clinic issues the Pet DID, the owner holds the passport, verifiers check it on the XRP Ledger"
          width={1100}
          height={620}
          className="mt-8 w-full max-w-5xl h-auto"
        />
      </div>
    </section>
  );
}
