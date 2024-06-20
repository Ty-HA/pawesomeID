"use client";

import { useState, useEffect } from "react";
import QRCode from "qrcode.react";
import { Button, Modal } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { fetchFileFromIPFS } from "../../backend/pinFileToIPFS";

import "./flipcard.css";

// Import the Card component with ssr set to false
const Card = dynamic(() => import("flowbite-react").then((mod) => mod.Card), {
  ssr: false,
});

interface DataType {
  Owner: string;
  Name: string;
  Species: string;
  Breed: string;
  Sex: string;
  Origin: string;
  Birthdate: Date;
  Coat: string;
  EyesColor: string;
  Microchip: string;
  PedigreeNumber: string;
  IdIssueDate: Date;
  id: string;
  controller: string;
}

export default function PetDetails() {
  const [data, setData] = useState<DataType | null>(null);
  const [hexUrl, setHexUrl] = useState("");
  const [didData, setDidData] = useState<DataType | undefined>(undefined);
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
      "68747470733A2F2F676174657761792E70696E6174612E636C6F75642F697066732F516D526134486E444575737841724C7A4B43334D4A534C73694579377372744550617A4544613479505067334A4A";
    const didDocument =
      "68747470733A2F2F676174657761792E70696E6174612E636C6F75642F697066732F516D5941766D6464456F4D3771357762427263513236747134734537717168704E463836715431544B6573704171";

    // Convert the hexadecimal URL back to a string
    const url = Buffer.from(hexUrl, "hex").toString("utf8");
    const didUrl = Buffer.from(didDocument, "hex").toString("utf8");

    // Fetch the data from the URL
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
      })
      .catch((error) => console.error(error));

    // Fetch the DID document
    fetch(didUrl)
      .then((response) => response.json())
      .then((didData) => {
        console.log(didData);
        setDidData(didData); // Assuming you have a state setter named setDidData
      })
      .catch((error) => console.error(error));
  }, []); // Removed dependency array to avoid re-fetching due to hexUrl not being a state or prop

  const QRCode = dynamic(() => import("qrcode.react"), { ssr: false });
  const qrData = {
    owner: data?.Owner,
    name: data?.Name,
    species: data?.Species,
    breed: data?.Breed,
    sex: data?.Sex,
    Origin: data?.Origin,
    Birthdate: data?.Birthdate, 
    Coat: data?.Coat,
    EyesColor: data?.EyesColor,
    Microchip: data?.Microchip,
    PedigreeNumber: data?.PedigreeNumber,
    IdIssueDate: data?.IdIssueDate,
    id: didData?.id,
    controller: didData?.controller,
  };

  return (
    <section className="bg-[15,16,46] flex flex-col items-center mt-4 min-h-screen w-full pt-16">
      <div className="flex flex-col items-center">
        <div className="flip-card bg-white rounded-3xl shadow-md w-full max-w-3xl relative z-10">
          <div className="flip-card-inner rounded-3xl z-10">
            <div className="flip-card-front p-4 text-left z-10">
              <div className="flex justify-between -mb-4 mt-1">
                <h1 className="text-2xl sm:text-4xl font-bold text-blue-900 text-left">
                  Pet Identity Passport
                </h1>
                <Image
                  src="/images/shiny-logo.png"
                  alt="Shiny-logo"
                  width={70}
                  height={70}
                />
              </div>

              <div className="flex flex-col sm:flex-row">
                <div className="md:flex-initial md:justify-start mx-auto">
                  <Image
                    width={150}
                    height={300}
                    src="/images/dog.jpg"
                    alt="image 1"
                    className="border border-gray-300 rounded-lg"
                  />
                  <div
                    className="hidden mt-2 items-center md:block p-2 border-2 border-blue-300 rounded-lg bg-white cursor-pointer"
                    onClick={toggleModal}
                  >
                    <QRCode
                      value={JSON.stringify(qrData)}
                      size={130}
                      fgColor="#0000FF"
                    />
                  </div>
                </div>
                <div className="ml-0 sm:ml-6 flex-grow mt-4 sm:mt-0">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-900">Name: </span>
                    <p className="-mt-1 text-black text-xl">
                      {data?.Name?.toUpperCase()}
                    </p>
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                      <span className="text-xs text-gray-900">Species: </span>
                      <p className="-mt-2 text-black">{data?.Species}</p>
                    </h5>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                      <span className="text-xs text-gray-900">Breed: </span>
                      <p className="-mt-2 text-black">{data?.Breed}</p>
                    </h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 mt-2">
                    <div className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-gray-700">Sex: </span>
                      <p className="text-black -mt-2">{data?.Sex}</p>
                    </div>
                    <div className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-gray-700">Origin: </span>
                      <p className="text-black -mt-2">{data?.Origin}</p>
                    </div>
                    <div className="text-lg font-bold tracking-tight text-gray-900 z-10">
                      <span className="text-xs text-gray-700">Birthdate: </span>
                      <p className="text-black -mt-2">{data?.Birthdate
                          ? new Date(data.Birthdate).toLocaleDateString()
                          : "Birthdate not available"}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-3 mt-1">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-gray-700">Coat: </span>
                      <p className="text-black -mt-2">{data?.Coat}</p>
                    </h5>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-gray-700">
                        Eyes color:{" "}
                      </span>
                      <p className="text-black -mt-2">{data?.EyesColor}</p>
                    </h5>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 z-10">
                      <span className="text-xs text-gray-700">
                        Issue Date:{" "}
                      </span>
                      <p className="text-black -mt-2">
                        {new Date().toLocaleDateString()}
                      </p>
                    </h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 mt-1">
                    <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900 mt-2">
                      <span className="text-xs text-gray-700">
                        Microchip number:{" "}
                      </span>
                      <p className="text-black md:-mt-2 whitespace-nowrap">
                        {data?.Microchip}
                      </p>
                    </h5>
                    <div className="col-span-1"></div>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-black">
                        Pedigree number:{" "}
                      </span>
                      <p className="text-black -mt-2">{data?.PedigreeNumber}</p>
                    </h5>
                  </div>

                  <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900 z-10 mt-2">
                    <span className="text-xs text-gray-700">
                      Document number:{" "}
                    </span>
                    <p className="text-black md:-mt-2">{didData?.controller}</p>
                  </h5>
                </div>
              </div>
            </div>
            <div className="flip-card-back p-4 text-left">
              <div
                className="absolute hidden md:block top-6 right-6 p-2 border-2 border-blue-300 rounded-lg bg-white cursor-pointer"
                onClick={toggleModal}
              >
                <QRCode
                  value={JSON.stringify(qrData)}
                  size={100}
                  fgColor="#0000FF"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-4">
                Pet Identity Passport verso
              </h1>
              <div className="flex flex-col sm:flex-row">
                <div className="md:flex-initial md:justify-start mx-auto"></div>
                <div className="ml-0 sm:ml-6 flex-grow mt-4 sm:mt-0">
                  <h5 className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-900">Issuer Did: </span>
                    <p className="-mt-2">{didData?.id}</p>
                  </h5>
                  <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">
                      Controller Did:{" "}
                    </span>
                    <p className="text-gray-700 md:-mt-2">
                      {didData?.controller}
                    </p>
                  </h5>
                  <div className="grid grid-cols-2 sm:grid-cols-3">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                      <span className="text-xs text-gray-900">
                        Issuer Address:{" "}
                      </span>
                      <p className="-mt-2">75000 Paris</p>
                    </h5>
                    <h5 className="text-lg font-bold tracking-tight text-gray-900 mt-2">
                      <span className="text-xs text-gray-900">Issuer: </span>
                      <p className="-mt-2">Vet DID or Clinic</p>
                    </h5>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 mt-2">
                    <div className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-gray-700">Pet Owner: </span>
                      <p className="text-gray-700 -mt-2">{data?.Owner}</p>
                    </div>
                    <div className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-gray-700">Origin: </span>
                      <p className="text-gray-700 -mt-2">{data?.Origin}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 mt-1">
                    <h5 className="text-lg font-bold tracking-tight text-gray-900">
                      <span className="text-xs text-gray-700">
                        Issue Date:{" "}
                      </span>
                      <p className="text-gray-700 -mt-2">
                        {data?.IdIssueDate
                          ? new Date(data.IdIssueDate).toLocaleDateString()
                          : "Date not available"}
                      </p>
                    </h5>
                  </div>
                  <h5 className="text-sm sm:text-lg font-bold tracking-tight text-gray-900 mt-2">
                    <span className="text-xs text-gray-700">PublicKey: </span>
                    <p className="text-gray-700 md:-mt-2 text-base">
                      EDCF22D7540A07F07D7D006AC738A7544CABF669B24099E5B31E9BE6FBC631016B
                    </p>
                  </h5>
                  <div className="text-lg font-bold tracking-tight text-gray-900">
                    <span className="text-xs text-gray-700">@context: </span>
                    <p className="text-gray-700 -mt-2">
                      https://www.w3.org/ns/did/v1
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h1 className="text-xs md:text-base md:mt-4 md:mb-0 mb-4 mt-8">
          Share your pet ID data proof by showing the QRCode
        </h1>
      </div>
    </section>
  );
}
