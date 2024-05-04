"use client";

import React, { useCallback, useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import { ethers } from "ethers";
// import ABI from "./contract-abi.json";

import contractData from "./abi-brand.json";
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

interface Reward {
  id: string;
  name: string;
  description: string;
  pointsRequired: number;
}

export default function BrandProfile() {
  const [userAddress, setAddress] = useState<string | null>(null);
  // const [customerPoints, setCustomerPoints] = useState<number | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [rewardsName, setRewardsName] = useState<string | null>(null);
  const [rewardDescription, setRewardDescription] = useState<string | null>(
    null
  );
  const [rewardPointsRequired, setRewardPointsRequired] = useState<
    number | null
  >(null);

  const [rewardCreated, setRewardCreated] = useState(false);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [rewardBalance, setRewardBalance] = useState<string[]>([]);
  const [lastBalance, setLastBalance] = useState<string | null>(null);

  const getAddress = () => {
    const data = localStorage.getItem("address");

    if (data) {
      const parsedData = JSON.parse(data);
      const userAddress = parsedData.address;
      // setAddress(userAddress);
      setAddress("0x15A513E25B1CaC165468DdB538bb29D028b38998");
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

  // const contractAddress = "0x2960736f4ee28B2791777178D628D27208f82452";
  // const contractAddress = "0xFdA2D0fcC2C14f37413652A45f1068D33D5Eb59D";
  const contractAddress = "0x9583D7394a51b29F3505ee4b98E64D5ec44207A4";

  // Define the createReward function
  const createReward = useCallback(async () => {
    if (signer && rewardsName && rewardDescription && rewardPointsRequired) {
      const contract = new ethers.Contract(contractAddress, ABI, signer);
      await contract.createNewReward(
        rewardsName,
        rewardDescription,
        rewardPointsRequired
      );
      setRewardCreated(true);
    }
  }, [signer, rewardsName, rewardDescription, rewardPointsRequired]);

  // Call the createReward function when the rewardsName, rewardDescription, or rewardPointsRequired state variables change
  useEffect(() => {
    createReward();
  }, []);

  useEffect(() => {
    async function fetchRewards() {
      try {
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const rewardIds = [1, 2, 3, 4, 5, 6];

        const fetchedRewards: Reward[] = [];
        for (const id of rewardIds) {
          const rewardResult = await contract.getRewardFromID(id);
          const reward = {
            id: rewardResult[0].toString(),
            name: rewardResult[1],
            description: rewardResult[2],
            pointsRequired: rewardResult[3].toString(),
            activated: rewardResult[4]
          };

          fetchedRewards.push(reward);
        }

        setRewards(fetchedRewards);
      } catch (error) {
        console.error("Failed to fetch rewards:", error);
      }
    }

    fetchRewards();
  }, [signer]);

  useEffect(() => {
    async function fetchBalance() {
      try {
        const contract = new ethers.Contract(contractAddress, ABI, signer);

        const rewardIds = [1, 2, 3, 4, 5, 6];

        const fetchedBalance: string[] = [];
        for (const id of rewardIds) {
          const balance = (await contract.balanceOf(userAddress, id)).toString();

          fetchedBalance.push(balance);
        }

        setRewardBalance(fetchedBalance);
      } catch (error) {
        console.error("Failed to fetch rewards:", error);
      }
    }

    fetchBalance();
  }, [signer, lastBalance]);

  const chooseReward = useCallback(async (rewardID: string) => {
    if (!rewardID) {
      console.error("Reward ID is undefined");
      return;
    }
    try {
      console.log("Reward ID:", rewardID)
      if (signer && userAddress) {
        const contract = new ethers.Contract(contractAddress, ABI, signer);
        await contract.chooseReward(
          userAddress,
          rewardID,
          "0x00"
        );

        const balance = (await contract.balanceOf(userAddress, rewardID)).toString();

        console.log("Reward balance:", balance);
        
        setLastBalance(balance);
      }
    } catch (error) {
      console.error("Failed to choose rewards:", error);
    }
  }, [signer, userAddress]);

  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col justify-center items-center mt-32 w-full">
          <h1 className="mt-2 text-2xl font-semibold text-blue-900 mb-4">
            BRAND DASHBOARD
          </h1>
          <form
            onSubmit={(e) => {
              
              createReward();
            }}
          >
            <div className="flex flex-col gap-2 px-12">
              <div>
                <div className="block mb-2">
                  <Label
                    className="font-bold "
                    htmlFor="rewardsName"
                    value="Reward Name"
                  />
                </div>
                <TextInput
                  id="rewardsName"
                  type="text"
                  sizing="md"
                  value={rewardsName || ""}
                  onChange={(e) => setRewardsName(e.target.value)}
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label
                    className="font-bold "
                    htmlFor="rewardDescription"
                    value="Reward Description"
                  />
                </div>
                <TextInput
                  id="rewardDescription"
                  type="text"
                  sizing="md"
                  value={rewardDescription || ""}
                  onChange={(e) => setRewardDescription(e.target.value)}
                />
              </div>
              <div>
                <div className="block mb-2">
                  <Label
                    className="font-bold "
                    htmlFor="rewardPointsRequired"
                    value="Points Required"
                  />
                </div>
                <TextInput
                  id="rewardPointsRequired"
                  type="number"
                  sizing="md"
                  value={rewardPointsRequired || ""}
                  onChange={(e) => setRewardPointsRequired(Number(e.target.value))}
                />
              </div>
              <Button className="mt-6" color="warning" type="submit">
                Create reward
              </Button>
            </div>
          </form>
        </section>

        <section className="w-full flex flex-col justify-center items-center mt-6 border-t border-grey bg-gray-100 pb-6">
          <h1 className="mt-9 text-2xl font-semibold text-blue-900 mb-4">
            REWARDS
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center md:justify-start items-center animate-slide-in">
            {rewards.map((reward, index) => (
              <div key={index} className="mt-6 card">
                <Card
                  href="#"
                  className="max-w-sm bg-indigo-200 animate-slide-in"
                >
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Name: {reward.name}
                  </h2>
                  <p className="text-xl font-bold text-black">
                    {reward.description}
                  </p>
                  <p className="text-xl font-bold text-black">
                    {reward.pointsRequired.toString()} points required
                  </p>
                  <p className="text-xl font-bold text-black">
                    You own: {rewardBalance[parseInt(reward.id) - 1]}
                  </p>
                  <Button onClick={() => chooseReward(reward.id)} className="bg-yellow-400">Claim now</Button>
                </Card>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
