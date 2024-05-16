"use client";
const chalk = require("chalk");

import React, { useEffect, useState } from "react";

import { Button, Label, TextInput, FileInput } from "flowbite-react";

const DropdownComponent = (
  name: string,
  onClick: (name: string) => void,
  key: string | number
) => {
  return (
    <li key={key}>
      <button
        onClick={() => onClick(name)}
        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left"
      >
        {name}
      </button>
    </li>
  );
};

export default function AddNewPet() {
  const [petAvatar, setPetAvatar] = useState("");
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("");
  const [petSex, setPetSex] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [petBirthDay, setPetBirthDay] = useState("");
  const [petCoat, setPetCoat] = useState("");
  const [petPedigreeNumber, setPetPedigreeNumber] = useState("");
  const [dropDownClicked, setDropDownClicked] = useState(false);

  const petSpeciesOptions = ["Dog", "Cat", "Rabbit", "Horse"];

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPetBirthDay(event.target.value);
  };

  const [menuRef, setMenuRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const closer = (event: MouseEvent) => {
      // Ignore click if the menu is not opened, or the ref not properly defined.
      if (!dropDownClicked || !menuRef) return;
      // Don't close when clicking inside the menu.
      if (menuRef.contains(event.target as Node)) return;
      setDropDownClicked(false);
    };

    document.addEventListener("click", closer);
    return () => document.removeEventListener("click", closer);
  }, [menuRef, dropDownClicked]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (
      !petName ||
      !petSpecies ||
      !petBreed ||
      !petBirthDay ||
      !petCoat ||
      !petSex ||
      !petPedigreeNumber
    ) {
      return;
    }
    
    const petData = {
      //This is where we put the animal's characteristics
      // Avatar: petAvatar,
      Name: petName,
      Species: petSpecies,
      Breed: petBreed,
      Sex: petSex,
      Birthdate: petBirthDay,
      Coat: petCoat,
      PedigreeNumber: petPedigreeNumber,
    };

    console.log(chalk.green("Sending PetData: ", JSON.stringify(petData)));
    

    try {
      // Make a POST request to the /pinFileToIPFS endpoint
      const response = await fetch("http://localhost:8080/pinFileToIPFS", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(petData),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();
      console.log(chalk.blue("Data from front: ", JSON.stringify(data)));
     
      // Make a POST request to the /writeDIDToXRPL endpoint

      const response2 = await fetch("http://localhost:8080/writeDIDToXRPL", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response2.ok) {
        throw new Error(response2.statusText);
      }

      console.log(chalk.green("DID written to XRPL"));
    } catch (error) {
      console.error("Failed to submit:", error);
    }
  };

  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-white">
        <section className="flex flex-col items-center mt-6 w-full">
          <div className="flex sm:max-w-md sm:mx-0 mx-4 flex-col gap-4 mt-4">
            <h1 className="text-base md:text-2xl font-semibold text-blue-900">
              Add your new Pet
            </h1>
            <div>
              {/*<div id="fileUpload" className="max-w-md">
                <div className="mb-2 block">
                  <Label htmlFor="file" value="Upload your pet avatar" />
                </div>
                <FileInput
                  id="file"
                  helperText="Your pet picture Profile"
                  onChange={(event) => {
                    if (event.target.files && event.target.files[0]) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPetAvatar(reader.result as string);
                      };
                      reader.readAsDataURL(event.target.files[0]);
                    }
                  }}
                />
                </div>*/}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="name" />
              </div>
              <TextInput
                id="name"
                placeholder="Name"
                required
                color="gray"
                autoComplete="name"
                onChange={(event) => setPetName(event.target.value)}
              />
            </div>
            <div>
              <div className="w-full">
                <Label htmlFor="species" value="Species" />
              </div>
            </div>
            <button
              id="species"
              onClick={() => {
                setDropDownClicked(!dropDownClicked);
                console.log("yolo");
              }}
              data-dropdown-toggle="dropdown"
              className={`flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center ${
                petSpecies ? "text-gray-900" : "text-gray-500"
              } bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600`}
              type="button"
            >
              {petSpecies ? petSpecies : "Select species"}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path stroke="currentColor" d="m1 1 4 4 4-4" />
              </svg>
            </button>
            <div
              id="dropdown"
              ref={setMenuRef}
              style={{ top: "350px" }}
              className={`z-10 ${
                dropDownClicked ? "" : "hidden"
              } absolute z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 border-2`}
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdown-button"
              >
                {petSpeciesOptions.map((species, index) =>
                  DropdownComponent(
                    species,
                    (name: string) => {
                      setPetSpecies(name);
                      setDropDownClicked(false);
                    },
                    index
                  )
                )}
              </ul>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="breed" value="Breed" />
              </div>
              <TextInput
                id="breed"
                placeholder="Breed"
                required
                color="gray"
                onChange={(event) => setPetBreed(event.target.value)}
              />
            </div>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="sex-female" value="Sexe" />
              </div>
              <div className="flex items-center mt-2 mb-2 ml-2">
                <input
                  id="sex-female"
                  type="checkbox"
                  checked={petSex == "female"}
                  onChange={() => setPetSex("female")}
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="sex-female"
                  itemType="default-checkbox"
                  className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  female
                </label>
              </div>
              <div className="flex items-center ml-2">
                <input
                  id="sex-male"
                  type="checkbox"
                  checked={petSex == "male"}
                  onChange={() => setPetSex("male")}
                  value=""
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label
                  htmlFor="sex-male"
                  itemType="checked-checkbox"
                  className="ms-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  male
                </label>
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="birthday" value="Birthday" />
              </div>
              <div className="relative max-w-sm">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </div>
                <input
                  id="birthday"
                  type="date"
                  onChange={handleDateChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Select date"
                />
              </div>
            </div>
            <div>
              <div className="mb-2 mt-4 block">
                <Label htmlFor="coat" value="Coat" />
              </div>
              <TextInput
                id="coat"
                placeholder="Coat"
                required
                color="gray"
                onChange={(event) => setPetCoat(event.target.value)}
              />
            </div>
            <div>
              <div className="mb-2 mt-4 block">
                <Label htmlFor="pedigreeNumber" value="Pedigree Number" />
              </div>
              <TextInput
                id="pedigreeNumber"
                placeholder="pedigree Number (LOF)"
                required
                color="gray"
                onChange={(event) => setPetPedigreeNumber(event.target.value)}
              />
            </div>
          </div>
        </section>
        <section
          id="addPets"
          className="w-full flex flex-col justify-center items-center mt-6 border-t border-grey"
        >
          <Button onClick={handleSubmit} className="bg-yellow-400 my-4">
            Validate
          </Button>
        </section>
      </main>
      <div className="flex justify-center"></div>
    </>
  );
}
