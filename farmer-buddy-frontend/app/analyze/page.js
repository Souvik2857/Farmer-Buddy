"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
const page = () => {
  const { data: session } = useSession();
  let arr = [
    {user:'Hello' ,model:"Yes how can i help you"}
  ];
  return (
    <>
      <div className="flex gap-3">
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
      </div>
    </>
  );
};

export default page;
