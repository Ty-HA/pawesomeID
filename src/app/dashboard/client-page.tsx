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
                <th className="p-4 border-b-2  border-gray-300 border-r-2">Pet Name</th>              
                <th className="p-4 border-b-2 border-gray-300 border-r-2">DID</th>
                <th className="p-4 border-b-2  border-gray-300 border-r-2">Specie</th>
              </tr>
            </thead>
            <tbody>
              {/* Exemple de données simulées */}
              {[
                {
                  name: "Bunny",
                  did: "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ-1",
                  specie: "Dog",
                },
                {
                  name: "Widget",
                  did: "did:xrpl:1:rp5vPZ49XvsqVtuWvaCSgwSbcya1HVpnaZ-2",
                  specie: "Dog",
                },
                { name: "Charlie", did: "did:example:789", specie: "Cat"},
              ].map((pet) => (
                <tr key={pet.did} className="hover:bg-gray-50">
                  <td className="p-4 border-b border-r-2">{pet.name}</td>
                  <td className="p-4 border-b border-r-2">{pet.did}</td>
                  <td className="p-4 border-b border-r-2">{pet.specie}</td>
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
