"use client";

import React from "react";
import Home from "../app/home/page";
import LoginHome from "../app/loginHome/page";
// import { useUserContext, UserContextProvider } from "../contexts/UserContext";

const App = () => {
  const isConnected = false;

  return (
  
      <main className="flex min-h-screen flex-col items-center justify-between">
        {isConnected ? <Home /> : <LoginHome />}
      </main>
    
  );
};

export default App;