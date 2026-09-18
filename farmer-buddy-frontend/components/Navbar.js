import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <>
      <div className="flex items-center justify-between  bg-[#6B352A]">
        <Image
          src={
            "https://res.cloudinary.com/deuhdw4fr/image/upload/v1789709955/Farmer-buddy-image_l5morw.jpg"
          }
          alt="Image not loaded"
          width={90}
          height={90}
          className="rounded-2xl m-2"
        ></Image>
        <p className="text-white text-3xl">Welcome</p>
        <button className="border m-2 pl-4 pr-4 pt-2.5 pb-2.5 rounded-xl bg-[#39FF88] border-0 cursor-pointer">Login</button>
      </div>
    </>
  );
};

export default Navbar;
