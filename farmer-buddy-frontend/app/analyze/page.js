"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import { getUserLanguage } from "@/utils/languageDetection";
import Image from "next/image";
const page = () => {
  const { data: session } = useSession();
  const [langCode, setLangCode] = useState("");

  useEffect(() => {
    const getIpApi = async () => {
      const ipApi = await fetch("https://ipapi.co/json/");
      const data = await ipApi.json();
      const state = data.region;
      const language = getUserLanguage(state);
      setLangCode(language.bcp47|| "en-IN") ;
      console.log(langCode);
      
    };
    getIpApi()
  }, []);
  useEffect(() => {
   console.log(langCode);
   
  }, [langCode])
  

  let arr = [{ user: "Hello", model: "Yes how can i help you" }];
  const image = useRef();
  const file = useRef();
  const imageTrigger = (params) => {
    params.current.click();
  };
  
  return (
    <>
      <div className="flex gap-3 relative">
        <div className="recent-search bg-[#FFF9D6] w-[22vw] h-[82.5vh]">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src={"/clock.svg"}
              width={20}
              height={20}
              className="ml-2 mt-7"
            ></Image>
            <p className="font-bold mt-7">Recent Searches</p>
          </div>
          <div className="search-history flex flex-col gap-2 ml-5">
            <div className="bg-[#D9D9D9] w-[250] rounded-2xl p-4 cursor-pointer">
              <p className="font-bold">Tomato leaf Disease</p>
              <p className="text-xs">Fungal infection</p>
              <p className="text-xs">Date:- 19 sept 2026</p>
            </div>
            <div className="bg-[#D9D9D9] w-[250] rounded-2xl p-4 cursor-pointer">
              <p className="font-bold">Tomato leaf Disease</p>
              <p className="text-xs">Fungal infection</p>
              <p className="text-xs">Date:- 19 sept 2026</p>
            </div>
            <div className="bg-[#D9D9D9] w-[250] rounded-2xl p-4 cursor-pointer">
              <p className="font-bold">Tomato leaf Disease</p>
              <p className="text-xs">Fungal infection</p>
              <p className="text-xs">Date:- 19 sept 2026</p>
            </div>
          </div>
        </div>
        <div className="analyze-ai flex flex-col items-center w-[78vw] h-[75vh]">
          <p className="text-xl text-center mt-6 mb-4">
            Ask me anything about crops, pests, weather, soil or farming
          </p>

          <div className="w-[70vw] h-[75vh] overflow-y-auto flex flex-col gap-3 p-3">
            {arr.map((msg, index) => (
              <div key={index} className="flex flex-col gap-2">
                {msg.user && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 rounded-2xl rounded-br-sm bg-blue-600 text-white break-words">
                      {msg.user}
                    </div>
                  </div>
                )}
                {msg.model && (
                  <div className="flex justify-start">
                    <div className="text-xs max-w-[70%] px-3 py-2 rounded-2xl rounded-bl-sm bg-zinc-700 text-white break-words">
                      {msg.model}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-[70vw] right-20 px-4 py-3 absolute bottom-1">
          {/* Main input pill */}
          <div className="flex items-center gap-2 flex-1 bg-white rounded-full px-4 py-2.5 border border-gray-200 shadow-sm">
            {/* Left icon 1 - boxed */}
            <button
              onClick={() => {
                imageTrigger(image);
              }}
              className="p-1.5 rounded-lg border border-gray-200 flex-shrink-0 hover:bg-gray-50 cursor-pointer"
            >
              <Image
                src={"/pic.svg"}
                alt="image"
                width={20}
                height={20}
              ></Image>
              <input
                type="file"
                capture="environment"
                ref={image}
                className="hidden"
              />
            </button>

            {/* Left icon 2 - clip */}
            <button
              onClick={() => {
                imageTrigger(file);
              }}
              className="p-1 flex-shrink-0 hover:bg-gray-50 rounded-lg cursor-pointer"
            >
              <Image
                src={"/paperclip.svg"}
                alt="clip"
                width={20}
                height={20}
              ></Image>
              <input type="file" ref={file} className="hidden" />
            </button>

            {/* Actual textarea */}
            <textarea
              rows={1}
              placeholder="Type Your Question Here..."
              className="flex-1 bg-transparent outline-none text-sm text-gray-700 
                     placeholder-gray-400 resize-none overflow-hidden leading-6"
            />

            {/* Mic icon */}
            <button className="p-1 flex-shrink-0 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Image src={"/mic.svg"} alt="mic" width={20} height={20}></Image>
            </button>
          </div>

          {/* Send button */}
          <button
            className="w-13 h-13 rounded-full bg-white border border-gray-200 
                         shadow-sm flex items-center justify-center flex-shrink-0 
                         hover:bg-gray-50 cursor-pointer"
          >
            <Image src={"/send.svg"} alt="send" width={20} height={20}></Image>
          </button>
        </div>
      </div>
    </>
  );
};

export default page;
