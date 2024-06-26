"use client";

import { useEffect, useState, useTransition } from "react";
import { Button } from "flowbite-react";
import Link from "next/link";
import PulseLoader from "react-spinners/PulseLoader";
import { topupXRP, transferXRP } from "@/lib/actions/xrpl-wallet";
import { User } from "@/types/user";
import TopBar from "@/components/top-bar";
import { getSession } from "@/lib/actions/auth";
import { Session } from "../../types/session";
import { fetchFileFromIPFS } from "../backend/pinFileToIPFS";

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

type HomeClientPageProps = {
  user: User;
  spendableBalance: number;
  totalReserve: number;
};

const HomeClientPage: React.FC<HomeClientPageProps> = ({
  user,
  spendableBalance,
  totalReserve,
}) => {
  const [transactionResult, setTransactionResult] = useState<string>();
  const [transactionHash, setTransactionHash] = useState<string>();
  const [isToppingUp, startToppingUp] = useTransition();
  const [isSending, startSending] = useTransition();
  const [googleDetails, setGoogleDetails] = useState<any>();
  const [data, setData] = useState<DataType | null>(null);
  const [hexUrl, setHexUrl] = useState("");
  const [didData, setDidData] = useState<DataType | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const hexUrl = await fetchFileFromIPFS();
      setHexUrl(hexUrl);
      console.log("Dynamic hexUrl", hexUrl);
    };
    fetchData();
  }, []);

  function setUserData(session: Session | null | undefined) {
    if (session) {
      const { name, email, picture } = session;
      setGoogleDetails({
        name: name,
        email: email,
        picture: picture,
      });
    }
  }

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

  const topupWallet = () => {
    topupXRP(user.blockchains.xrpl.walletAddress);
  };
  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      setUserData(session);
    };
    fetchData();
  }, []);

  const sendTransaction = async (event: FormData) => {
    setTransactionHash(undefined);
    const receiverAddress = event.get("receiverAddress")?.toString();
    const amount = event.get("amount")?.toString();

    if (!receiverAddress || !amount) return;

    const result = await transferXRP(
      user.blockchains.xrpl.walletAddress,
      receiverAddress,
      Number(amount)
    );

    if (result.error) alert(result.error);

    setTransactionHash(result.transactionHash);
    setTransactionResult(result.transactionResult);
  };

  return (
    <main className="flex min-h-screen flex-col items-center">
      <TopBar
        address={user.blockchains.xrpl.walletAddress}
        spendableBalance={spendableBalance}
        totalReserve={totalReserve}
        userName={googleDetails?.name} // Pass Google user name
        userEmail={googleDetails?.email} // Pass Google user email
        userImage={googleDetails?.picture} // Pass Google user profile picture
      />
      {/*<button
        className="w-fit flex flex-row justify-center items-center min-w-[150px] bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-[12px] text-white mt-[20px]"
        type="button"
        disabled={isToppingUp}
        onClick={() => startToppingUp(topupWallet)}
      >
        {isToppingUp ? (
          <PulseLoader size={10} color="white" />
        ) : (
          'Topup 60 XRP (Testnet only)'
        )}
      </button>
      <form
        action={(event) => startSending(() => sendTransaction(event))}
        className="w-5/6 sm:w-1/2 flex flex-col space-y-[8px] rounded-[12px] p-4 mt-[20px] border-2 border-black"
      >
        <p>Transfer XRP to</p>
        <input
          name="receiverAddress"
          className="w-full h-[40px] rounded-[12px] border-2 border-black/40 p-2"
        />
        <p>Amount</p>
        <input
          name="amount"
          className="w-full h-[40px] rounded-[12px] border-2 border-black/40 p-2"
        />
        <button
          className="w-fit self-end min-w-[150px] bg-blue-400 hover:bg-blue-500 px-4 py-2 mt-[16px] rounded-[12px] text-white"
          type="submit"
          disabled={isSending}
        >
          {isSending ? <PulseLoader size={10} color="white" /> : 'Transfer'}
        </button>

        {transactionHash && (
          <>
            <div
              className={`text-md font-medium pb-5 ${
                transactionResult === 'tesSUCCESS'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {transactionResult === 'tesSUCCESS'
                ? 'Transaction Succeeded'
                : 'Transaction Failed'}
            </div>
            <h3
              className={`text-[14px] ${
                transactionResult === 'tesSUCCESS'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              Transaction Hash:
            </h3>
            <Link
              href={`https://testnet.xrpl.org/transactions/${transactionHash}`}
              target="_blank"
              className={`text-[14px] underline hidden sm:inline-block ${
                transactionResult === 'tesSUCCESS'
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}
            >
              {transactionHash}
            </Link>
            <Link
              href={`https://testnet.xrpl.org/transactions/${transactionHash}`}
              target="_blank"
              className="text-green-500 text-[14px] underline sm:hidden"
            >
              {transactionHash.slice(0, 15)}...{transactionHash.slice(-15)}
            </Link>
          </>
        )}
      </form>*/}
      <div className="mt-8">
        <h2 className="text-3xl font-bold text-center">Your dashboard</h2>
        <div className="mt-4">
          <table className="w-full text-left border-collapse shadow-lg border-2 border-gray-300">
            <thead className="bg-blue-900">
              <tr>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Pet Name
                </th>
                <th className="p-4 border-b-2 border-gray-300 border-r-2">
                  DID
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Specie
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Breed
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Sex
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Origin
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Birthdate
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Coat
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Eyes color
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Microchip
                </th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">
                  Pedigree number
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple de données simulées */}
              {[
                {
                  name: data?.Name?.toUpperCase(),
                  did: didData?.controller,
                  specie: data?.Species,
                  breed: data?.Breed,
                  sex: data?.Sex,
                  origin: data?.Origin,
                  birthdate: data?.Birthdate ? new Date(data.Birthdate).toLocaleDateString() : undefined,
                  coat: data?.Coat,
                  eyesColor: data?.EyesColor,
                  microchip: data?.Microchip,
                  pedigreeNumber: data?.PedigreeNumber,

                },
                {
                  name: "Widget",
                  did: "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ-2",
                  specie: "Dog",
                  breed: "Chihuahua",
                  sex: "M",
                  origin: "FRA",
                  birthdate: "2023/01/01",
                  coat: "Black and tan",
                  eyesColor: "Brown",
                  microchip: "250269802698080",
                  pedigreeNumber: "123456789",
                },
                {
                  name: "Charlie",
                  did: "did:example:789",
                  specie: "Cat",
                  breed: "Siamese",
                  sex: "F",
                  origin: "USA",
                  birthdate: "2018/01/01",
                  coat: "Cream",
                  eyesColor: "Blue",
                  microchip: "250269802698080",
                  pedigreeNumber: "987654321",
                },
                {
                  name: "Charlie",
                  did: "did:example:789",
                  specie: "Cat",
                  breed: "Siamese",
                  sex: "F",
                  origin: "USA",
                  birthdate: "2018/01/01",
                  coat: "Cream",
                  eyesColor: "Blue",
                  microchip: "250269802698080",
                  pedigreeNumber: "987654321",
                },
                {
                  name: "Charlie",
                  did: "did:example:789",
                  specie: "Cat",
                  breed: "Siamese",
                  sex: "F",
                  origin: "USA",
                  birthdate: "2018/01/01",
                  coat: "Cream",
                  eyesColor: "Blue",
                  microchip: "250269802698080",
                  pedigreeNumber: "987654321",
                },
              ].map((pet) => (
                <tr key={pet.did} className="hover:bg-blue-900">
                  <td className="p-4 border-b border-r-2">{pet.name}</td>
                  <td className="p-4 border-b border-r-2">{pet.did}</td>
                  <td className="p-4 border-b border-r-2">{pet.specie}</td>
                  <td className="p-4 border-b border-r-2">{pet.breed}</td>
                  <td className="p-4 border-b border-r-2">{pet.sex}</td>
                  <td className="p-4 border-b border-r-2">{pet.origin}</td>
                  <td className="p-4 border-b border-r-2">{pet.birthdate}</td>
                  <td className="p-4 border-b border-r-2">{pet.coat}</td>
                  <td className="p-4 border-b border-r-2">{pet.eyesColor}</td>
                  <td className="p-4 border-b border-r-2">{pet.microchip}</td>
                  <td className="p-4 border-b border-r-2">{pet.pedigreeNumber}</td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </div>
      </div>
      <Button href="/mypets/addNewPet" className="bg-yellow-400 mt-24">
        Add a new pet
      </Button>
    </main>
  );
};

export default HomeClientPage;
function setUserData(
  session: import("../../types/session").Session | null | undefined
) {
  throw new Error("Function not implemented.");
}
