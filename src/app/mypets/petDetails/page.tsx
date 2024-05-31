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
  Origin: string;
  Birthdate: Date;
  Coat: string;
  PedigreeNumber: string;
  IssueDate: Date;
}

export default function PetDetails() {
  const [data, setData] = useState<DataType | null>(null);
  const [hexUrl, setHexUrl] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

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
      "68747470733A2F2F676174657761792E70696E6174612E636C6F75642F697066732F516d5834374643455976644438666767714161664A504B79464E64713831546A3651576F415A3767325564623834";

    // Convert the hexadecimal URL back to a string
    const url = Buffer.from(hexUrl, "hex").toString("utf8");

    // Fetch the data from the URL
    fetch(url)
      .then((response: Response) => response.json())
      .then((data: any) => {
        console.log(data);
        setData(data);
      })
      .catch((error: any) => console.error(error));
  }, [hexUrl]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="bg-[15,16,46] flex flex-col items-center mt-4 min-h-screen w-full pt-16 border-t border-blue-900">
      <div className="flex flex-col items-center">
        <div className="recto card flex flex-col items-center bg-white border-4 border-blue-100 rounded-3xl shadow-md p-4 w-full max-w-3xl relative">
          <div className="absolute hidden md:block top-6 right-6 p-2 m-2 border-2 border-blue-300 rounded-lg bg-white cursor-pointer" onClick={toggleModal}>
            <QRCode value="" size={100} fgColor="#0000FF" />
          </div>
          <div className="border-2 border-blue-100 rounded-3xl p-4 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">Pet Identity Passport</h1>
            <div className="flex flex-col sm:flex-row">
              <div className="md:flex-initial md:justify-start mx-auto">
                <Image
                  width={150}
                  height={300}
                  src="/images/dog.jpg"
                  alt="image 1"
                  className="border border-gray-300 rounded-lg"
                />
              </div>
              <div className="ml-0 sm:ml-6 flex-grow mt-4 sm:mt-0">
                <h5 className="text-lg font-bold tracking-tight text-gray-900">
                  <span className="text-xs text-gray-900">Name: </span>
                  <p className="-mt-1">{data?.Name?.toUpperCase()}</p>
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                    <span className="text-xs text-gray-900">Species: </span>
                    <p className="-mt-1">{data?.Species}</p>
                  </h5>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                    <span className="text-xs text-gray-900">Breed: </span>
                    <p className="-mt-1">{data?.Breed}</p>
                  </h5>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  <div className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Sex: </span>
                    <p className="text-gray-700 -mt-1">{data?.Sex}</p>
                  </div>
                  <div className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Origin: </span>
                    <p className="text-gray-700 -mt-1">{data?.Origin} France</p>
                  </div>
                  <div className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Birthdate: </span>
                    <p className="text-gray-700 -mt-1">{data?.Birthdate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-1">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Pedigree number: </span>
                    <p className="text-gray-700 -mt-1">{data?.PedigreeNumber}</p>
                  </h5>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Coat: </span>
                    <p className="text-gray-700 -mt-1">{data?.Coat}</p>
                  </h5>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Issue Date: </span>
                    <p className="text-gray-700 -mt-1">{new Date().toLocaleDateString()}</p>
                  </h5>
                </div>
                <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900 mt-2">
                  <span className="text-xs text-gray-700">Microchip number: </span>
                  <p className="text-gray-700 md:-mt-1">2500269604711389 FRA</p>
                </h5>
                <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900">
                  <span className="text-xs text-gray-700">Document number: </span>
                  <p className="text-gray-700 md:-mt-1">did:xrpl:1:rBvPGAgiBQWeFz8MwXmXi3TLqptUf9ViFe</p>
                </h5>
              </div>
            </div>
          </div>
          <Modal show={modalIsOpen} onClose={toggleModal}>
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-10">
              <h2 className="text-indigo-900 md:text-xl text-base font-semibold mb-6">
                Présentez votre code QR pour le scan
              </h2>
              <div className="border border-black p-4 sm:p-6 rounded-xl items-center">
                <QRCode
                  value="did:xrpl:1:rULEePyYopvV9dDaC7uo4f61pT7K8cHNdo"
                  size={200}
                  fgColor="#331b5c"
                />
              </div>
              <p className="text-black mt-2 text-center sm:text-left">
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

        <div className="verso card flex flex-col items-center bg-white border-4 border-blue-100 rounded-3xl shadow-md p-4 w-full max-w-3xl relative mt-8">
          <div className="absolute hidden md:block top-6 right-6 p-2 m-2 border-2 border-blue-300 rounded-lg bg-white cursor-pointer" onClick={toggleModal}>
            <QRCode value="" size={100} fgColor="#0000FF" />
          </div>
          <div className="border-2 border-blue-100 rounded-3xl p-4 w-full">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">Pet Identity Passport verso</h1>
            <div className="flex flex-col sm:flex-row">
              <div className="md:flex-initial md:justify-start mx-auto"></div>
              <div className="ml-0 sm:ml-6 flex-grow mt-4 sm:mt-0">
                <h5 className="text-lg font-bold tracking-tight text-gray-900">
                  <span className="text-xs text-gray-900">Id: </span>
                  <p className="-mt-1">did:xrpl:1:rBvPGAgiBQWeFz8MwXmXi3TLqptUf9ViFe</p>
                </h5>
                <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900">
                  <span className="text-xs text-gray-700">Controller: </span>
                  <p className="text-gray-700 md:-mt-1">did:xrpl:1:rBvPGAgiBQWeFz8MwXmXi3TLqptUf9ViFe</p>
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                    <span className="text-xs text-gray-900">Address: </span>
                    <p className="-mt-1">10 rue du Dr R, 75000 Paris</p>
                  </h5>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                    <span className="text-xs text-gray-900">Issuer: </span>
                    <p className="-mt-1">Vet DID or Clinic</p>
                  </h5>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-2">
                  <div className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Sex: </span>
                    <p className="text-gray-700 -mt-1">{data?.Sex}</p>
                  </div>
                  <div className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Origin: </span>
                    <p className="text-gray-700 -mt-1">{data?.Origin} France</p>
                  </div>
                  <div className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Birthdate: </span>
                    <p className="text-gray-700 -mt-1">{data?.Birthdate}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-1">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Pedigree number: </span>
                    <p className="text-gray-700 -mt-1">{data?.PedigreeNumber}</p>
                  </h5>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Coat: </span>
                    <p className="text-gray-700 -mt-1">{data?.Coat}</p>
                  </h5>
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">Issue Date: </span>
                    <p className="text-gray-700 -mt-1">{new Date().toLocaleDateString()}</p>
                  </h5>
                </div>
                <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900 mt-2">
                  <span className="text-xs text-gray-700">PublicKey: </span>
                  <p className="text-gray-700 md:-mt-1 text-base">EDCF22D7540A07F07D7D006AC738A7544CABF669B24099E5B31E9BE6FBC631016B</p>
                </h5>
                
              </div>
            </div>
          </div>
          <Modal show={modalIsOpen} onClose={toggleModal}>
            <div className="flex flex-col items-center justify-center h-full p-4 sm:p-10">
              <h2 className="text-indigo-900 md:text-xl text-base font-semibold mb-6">
                Présentez votre code QR pour le scan
              </h2>
              <div className="border border-black p-4 sm:p-6 rounded-xl items-center">
                <QRCode
                  value="did:xrpl:1:rULEePyYopvV9dDaC7uo4f61pT7K8cHNdo"
                  size={200}
                  fgColor="#331b5c"
                />
              </div>
              <p className="text-black mt-2 text-center sm:text-left">
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
      </div>
      <h1 className="text-xs md:text-base md:mt-4 md:mb-0 mb-4 mt-8">Share your pet ID data proof by showing the QRCode</h1>
    </section>
  );
}
