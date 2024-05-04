"use client";
const information = ( title: string, paragraph: string, srcImage: string) => {
  return (
    <div className="sm:w-1/4 px-2">
      <div className="flex items-center flex-row">

      <img src={srcImage} className="w-8 h-8 mr-4 text-[#ECAA00]" alt="Icon" />
      <h1 className="text-black xl:text-xl lg:text-l text-m font-semibold whitespace-normal
      ">{title}</h1>
      </div>
      <p className="text-gray-500 whitespace-normal mt-8 mb-8 mr-8 xl:text-l text-m">
      {paragraph}
      </p>
    </div>
  );
}


const App = () => {
  return (
    <>
    <section className="flex flex-row justify-center items-center mt-16 w-full">

      <div className="w-1/2 xl:pl-60 lg:pl-32 pl-8">
        <h1 className="text-[#ECAA00] xl:text-5xl lg:text-3xl text-2xl font-semibold whitespace-normal
        ">Your decentralized passport app</h1>
        <p className="text-gray-300 whitespace-normal mt-8 mb-8 mr-8 xl:text-xl text-l">
        Easily access to your pet information and join a pet lovers community to support shelters and ensure safer environments for all animals.
        </p>
        <a href="/loginHome" className="text-[#68D585] mt-8 text-lg font-semibold rounded-full whitespace-normal">Start a free trial →</a>
      </div>
      <div className="w-1/2 xl:pr-60 lg:pr-32 pr-8">
        <img src="/dog_picture.png" alt="Pet" />
      </div>

    </section>

    <section className="flex sm:flex-row flex-col justify-center mt-16 pt-8 px-32 w-full bg-white">
    
      {information("A decentralized passport app", "Using XRPL blockchain to secure transfer ownership. (transparency, security, and efficiency, low fees)", "/icons/solar-passport.png")}
      {information("Medical records", "Veterinarians will be able to consult the pet medical record and get all history.", "/icons/book-medical.png")}
      {information("Join a pet-friendly community", "Pet owners and adopters often face challenges in obtaining transparent information about the origin of their pets, including breeding history, genetic lineage, and health records.", "/icons/people-community.png")}
      {information("Solidarity", "Support animal shelters through donations to help  on their mission to ensure the well-being and care of abandoned or mistreated animals", "/icons/donation.png")}

    </section>


    </>
    
  );
};

export default App;