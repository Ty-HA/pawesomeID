"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Button, Modal } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { fetchFileFromIPFS } from "../../backend/pinFileToIPFS";

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
  PedigreeNumber: string;
}

export default function PetDetails() {
  const [data, setData] = useState<DataType | null>(null);
  const [hexUrl, setHexUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  
  
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
      "68747470733A2F2F676174657761792E70696E6174612E636C6F75642F697066732F516D5834374643455976644438666767714161664A504B79464E64713831546A3651576F415A3767325564623834";
      
    // Convert the hexadecimal URL back to a string
    const url = Buffer.from(hexUrl, "hex").toString('utf8');

    // Fetch the data from the URL
    fetch(url)
      .then((response: Response) => response.json())
      .then((data: any) => {
        console.log(data);
        setData(data);
      })
      .catch((error: any) => console.error(error));
  }, [hexUrl]);



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
                src="/images/dog.jpg"
                alt="image 1"
              />
            )}
          >
            <h5 className="text-2xl text-center font-bold tracking-tight text-gray-900 dark:text-white">
              {data?.Name}
            </h5>
            <div
              className="flex items-center justify-center mb-2 p-2 border-2 border-purple-800 rounded-full bg-white"
              onClick={toggleModal}
            >
              <QRCode value={""} size={50} />
              <Modal show={modalIsOpen} onClose={() => {}}>
                <div className="flex flex-col items-center justify-center h-full p-10">
                  <h2 className="text-indigo-900 md:text-xl text-base font-semibold mb-6">
                    Present your QR code for scanning
                  </h2>
                  <div className="border border-black p-6 rounded-xl items-center">
                    <QRCode
                      value={"did:xrpl:1:rULEePyYopvV9dDaC7uo4f61pT7K8cHNdo"}
                      size={250}
                      fgColor="#331b5c"
                    />
                  </div>
                  <p className="text-black mt-2">
                    did:xrpl:1:rULEePyYopvV9dDaC7uo4f61pT7K8cHNdo
                  </p>
                  <Button
                    className="mt-8 bg-indigo-900 text-white"
                    onClick={toggleModal}
                  >
                    Fermer
                  </Button>
                </div>
              </Modal>
            </div>
            <p className="text-black">Species: {data?.Species}</p>
            <p className="text-black">Breed: {data?.Breed}</p>
            <p className="text-black">Sex: {data?.Sex}</p>
            <p className="text-black">Coat: {data?.Coat}</p>
            <p className="text-black">Pedigree: {data?.PedigreeNumber}</p>
          </Card>
        </div>
      </section>
    </main>
  );
}
