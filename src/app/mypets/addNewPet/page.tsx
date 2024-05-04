"use client";

import React, { useState } from "react";

import { Button, Label, TextInput } from "flowbite-react";

export default function AddNewPet() {
  const [petName, setPetName] = useState("");
  const [petType, setPetType] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Submitting Name ${petName}, Type ${petType}`);
  };

  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-white">
        <section className="flex flex-col items-center mt-6 w-full">
          <div className="flex flex-col">
            <h1 className="text-base md:text-2xl font-semibold text-blue-900">
              Add your new Pet
            </h1>
            <div className="flex max-w-md flex-col gap-4 mt-4">
            
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" color="info" value="Name" />
                </div>
                <TextInput
                  id="name"
                  placeholder="Name"
                  required
                  color="info"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="input-success"
                    color="success"
                    value="Success"
                  />
                </div>
                <TextInput
                  id="input-success"
                  placeholder="Input Success"
                  required
                  color="success"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="input-failure"
                    color="failure"
                    value="Failure"
                  />
                </div>
                <TextInput
                  id="input-failure"
                  placeholder="Input Failure"
                  required
                  color="failure"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label
                    htmlFor="input-warning"
                    color="warning"
                    value="Warning"
                  />
                </div>
                <TextInput
                  id="input-warning"
                  placeholder="Input Warning"
                  required
                  color="warning"
                />
              </div>
            </div>
          </div>
        </section>
        <section
          id="addPets"
          className="w-full flex flex-col justify-center items-center mt-6 border-t border-grey"
        >
          <div className="flex mt-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center md:justify-start items-center animate-slide-in"></div>
          <Button href="/mypets/addNewPet" className="bg-yellow-400">
            Validate
          </Button>
        </section>
      </main>
      <div className="flex justify-center"></div>
    </>
  );
}
