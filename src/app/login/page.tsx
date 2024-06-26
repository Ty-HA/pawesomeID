'use client';

import { loginWithGoogle } from '@/lib/actions/auth';
import { useGoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
import Link from 'next/link'; 
import Image from 'next/image';

const KaijuLoginPage: React.FC = () => {
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);



  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      loginWithGoogle(codeResponse.code)
        .then(() => {
          window.location.href = '/dashboard';  
        })
        .catch((error) => {
          console.error('Error during login:', error);
          setIsLoggingIn(false);
        });
    },
    onError: (error) => {
      console.log('Login Failed:', error);
      setIsLoggingIn(false);
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email',
    onNonOAuthError: (error) => {
      console.log('Login Failed:', error);
      setIsLoggingIn(false);
    },
  });

  const onClickLoginWithGoogle = () => {
    setIsLoggingIn(true);
    login();
  };

  return (
    <section className="flex sm:flex-row-reverse flex-col items-center w-full bg-white pb-8">
      <Image src="/image/get-started.png" alt="get started" className="w-1/2 mt-8 sm:mr-16 lg:mr-60 mx-8" width="300" height="300" />
      <div className="flex flex-col sm:w-1/2 xl:ml-60 lg:mr-32 px-8 items-center">
        <h1 className="mt-16 text-3xl font-semibold text-blue-900 mb-4">Get Started</h1>
        <p className="md:text-xl sm:text-left text-center text-gray-600 mb-8">Create a new Pawesome ID or connect a wallet</p>
        <div className="flex bg-white justify-center items-center">
          <button
            className="min-w-[250px] flex justify-center items-center bg-blue-400 hover:bg-blue-500 text-white p-3 rounded-[12px] w-[200px]"
            onClick={onClickLoginWithGoogle}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? <PulseLoader size={10} color="white" /> : 'Sign in with Google 🚀'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default KaijuLoginPage;