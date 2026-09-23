"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
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
  const avatar = useRef();
function getUserLocation() {
  return new Promise((resolve, reject) => {  

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser.");
      reject(new Error("Geolocation not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        console.log(`Accuracy: within ${accuracy} meters`);
        resolve({ latitude, longitude, accuracy }); 
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("User denied the request for Geolocation."));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information is unavailable."));
            break;
          case error.TIMEOUT:
            reject(new Error("The request to get user location timed out."));
            break;
          default:
            reject(new Error("An unknown error occurred."));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0
      }
    );

  });
}
  const getUserData=async()=>{
    const res=await fetch("http://localhost:5000/api/v1/user/getUser",{
      credentials:"include"
    })
    const data=await res.json()
    setForm(data.userData) 
  }
  useEffect(() => {
    const {latitude,longitude}=getUserLocation()
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
  const form = new FormData();

  const sendData=async()=>{
  form.append("avatar", selectedFile);
  form.append("username", formData.username);
  form.append("email", formData.email);
  
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
            src={preview}
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
            value={formData.username}
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
            value={formData.email}
            name="email"
            placeholder="Place Email"
            />
          </div>
          <div>

          <p>Language</p>
          <input type="text" className="border w-80" />
          </div>
          <div>
          <p>Location</p>
          <input type="text" className="border w-80 " />
          </div>
          <button onClick={()=>{sendData()}} className="bg-[#6B352A] p-3 pl-6 pr-6 rounded-xl mt-2 text-white cursor-pointer">Save</button>
        </div>
      </div>
    </>
  );
};

export default page;
