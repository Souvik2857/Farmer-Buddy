"use client"
import React, { useEffect ,useState} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import LoginPage from "@/components/LoginPage";
import NextAuth from "next-auth";
const Page = () => {
  const router=useRouter()
  const {data:session,status} = useSession();
   const [isVerified, setisVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const verifyAdmin=async()=>{
      try {
        const res=await fetch("https://farmer-buddy-vtfw.onrender.com/api/v1/admin/verifyAdmin",{
          credentials:'include'
        })
        const data=await res.json()
        if(data.status===200){
        setisVerified(true)
        }
      } catch (error) {
        console.log(error);
      }
      finally{
        setIsLoading(false)
      }
    }
 verifyAdmin()
  }, [])


  useEffect(() => {
    if(isLoading || status ==="loading"){
      return
    }
    if (session || isVerified ) router.push("/profile");
  }, [status, router,isLoading,session,isVerified]);

  return (
    <>
      <LoginPage></LoginPage>
    </>
  );
};

export default Page;
