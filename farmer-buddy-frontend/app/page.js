import Image from "next/image";
import Navbar from "@/components/Navbar";
export default function Home() {
  return (
    <>
      <div className="headliner flex flex-col items-center mt-10 p-20">
        <div className="md:flex gap-2 text-3xl items-center">
          <p className="max-sm:text-2xl text-center text-[#18251D] font-bold md:text-[#18251D] font-bold">Welcome to the</p>
          <p className="max-sm:text-4xl text-center font-bold md:font-bold text-green-500 text-5xl">Farmer Buddy!</p>
        </div>
        <p className="max-sm:text-xl text-center text-[#18251D] font-bold text-3xl">
          Your all in one personal Crop Expert!
        </p>
      </div>
      <div className="max-sm:flex flex-col items-center mb-3 md:features flex justify-center gap-30">
        <div className="flex flex-col items-center p-3 h-[35vh] rounded-2xl bg-[#E8F5E9] shadow-xl/40 w-80">
          <Image loading="eager" src={"/cloud-gif.gif"} width={60} height={40}></Image>
          <p className="font-bold text-xl text-center mb-3">Weather Analysis & Report Generation</p>
          <p className="text-center">Gives weather prediction via user device location.</p>
        </div>
        <div className="flex flex-col items-center p-3 h-[35vh] rounded-2xl bg-[#E8F5E9] shadow-xl/40 w-80">
          <Image src={"/robot.svg"} width={60} height={40}></Image>
          <p className="font-bold text-xl text-center mb-3">Prediction & Prevention of Crop Issues</p>
          <p className="text-center">Expert suggestion using AI Analysis for the best outcomes in native language</p>
        </div>
        <div className="flex flex-col items-center p-3 h-[35vh] rounded-2xl bg-[#E8F5E9] shadow-xl/40 w-80">
          <div className="relative">
            <Image
              src={"/plant-gif.gif"}
              width={60}
              height={40}
              className="absolute"
            ></Image>
            <Image src={"/scan-gif.gif"} width={60} height={40}></Image>
          </div>
          <p className="font-bold text-xl text-center mb-3">AI Analysis for crop detection</p>
          <p className="text-center">Provides better image quality for better crop analysis and health monitoring</p>
        </div>
      </div>
    </>
  );
}
