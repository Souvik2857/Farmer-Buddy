"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginPage from "@/components/LoginPage";
import NextAuth from "next-auth";
const page = () => {
  const router=useRouter()
  const {data:session} = useSession();
  if (session) {
    router.push("/profile")
  }
  return (
    <>
      <LoginPage></LoginPage>
    </>
  );
};

export default page;
