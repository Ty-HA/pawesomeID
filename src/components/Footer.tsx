"use client"
import '@fortawesome/fontawesome-free/css/all.css';

export default function Footer() {
  return (
    <footer
      className="flex sm:flex-row flex-col items-center py-4 md:mb-0 bg-[#161c2d]"

    >
      <img src="/logo_full.png" alt="Logo" className="sm:w-64 sm:h-12 w-32 h-6 ml-8 sm:mb-0 mb-4" />
      <div className="flex flex-row items-center justify-center flex-grow">

     Contact us :
     <i className="fab fa-facebook fa-xl mx-2"></i>
    <i className="fab fa-twitter fa-xl mx-2"></i>
    <i className="fab fa-instagram fa-xl mx-2"></i>
    <i className="fab fa-linkedin fa-xl mx-2"></i>
      </div>


    </footer>
  );
}