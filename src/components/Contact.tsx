"use client";
import React, { useEffect } from "react";
import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Contact() {
  const { t } = useLang();
  useEffect(() => {
    // Réinitialise le formulaire au chargement de la page
    const formElement = document.getElementById("form") as HTMLFormElement;
    formElement?.reset();
  }, []);
  return (
    <section
      id="contact"
      className="h-auto flex flex-col items-center justify-center text-center md:ml-10 z-0"
    >
      <h2 className="text-[#35C4E5] text-4xl font-bold md:text-6xl mb-14 mt-14">
        {t({ en: "Contact us or", fr: "Contactez-nous ou" })} <br />
        {t({ en: "subscribe to stay tuned!", fr: "abonnez-vous pour suivre le lancement !" })}
      </h2>
      <div className="flex flex-col md:gap-24 gap-12 md:flex-row mb-24 mx-4">
        <Card className="md:h-[45vh] h-[60vh] rounded-3xl w-full md:w-1/2 animate-fade-in">
          <div className="flex flex-col justify-around w-full px-4">
            <h2 className="text-[#35C4E5] text-2xl font-bold md:text-4xl mb-4">
              {t({ en: "Contact Us", fr: "Contactez-nous" })}
            </h2>
            <form id="form" action="https://api.web3forms.com/submit" method="POST">
              <input
                type="hidden"
                name="access_key"
                value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
              />
              <div className="text-left">
                <Label htmlFor="name">{t({ en: "Name", fr: "Nom" })}</Label>
                <TextInput
                  type="text"
                  name="name"
                  required
                  placeholder={t({ en: "Your name", fr: "Votre nom" })}
                  className="mt-2"
                />
              </div>
              <div className="text-left">
                <Label htmlFor="email">E-mail</Label>
                <TextInput
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="mt-2"
                />
              </div>
              <div className="text-left">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  name="message"
                  required
                  placeholder={t({ en: "Enter your message", fr: "Votre message" })}
                  className="mt-2"
                ></Textarea>
              </div>
              <input
                className="bg-[#35C4E5] hover:bg-[#1E9FBF] active:bg-[#5AD2EE] transition-all duration-200 motion-safe:hover:scale-105 hover:shadow-lg hover:shadow-[#35C4E5]/40 active:scale-95 text-lg text-white mt-8 py-2 px-4 rounded-xl mx-auto"
                type="hidden"
                name="redirect"
                value="https://web3forms.com/success"
              />
              <Button
                size="md"
                className="bg-[#35C4E5] hover:bg-[#1E9FBF] active:bg-[#5AD2EE] transition-all duration-200 motion-safe:hover:scale-105 hover:shadow-lg hover:shadow-[#35C4E5]/40 active:scale-95 text-[#0d1230] mt-8 py-2 px-4 rounded-xl mx-auto"
                type="submit"
              >
                {t({ en: "Send Message", fr: "Envoyer" })}
              </Button>
            </form>
          </div>
        </Card>
        <Card className="md:h-[45vh] h-[60vh] rounded-3xl w-full md:w-1/2 animate-fade-in">
          <div className="flex flex-col justify-start h-full w-full px-4">
            <h2 className="text-[#35C4E5] text-2xl font-bold md:text-4xl">
              {t({
                en: "We will inform you about our launch!",
                fr: "Nous vous préviendrons du lancement !",
              })}
            </h2>
            <p className="text-base text-white sm:text-xl">
              {t({
                en: "Enter your email if you want to be informed about our launch.",
                fr: "Laissez votre e-mail pour être informé·e du lancement.",
              })}
            </p>
            <form id="form" action="https://api.web3forms.com/submit" method="POST">
              <input
                type="hidden"
                name="access_key"
                value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
              />
              <div className="text-left pb-2">
                <Label htmlFor="email">E-mail</Label>
                <TextInput
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="mt-2"
                />
                <input
                  className="bg-[#35C4E5] hover:bg-[#1E9FBF] active:bg-[#5AD2EE] transition-all duration-200 motion-safe:hover:scale-105 hover:shadow-lg hover:shadow-[#35C4E5]/40 active:scale-95 text-lg text-white mt-8 py-2 px-4 rounded-xl mx-auto"
                  type="hidden"
                  name="redirect"
                  value="https://web3forms.com/success"
                />
              </div>
              <Button
                size="md"
                className="bg-[#35C4E5] hover:bg-[#1E9FBF] active:bg-[#5AD2EE] transition-all duration-200 motion-safe:hover:scale-105 hover:shadow-lg hover:shadow-[#35C4E5]/40 active:scale-95 text-lg text-white mt-8 py-2 px-4 rounded-xl mx-auto"
                type="submit"
              >
                {t({ en: "Subscribe", fr: "S'abonner" })}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </section>
  );
}
