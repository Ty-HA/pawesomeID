"use client";

import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { ethers } from "ethers";
// import ABI from "./contract-abi.json";

import contractData from "./abi-customer.json";
const ABI = contractData.abi;

interface Ethereum {
  isMetaMask: boolean;
  request: (request: { method: string; params?: string[] }) => Promise<string>;
}

declare global {
  interface Window {
    ethereum: Ethereum;
  }
}

interface Customer {
  contractAddress: string;
  age: string;
  gender: string;
  country: string;
}

export default function Profile() {
  const [userAddress, setAddress] = useState<string | null>(null);
  const [customerPoints, setCustomerPoints] = useState<number | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [age, setAge] = useState<string | null>(null);
  const [gender, setGender] = useState<string | null>(null);
  const [country, setCountry] = useState<string | null>(null);
  const [customerRegistered, setCustomerRegistered] = useState<boolean>(false);

  const getAddress = () => {
    const data = localStorage.getItem("address");

    if (data) {
      const parsedData = JSON.parse(data);
      const userAddress = parsedData.address;
      setAddress(userAddress);
    } else {
      console.log("No address found");
    }
  };

  useEffect(() => {
    const getSigner = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
    };

    getSigner();
    getAddress();
  }, []);

  const contractAddress = "0x063DF104b96DE5828b1f3430668C35A3d97Fc73F";

  

  const registerCustomer = useCallback(async () => {
    if (contractAddress && signer && age && gender && country) {
      const contract = new ethers.Contract(contractAddress, ABI, signer);
  
      // Convert the age to a uuint
      const ageAsUint = ethers.toNumber(age);
  
      // Convert the gender and country to bytes32
      const genderAsBytes32 = ethers.encodeBytes32String(gender);
      const countryAsBytes32 = ethers.encodeBytes32String(country);
  
      // Now you can call your smart contract function with these values
      await contract.registerCustomer(contractAddress, ageAsUint, genderAsBytes32, countryAsBytes32);
  
      setCustomerRegistered(true);
    }
  }, [contractAddress, signer, age, gender, country]);
  
  useEffect(() => {
    registerCustomer();
  }, [registerCustomer]);

  

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-center mt-32 w-full">
          <h1 className="mt-2 text-2xl font-semibold text-blue-900 mb-4">
            Your Profile
          </h1>

          <div className="flex flex-col gap-2 px-12">
            <p>{customerPoints}</p>

            <div>
              <div className="block mb-2">
                <Label className="font-bold" htmlFor="Age" value="Age" />
              </div>
              <TextInput
                id="Age"
                type="number"
                sizing="md"
                value={age || ""}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="block">
              <Label className="font-bold" htmlFor="gender" value="Gender" />
            </div>
            <Select
              id="gender"
              value={gender || ""}
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option>Male</option>
              <option>Female</option>
              <option>N/A</option>
            </Select>
            <div className="block">
              <Label
                className="font-bold"
                htmlFor="countries"
                value="Select your country"
              />
            </div>
            <Select
              id="countries"
              required
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option>United States</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </Select>
          </div>

          <Button className="mt-6" color="warning" onClick={registerCustomer}>
            Submit
          </Button>
        </section>
      </main>
    </>
  );
}
