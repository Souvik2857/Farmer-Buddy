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
  const [preview, setPreview] = useState("/avatar.svg");
  const [formData, setForm] = useState({ username: "", email: "" });
  const avatar = useRef();

  const fileTrigger = () => {
    avatar.current.click();
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleChange = (e) => {
    setForm({ ...formData, [e.target.name]: e.target.value });
  };
  const form = new FormData();
  form.append("avatar", preview);
  form.append("username", formData.username);
  form.append("email", formData.email);
  const sendData=async()=>{
 
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
            className="border w-80"
            value={formData.email}
            onChange={handleChange}
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
