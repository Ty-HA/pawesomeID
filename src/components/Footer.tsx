"use client"
import { useState, useEffect, useCallback } from "react";
import QRCode from "qrcode.react";
import { Button, Modal } from "flowbite-react";
import { ethers } from "ethers";

import contractData from "../app/brand/abi-brand.json";
const ABI = contractData.abi;

interface Points {
  userAddress: string;
  points: number;
  data: string;
  
}

export default function Footer() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userAddress, setAddress] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);
  const [data, setData] = useState<string | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);


  const getAddress = () => {
    const data = localStorage.getItem("address");

    if (data) {
      const parsedData = JSON.parse(data);
      const userAddress = parsedData.address;
      setAddress(userAddress);
      console.log("User Address from Footer:", userAddress);
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

  const getUserPoints = async () => {
    // Replace this with your actual function to get the user's points
    const points = 100;
    setPoints(points);
  };

  useEffect(() => {
    getAddress();
    getUserPoints();
  }, []);

  

  const earnPoints = useCallback(async (rewardID: string) => {
    console.log('earnPoints called');
    if (!points) {
      console.error("No point available to earn rewards");
      return;
    }
    try {
      console.log("Reward ID:", rewardID)
      if (signer && userAddress) {
        console.log('signer and userAddress are defined');
        const contract = new ethers.Contract(userAddress, ABI, signer);
        await contract.earnPoints(
          userAddress,
          points,
          "0x00"
        );
        console.log('contract.earnPoints executed successfully');
        window.alert("Points earned by Customer on his wallet: " + userAddress + points);
      } else {
        console.log('signer or userAddress is not defined');
      }
    } catch (error) {
      console.error("Failed to earn points:", error);
    }
  }, [signer, points, userAddress]);


  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  const qrValue = JSON.stringify({ address: userAddress, points: points });

  return (
    <footer
      className="fixed bottom-10 flex justify-center md:mb-0 mb-2 p-6 border-2 border-purple-800 rounded-full bg-white"
      onClick={toggleModal}
    >
      <QRCode value={qrValue || ""}  size={50} />      
      <Modal show={modalIsOpen} onClose={toggleModal}>
        <div className="flex flex-col items-center justify-center h-full p-10">
          <h2 className="text-indigo-900 md:text-xl text-base font-semibold mb-6">
            Present your QR code for scanning
          </h2>
          <div className="border border-black p-6 rounded-xl items-center">
            <QRCode value={qrValue || ""} size={250} fgColor="#331b5c" />
          </div>
          <Button
            className="mt-8 bg-indigo-900 text-white"
            onClick={toggleModal}
          >
            Fermer
          </Button>
          <p className="text-black text-sm mt-4">Function when Brand scan the QR code below</p> 
          <Button
            className="bg-indigo-400 text-white"
            onClick={() => earnPoints("Points earned by Customer")}
          >
            Earn points
          </Button>
          
        </div>
       
      </Modal>
    </footer>
  );
}