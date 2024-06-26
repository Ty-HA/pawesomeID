"use client";
import React from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

export default function Contact() {
  return (
    <section
      id="contact"
      className="w-screen h-screen flex flex-col items-center justify-center text-center md:ml-10 z-0"
    >
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md mb-8 mt-24 lg:mt-10 se:mt-24 se:mb-24">
        <div className="mb-8">
          <h2 className="text-[#ECAA00] text-green text-2xl font-bold md:text-4xl animate-fade-in">
          Stay tuned!
          </h2>
          <p className="mt-4 lg:mb-8 text-center text-base text-white dark:text-white sm:text-xl">
            Do not hesitate to contact us for any question
          </p>
        </div>
        <form className="space-y-6">
          <div>
            <Label
              htmlFor="email4"
              className="block mb-2 text-md text-green dark:text-green text-left"
            >
              Your email
            </Label>
            <TextInput
              id="email4"
              type="email"
              icon={HiMail}
              placeholder="Email"
              required
            />
          </div>
          <div>
            <Label
              htmlFor="subject"
              className="block mb-2 text-md text-green dark:text-green text-left"
            >
              Subject
            </Label>
            <TextInput
              id="subject"
              placeholder="Subject"
              required
              color="gray"
            />
          </div>
          <div className="sm:col-span-2">
            <Label
              htmlFor="message"
              className="block mb-2 text-md text-green dark:text-green text-left"
            >
              Your message
            </Label>
            <Textarea
              id="message"
              placeholder="Your message..."
              required
              rows={8}
            />
          </div>
          <Button className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-white sm:px-12 px-4 mt-8 py-2 sm:py-1.5 md:py-3 text-lg font-semibold rounded-full whitespace-nowrap" type="submit">
            Send message
          </Button>
        </form>
      </div>
    </section>
  );
}
