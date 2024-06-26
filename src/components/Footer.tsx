"use client"
import '@fortawesome/fontawesome-free/css/all.css';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer
      className="flex sm:flex-row flex-col items-center py-4 md:mb-0 bg-[15,16,46] z-10 border-t border-blue-900"

    >
      <Image src="/icons/paw.png" alt="Logo" className="sm:my-1 sm:ml-10 mt-2 mb-4" width="50" height="50"/>
      <div className="flex flex-row items-center justify-center flex-grow">

     SOON :
     <i className="fab fa-facebook fa-xl mx-2"></i>
    <i className="fab fa-twitter fa-xl mx-2"></i>
    <i className="fab fa-instagram fa-xl mx-2"></i>
    <i className="fab fa-linkedin fa-xl mx-2"></i>
      </div>


    </footer>
  );
}