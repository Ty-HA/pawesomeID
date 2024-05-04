import React, { useState, useEffect, createContext, useContext, ReactNode } from "react";

// Create UserContext
const UserContext = createContext({
  isConnected: false,
  token: null as string | null,
});

// Create UserContextProvider component
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let walletAddressToken: string | null = null;

    // Loop through all keys in localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      // Check if key contains wallet address
      if (key && key.includes('metamask')) {
        walletAddressToken = localStorage.getItem(key);
        break;
      }
    }

    setIsConnected(walletAddressToken != null);
    setToken(walletAddressToken);

    // Log all items in localStorage
    console.log('All items in localStorage:', Object.entries(localStorage));

    if (walletAddressToken) {
      console.log('Connected with token:', walletAddressToken);
    } else {
      console.log('No connection detected.');
    }
  }, []);

  useEffect(() => {
    console.log('Is connected:', isConnected);
  }, [isConnected]);

  return (
    <UserContext.Provider value={{ isConnected, token }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a hook to use the UserContext, this is just a shortcut
export const useUserContext = () => useContext(UserContext);