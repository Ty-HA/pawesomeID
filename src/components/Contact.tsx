"use client";
import React from "react";
import { Button, Label, Textarea, TextInput } from "flowbite-react";
import { HiMail } from "react-icons/hi";

export default function Contact() {

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: "YOUR_ACCESS_KEY_HERE",
            name: e.target.name.value,
            email: e.target.email.value,
            message: e.target.message.value,
        }),
    });
    const result = await response.json();
    if (result.success) {
        console.log(result);
    }
}

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
          Enter your email if you want to be informed about our launch.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
              <Label htmlFor="name">Name</Label>
              <TextInput type="text" name="name" required placeholder="Your name" />
          </div>
          <div>
              <Label htmlFor="email">Email</Label>
              <TextInput type="email" name="email" required placeholder="email@example.com" />
          </div>
          <div>
              <Label htmlFor="message">Message</Label>
              <Textarea name="message" required rows="3" placeholder="Enter Message"></Textarea>
          </div>
          <Button className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-white sm:px-12 px-4 mt-8 py-2 sm:py-1.5 md:py-3 text-lg font-semibold rounded-full whitespace-nowrap" type="submit">Submit Form</Button>
      </form>
      </div>
    </section>
  );
}
