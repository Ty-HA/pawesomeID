"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import fetchFileFromIPFS from "../../backend/pinFileToIPFS";

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
    const hexUrl =
      "68747470733A2F2F6372696D736F6E2D6163746976652D6375636B6F6F2D3637362E6D7970696E6174612E636C6F75642F697066732F516D594141504E38564C4365367551725A57434677517641726E316F317945485156746653654633576775733471";
    // console.log(hexUrl);
    // Convert the hexadecimal URL back to a string
    const url = Buffer.from(hexUrl, "hex").toString();

    // Fetch the data from the URL
    fetch(url)
      .then((response: Response) => response.json())
      .then((data: any) => {
        console.log(data);
        setData(data);
      })
      .catch((error: any) => console.error(error));
  }, []);

  return (
    <main className="flex flex-col min-h-screen w-full bg-white">
      <section className="flex flex-col items-center mt-6 w-full">
        <div className="flex flex-col">
          <Card
            className="max-w-sm"
            renderImage={() => (
              <Image
                width={250}
                height={250}
                src="/images/shiba.png"
                alt="image 1"
              />
            )}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.Name} PASSPORT
            </h5>
            <p className="text-black">Species: {data?.Species}</p>
            <p className="text-black">Breed: {data?.Breed}</p>
            <p className="text-black">Sex: {data?.Sex}</p>
            <p className="text-black">Coat: {data?.Coat}</p>
          </Card>
        </div>
      </section>
    </main>
  );
}
