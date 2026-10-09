"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginPage from "@/components/LoginPage";
import NextAuth from "next-auth";
const Page = () => {
  const router=useRouter()
  const {data:session} = useSession();

  useEffect(() => {
    if (session) {
      router.push("/profile")
    }    
  });
  
  return (
    <>
      <LoginPage></LoginPage>
    </>
  );
};

export default Page;
