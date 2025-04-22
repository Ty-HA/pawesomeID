import React, { useEffect, useState } from 'react';

/*
function XamanButton() {
  const [xumm, setXumm] = useState<any>(null);
  const [sub, setSub] = useState('... (please sign in)');

  useEffect(() => {
    if (window.XummPkce) {
      const xummInstance = new window.XummPkce('ffa43b6c-27a9-4ce7-88a9-d1d6a594e43f', {
        implicit: true,
        redirectUrl: document.location.href + '?custom_state=test'
      });
      setXumm(xummInstance);
    }
  }, []);

  const handleAuthClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    xumm.authorize().catch(e => console.log('e', e));
  };

  const handleLogoutClick = () => {
    xumm.logout();
    setSub('... (please sign in)');
  };

  useEffect(() => {
    xumm.on("error", (error: Error) => {
      console.log("error", error);
    });

    xumm.on("success", async () => {
      const state = await xumm.state();
      setSub(state?.me?.sub);
    });

    xumm.on("retrieved", async () => {
      console.log("Retrieved: from localStorage or mobile browser redirect");
      const state = await xumm.state();
      setSub(state?.me?.sub);
    });
  }, []);

  return (
    <div>
      <h1>Sample</h1>
      <h2>{sub}</h2>
      <button onClick={handleAuthClick}>Auth</button>
      <button onClick={handleLogoutClick}>Logout</button>
      
    </div>
  );
}

export default XamanButton;
*/