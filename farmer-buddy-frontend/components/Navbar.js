"use client";
import React from "react";
import Image from "next/image";
import NextAuth from "next-auth";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const pageName = pathname.split("/").filter(Boolean).pop();

  return (
    <>
      <div className="grid grid-cols-3 items-center bg-[#6B352A] p-2">
        <Image
          src={
            '/icon.jpg'
          }
          alt="Image not loaded"
          width={90}
          height={90}
          className="rounded-2xl ml-2 mt-2 mb-2  justify-self-start"
        ></Image>
        <div className="justify-self-center text-white text-3x">{!pageName?"":(
          <div className="w-90 border p-5 rounded-2xl bg-[#FFF1A6]"><p className="text-center text-3xl font-bold text-green-500 ">Farmer Buddy</p></div>
        )}</div>
        <div className="justify-self-end flex items-center gap-1">
          {!session ? (
            <Link href={'/analyze'} className="border pl-4 pr-4 pt-2.5 pb-2.5 rounded-xl bg-[#39FF88] cursor-pointer hover:bg-green-500">
              Analyze
            </Link>
          ) : (
            <select
              className="border-0 p-3 rounded-xl bg-[#39FF88] cursor-pointer hover:bg-green-500"
              onChange={(e) => {
                if (e.target.value) {
                  router.push(e.target.value);
                }
              }}
              defaultValue=""
            >
              <option value="" disabled hidden>
                Select Option
              </option>
              <option value="/profile">Profile</option>
              <option value="/analyze">Analyze</option>
            </select>
          )}
          {!session ? (
            <Link
              className="border mr-2 pl-4 pr-4 pt-2.5 pb-2.5 rounded-xl bg-[#39FF88] border-0 cursor-pointer hover:bg-green-500"
              href={"/login"}
            >
              Login
            </Link>
          ) : (
            <Link
              className="border mr-2 pl-4 pr-4 pt-2.5 pb-2.5 rounded-xl bg-[#39FF88] border-0 cursor-pointer hover:bg-green-500"
              href={"/login"}
              onClick={() => {
                signOut();
              }}
            >
              Logout
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
