"use client";

import React, { useState, useEffect } from "react";
import {Button} from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { fetchFileFromIPFS } from "../backend/pinFileToIPFS";

// Import the Card component with ssr set to false
const Card = dynamic(() => import("flowbite-react").then((mod) => mod.Card), {
  ssr: false,
});

interface DataType {
  Name: string;
  Species: string;
  Breed: string;
  Sex: string;
  Birthdate: Date;
  Coat: string;
}

export default function PetDetails() {
  const [data, setData] = useState<DataType | null>(null);
  const [hexUrl, setHexUrl] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const hexUrl = await fetchFileFromIPFS();
      setHexUrl(hexUrl);
      console.log("Dynamic hexUrl", hexUrl);
    };
    fetchData();
  }, []);
  
  useEffect(() => {
    const hexUrl = "68747470733A2F2F676174657761792E70696E6174612E636C6F75642F697066732F516D526134486E444575737841724C7A4B43334D4A534C73694579377372744550617A4544613479505067334A4A";

    // Convert the hexadecimal URL back to a string
    const url = Buffer.from(hexUrl, "hex").toString();

    // Fetch the data from the URL
    fetch(url)
      .then((response: Response) => response.json())
      .then((data: any) => {
        // console.log(data);
        setData(data);
      })
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full bg-white">
      <section className="flex gap-6 justify-center items-center mt-6 w-full">
        <div className="flex">
          <Card
            className="max-w-sm"
            renderImage={() => (
              <Image
                width={250}
                height={250}
                src="/images/dog.jpg"
                alt="image 1"
              />
            )}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.Name} PASSPORT
            </h5>
            
            <p className="text-black">Breed: {data?.Breed}</p>
         
            <Button href="/mypets/petDetails" className="bg-yellow-400 mt-4">Pet Details</Button>

          </Card>
        </div>
        <div className="flex flex-col">
          <Card
            className="max-w-sm"
            renderImage={() => (
              <Image
                width={250}
                height={250}
                src="/images/dog.jpg"
                alt="image 1"
              />
            )}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Boune PASSPORT
            </h5>
            
            <p className="text-black">Breed: Finnish Lapphund</p>
           
            <Button href="/mypets/petDetails" className="bg-yellow-400 mt-4">Pet Details</Button>

          </Card>
        </div>
        <Button href="/mypets/addNewPet" className="bg-yellow-400 mt-4">Add a new pet</Button>
      </section>
    </main>
  );
}
