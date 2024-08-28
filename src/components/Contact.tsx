"use client";
import React, { FormEvent, useEffect } from "react";
import { Button, Card, Label, Textarea, TextInput } from "flowbite-react";

export default function Contact() {


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
      <h2 className="text-[#ECAA00] text-4xl font-bold md:text-6xl mb-14 mt-14">
        Contact us or <br /> subscribe to stay tuned!
      </h2>

      {/* Section gauche pour Nom et Message */}
      <div className="flex flex-col md:gap-24 gap-12 md:flex-row mb-24 mx-4">
        <Card className="md:h-[45vh] h-[60vh] rounded-3xl w-full md:w-1/2 animate-fade-in">
          <div className="flex flex-col justify-around w-full px-4">
            <h2 className="text-[#ECAA00] text-2xl font-bold md:text-4xl mb-4">
              Contact Us
            </h2>
            <form id="form" action="https://api.web3forms.com/submit" method="POST">
              <input
                type="hidden"
                name="access_key"
                value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
              />
              <div className="text-left">
                <Label htmlFor="name">Name</Label>
                <TextInput
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="mt-2"
                />
              </div>
              <div className="text-left">
                <Label htmlFor="email">Email</Label>
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
                  placeholder="Enter your message"
                  className="mt-2"
                ></Textarea>
              </div>
              <input
                className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-lg text-white mt-8 py-2 px-4 rounded-xl mx-auto"
                type="hidden"
                name="redirect"
                value="https://web3forms.com/success"
              />
              <Button
                size="md"
                className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-white mt-8 py-2 px-4 rounded-xl mx-auto"
                type="submit"
              >
                Send Message
              </Button>
            </form>
          </div>
        </Card>

        {/* Section droite pour Newsletter */}

        <Card className="md:h-[45vh] h-[60vh] rounded-3xl w-full md:w-1/2 animate-fade-in">
          <div className="flex flex-col justify-start h-full w-full px-4">
            <h2 className="text-[#ECAA00] text-2xl font-bold md:text-4xl">
              We will inform you about our launch!
            </h2>
            <p className="text-base text-white sm:text-xl">
              Enter your email if you want to be informed about our launch.
            </p>
            <form id="form" action="https://api.web3forms.com/submit" method="POST">
              <input
                type="hidden"
                name="access_key"
                value={process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY}
              />
              <div className="text-left pb-2">
                <Label htmlFor="email">Email</Label>
                <TextInput
                  type="email"
                  name="email"
                  required
                  placeholder="email@example.com"
                  className="mt-2"
                />
                <input
                  className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-lg text-white mt-8 py-2 px-4 rounded-xl mx-auto"
                  type="hidden"
                  name="redirect"
                  value="https://web3forms.com/success"
                />
              </div>
              <Button
                size="md"
                className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-lg text-white mt-8 py-2 px-4 rounded-xl mx-auto"
                type="submit"
              >
                Subscribe
              </Button>
            </form>
            
          </div>
        </Card>
      </div>
    </section>
  );
}
