import komdigiLogo from "@/assets/komdigi-logo.png";

export const WelcomeScreen = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-background">
      <div className="flex flex-col items-center animate-fade-in">
        <img 
          src={komdigiLogo} 
          alt="KOMDIGI - Kementerian Komunikasi dan Digital Republik Indonesia" 
          className="max-w-md w-full h-auto"
        />
      </div>
    </div>
  );
};
