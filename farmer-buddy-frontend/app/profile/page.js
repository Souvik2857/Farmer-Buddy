"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { getUserLanguage } from "@/utils/languageDetection.js";
import Image from "next/image";
const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session == null) {
    router.push("/login");
  }

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
    getIpApi()
    getUserData()
  }, [])
  useEffect(() => {
    
    

  }, [formData])


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
  form.append("avatar",selectedFile);
  form.append("username", formData.username);
  form.append("email", formData.email);
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
  if(data.status>=200){
    alert("user information saved successfully")
  }
  
  }

  return (
    <>
      <div className="mt-20 ">
        <p className="text-center">Avatar</p>
        <div
          className="avatar border p-5 w-30 h-30 mx-auto flex justify-center items-center bg-amber-50 relative"
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
        <div className="flex flex-col items-center">
          <div>

          <p>Name</p>
          <input
            type="text"
            className="border w-80"
            value={formData?.username}
            onChange={handleChange}
            name="username"
            placeholder="Enter your name"
            />
          </div>
          <div>

          <p>Email</p>
          <input
            type="text"
            readOnly
            className="border w-80"
            value={formData?.email}
            name="email"
            placeholder="Place Email"
            />
          </div>
          <div>

          <p>Language</p>
          <input type="text" value={setForm.language?setForm.language:userData.language} className="border w-80" />
          </div>
          <div>
          <p>Location</p>
          <input type="text" value={setForm.location?.city?setForm.location.city:userData.location} className="border w-80 " />
          </div>
          <button onClick={()=>{sendData()}} className="bg-[#6B352A] p-3 pl-6 pr-6 rounded-xl mt-2 text-white cursor-pointer">Save</button>
        </div>
      </div>
    </>
  );
};

export default page;
