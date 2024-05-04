"use client";

import React, { useState, useEffect } from 'react';
// import sdk from '@crossmarkio/sdk';

import { Button, Card } from "flowbite-react";


export default function petDetails() {


  return (
    <>
      <main className="flex flex-col min-h-screen w-full bg-white">
        <section className="flex flex-col items-center mt-6 w-full">
          <div className="flex flex-col">
            <h1 className="text-base md:text-2xl font-semibold text-blue-900">
              Manage your Pawesome Pets
            </h1>
            
          </div>
        
        </section>
        <section
          id="pets"
          className="w-full flex flex-col justify-center items-center mt-6 border-t border-grey"
        >
          <div className="flex mt-12">
         
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-center md:justify-start items-center animate-slide-in">
            <Card href="#" className="max-w-sm bg-indigo-200 animate-slide-in">
              <h5 className="text-2xl font-bold tracking-tight text-gray-900">
                Kiko
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Shiba
              </p>
              <Button href="/" className="bg-yellow-400">View details</Button>
            </Card>
           
           
           
          </div>
          
        </section>

       
      </main>
      <div className="flex justify-center">

      </div>
    </>
  );
}
