"use client"
import React from "react";
import Image from "next/image";
import NextAuth from "next-auth";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn,signOut } from "next-auth/react";
const Navbar = () => {
  const {data:session}=useSession()

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
        <div className="flex items-center gap-1 justify-center">
        <div className="border pl-4 pr-4 pt-2.5 pb-2.5 rounded-xl bg-[#39FF88] cursor-pointer hover:bg-green-500">Analyze</div>
        {!session?
        <Link className="border mr-2 pl-4 pr-4 pt-2.5 pb-2.5 rounded-xl bg-[#39FF88] border-0 cursor-pointer hover:bg-green-500" href={"/login"}>Login</Link>
      :<Link className="border mr-2 pl-4 pr-4 pt-2.5 pb-2.5 rounded-xl bg-[#39FF88] border-0 cursor-pointer hover:bg-green-500" href={"/login"} onClick={()=>{signOut()}}>Logout</Link>
      }
        
        </div>
      </div>
    </>
  );
};

export default Navbar;
