"use client";

const ButtonStart = () => {
  return (
    <a href="/loginHome" className="bg-[#ECAA00] hover:bg-[#c48200] active:bg-[#f6b400] text-white px-2 mt-8 text-lg font-semibold rounded-full whitespace-normal">Start now →</a>
  )
}

const FirstSection = () => {
  return (<section className="flex sm:flex-row flex-col-reverse justify-center items-center mt-16 pb-20 w-full">

      <div className="sm:w-1/2 xl:pl-60 lg:pl-32 px-8">
        <h1 className="text-[#ECAA00] xl:text-5xl lg:text-3xl text-2xl font-semibold whitespace-normal
        ">Your decentralized passport app</h1>
        <p className="text-gray-300 whitespace-normal my-8 xl:text-xl text-l">
        Easily access to your pet information and join a pet lovers community to support shelters and ensure safer environments for all animals.
        </p>
        
      <ButtonStart />
      </div>
      <div className="sm:w-1/2 xl:pr-60 lg:pr-32 px-8">
        <img src="/dog_picture.png" alt="Pet" />
      </div>
    </section>);
}


const information = ( title: string, paragraph: string, srcImage: string) => {
  return (
    <div className="lg:w-1/4 px-2">
      <div className="flex items-center flex-row">
      <img src={srcImage} color="#ECAA00" className="w-8 h-8 mr-4" alt="Icon" />
      <h1 className="text-black xl:text-xl lg:text-l text-m font-semibold whitespace-normal
      ">{title}</h1>
      </div>
      <p className="text-gray-500 whitespace-normal mt-8 mb-8 mr-8 xl:text-l text-m">
      {paragraph}
      </p>
    </div>
  );
}

const explication = ( title: string, paragraph: string, srcImage: string, direction: boolean) => {
  return (
    <section className={`flex ${direction ? "sm:flex-row" : "sm:flex-row-reverse"} flex-col justify-center mt-16 sm:px-32 px-4 w-full bg-white`}>
      <div className={`sm:w-1/2 px-4 ${direction ? "xl:pl-60 lg:pl-32 sm:pl-8": "xl:pr-60 lg:pr-32 sm:pr-8"}`}>
        <img src={srcImage} alt="Pet" />
      </div>
      <div className={`sm:w-1/2 px-4 ${direction ? "xl:pr-60 lg:pr-32 sm:pr-8" : "xl:pl-60 lg:pl-32 sm:pl-8"}`}>
        <h1 className="text-black font-bold xl:text-5xl lg:text-3xl text-2xl whitespace-normal
        ">{title}</h1>
        <p className="text-gray-500 whitespace-normal mt-8 mb-8 mr-8 xl:text-xl text-l">
        {paragraph}
        </p>
      <ButtonStart />
      </div>
    </section>
  );
}



const App = () => {
  return (
    <>
    {FirstSection()}
    <div className="bg-white pb-8">


    <section className="flex lg:flex-row flex-col justify-center pt-12 sm:px-32 px-4 w-full bg-white">
    
      {information("A decentralized passport app", "Using XRPL blockchain to secure transfer ownership. (transparency, security, and efficiency, low fees)", "/icons/solar-passport.png")}
      {information("Medical records", "Veterinarians will be able to consult the pet medical record and get all history.", "/icons/book-medical.png")}
      {information("Join a pet-friendly community", "Pet owners and adopters often face challenges in obtaining transparent information about the origin of their pets, including breeding history, genetic lineage, and health records.", "/icons/people-community.png")}
      {information("Solidarity", "Support animal shelters through donations to help  on their mission to ensure the well-being and care of abandoned or mistreated animals", "/icons/donation.png")}

    </section>

      {explication("QR Code scanning", " With just a quick scan, you can easily identify and retrieve vital  information about your beloved pet, ensuring their safety and  well-being. Whether it's a lost pet or an emergency situation, our QR  code technology provides peace of mind, connecting you instantly to your  pet's profile and medical records.", "/image/phone.png", true)}
      {explication("NFT creation", "Transform your beloved pet into a unique digital collectible that  lasts forever. Simply upload a photo, fill the form, customize your NFT, and showcase  your pup's charm to the world on the blockchain.", "/image/dog.png", false)}
      {explication("Transfer ownership", "The breeder can transfer NFT ownership to the new owner by using our digital platform. This process ensures the new owner  officially owns the NFT and its associated canine pedigree information.", "/image/example-nft.png", true)}
    </div>
    </>
    
  );
};

export default App;