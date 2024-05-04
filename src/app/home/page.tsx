"use client";

import React from "react";
import NavBar from "../../components/NavBar";
import { Button, Card } from "flowbite-react";

import Footer from "../../components/Footer";

export default function Home() {


  return (
    <>
      <NavBar />
      <main className="flex flex-col min-h-screen w-full">
        <section className="flex flex-col items-center mt-32 w-full">
          <div className="flex">
            <h1 className="text-base md:text-2xl font-semibold text-blue-900">
              Hi John!
            </h1>
          </div>
          <h2 className="md:text-2xl mt-2 text-blue-900">
            You have <strong>1000</strong> points !
          </h2>
        </section>
        <section
          id="points"
          className="w-full flex flex-col justify-center items-center mt-6 border-t border-grey bg-gray-100 pb-6"
        >
          <div className="flex">
            <h1 className="text-base md:text-2xl font-semibold text-black mt-4 mb-4">
              Redeem your points
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center md:justify-start items-center animate-slide-in">
            <Card href="#" className="max-w-sm bg-indigo-200 animate-slide-in">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                100 points
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-yellow-400">Claim now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                50 points
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-yellow-400">Claim now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                50 points
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-yellow-400">Claim now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                100 points
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-yellow-400">Claim now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-400">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                10 points
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-yellow-400">Claim now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                100 points
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-yellow-400">Claim now</Button>
            </Card>
          </div>
        </section>

        <section
          id="challenges"
          className="w-full flex flex-col justify-center items-center border-t border-grey"
        >
          <div className="flex">
            <h1 className="text-base md:text-2xl font-semibold text-black mt-4 mb-4">
              Earn more points
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 justify-center md:justify-start items-center mx-6">
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                SPECIAL OFFER
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Description
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-green-400">Join now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                SPECIAL OFFER
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Description
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-green-400">Join now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                SPECIAL OFFER
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Description
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-green-400">Join now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                SPECIAL OFFER
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Description
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-green-400">Join now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                SPECIAL OFFER
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Description
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-green-400">Join now</Button>
            </Card>
            <Card href="#" className="max-w-sm bg-indigo-200">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                SPECIAL OFFER
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Description
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                BRAND NAME
              </p>
              <Button className="bg-green-400">Join now</Button>
            </Card>
          </div>
        </section>
      </main>
      <div className="flex justify-center">
        <Footer />
      </div>
    </>
  );
}
