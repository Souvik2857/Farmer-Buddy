"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getUserLanguage } from "@/utils/languageDetection.js";
import Image from "next/image";

const Page = () => {
  const { data: session, status } = useSession();
  const [isVerified, setisVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();
  useEffect(() => {
    const verifyAdmin=async()=>{
      try {
        const res=await fetch("http://localhost:5000/api/v1/admin/verifyAdmin",{
          credentials:'include'
        })
        const data=await res.json()
        if(data.status===200){
        setisVerified(true)
        setForm(data.adminData) 
        setSelectedFile(data.adminData?.avatar)
        if (data.adminData?.avatar) setPreview(data.adminData.avatar.replace("http://", "https://"));
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
    if (!session && !isVerified ) router.push("/login");
  }, [status, router,isLoading,session,isVerified]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("/avatar.svg");
  const [formData, setForm] = useState({});
  const [userData, setUserData] = useState({})
  const avatar = useRef();

  const getUserData=async()=>{
    const res=await fetch("http://localhost:5000/api/v1/user/getUser",{
      credentials:"include"
    })
    const data=await res.json()
    setForm(data.userData) 
    setSelectedFile(data.userData?.avatar)
    if (data.userData?.avatar) setPreview(data.userData.avatar.replace("http://", "https://"));

  }
  let dataCity
  let latitude
  let longitude
  let language
  useEffect(() => {
    const getIpApi=async()=>{
      const ipApi=await fetch('https://ipapi.co/json/')
      const data=await ipApi.json()
      dataCity=data.city
      const state=data.region
      const country=data.country_name
      latitude=data.latitude
      longitude=data.longitude
      language=getUserLanguage(state)

      
      setUserData({"location":dataCity,
                "language":language.language,
                "latitude":latitude,
                "longitude":longitude,
                "country":country,
                "state":state
      })
    }
    getUserData()
    getIpApi()

  }, [session])



  const fileTrigger = () => {
    avatar.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file)
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };
  
  const sendData=async()=>{
  const form = new FormData();
  if(selectedFile)
  form.append("avatar",selectedFile);
  form.append("username", formData.username);
  form.append("email", formData.email); 
  form.append("isAdmin", isVerified)
  form.append("location", userData.location)
  form.append("country", userData.country)
  form.append("language", userData.language)
  form.append("latitude", userData.latitude)
  form.append("longitude", userData.longitude)
  form.append("state", userData.state)


  const res=await fetch("http://localhost:5000/api/v1/user/updateUser",
    {
      credentials:"include",
      method:"PUT",
      body:form
    },
    
  )
  const data=await res.json()
  if(data.status==201){
    alert("user information saved successfully")
  }
  }

  return (
    <>
      <div className="mt-20 px-4 pb-8 sm:px-6">
        <p className="text-center mb-2">Avatar</p>
        <div
          className="avatar border p-3 sm:p-5 w-28 h-28 sm:w-32 sm:h-32 mx-auto flex justify-center items-center bg-amber-50 relative"
          onClick={() => {
            fileTrigger();
          }}
        >
          <Image
            src={formData?.avatar?.length>0?`${formData?.avatar}`.replace('http://', 'https://'):preview}
            alt="profile"
            fill
            className="object-cover"
          ></Image>
          <input
            type="file"

            ref={avatar}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        <div className="flex flex-col items-center gap-3 w-full max-w-md mx-auto mt-5">
          <div className="w-full">

          <p className="mb-1">Name</p>
          <input
            type="text"
            
            className="border w-full px-3 py-2"
            value={formData?.username ??""}
            onChange={handleChange}
            name="username"
            placeholder="Enter your name"
            />
          </div>
          <div className="w-full">

          <p className="mb-1">Email</p>
          <input
            type="text"
            readOnly
            className="border w-full px-3 py-2"
            value={formData?.email ??""}
            name="email"
            placeholder="Place Email"
            />
          </div>
          <div className="w-full">

          <p className="mb-1">Language</p>
          <input type="text" onChange={handleChange} name="language" value={userData.language ?? ""} className="border w-full px-3 py-2" />
          </div>
          <div className="w-full">
          <p className="mb-1">Location</p>
          <input type="text" onChange={handleChange} name="location" value={userData.location ??""} className="border w-full px-3 py-2" />
          </div>
          <button onClick={()=>{sendData()}} className="bg-[#6B352A] p-3 px-6 rounded-xl mt-2 text-white cursor-pointer w-full sm:w-auto">Save</button>
        </div>
      </div>
    </>
  );
};

export default Page;
