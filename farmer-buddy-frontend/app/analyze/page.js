"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import { getUserLanguage } from "@/utils/languageDetection";
import { getLocation } from "@/utils/getUserLocation";
import Image from "next/image";
const page = () => {
  const { data: session } = useSession();
  const [language, setlanguage] = useState(null)
  const [isListening, setIsListening] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [userFile, setuserFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [arr, setarr] = useState([])
  const text=useRef()
  useEffect(() => {
  if(session){
      const getUserData=async()=>{
        const res=await fetch("http://localhost:5000/api/v1/user/getUser",{
          credentials:"include"
        })
        const data=await res.json()
        const languageCode=getUserLanguage(data.location.state)
        setlanguage(languageCode.bcp47)
      }
      getUserData()
      
    }
    const userLocation=async()=>{
      const location=await getLocation()
      console.log(location.latitude,location.longitude);
    }


  if(!session){
    userLocation()
    
  }
}, [])

  const userFileHandleChange=(e)=>{
      const file=e.target.files[0]

      
      if(file){
        setuserFile(file)
        setImagePreview(URL.createObjectURL(file))
      }

  }
  const handlechange=(e)=>{
    setUserInfo({...userInfo,[e.target.name]:e.target.value})
  }
  const sendData=async()=>{
    const formData=new FormData()
    formData.append("text", JSON.stringify(userInfo))
    formData.append("files", userFile)
    const res=await fetch("http://localhost:5000/api/v1/user/analyze",{
      method:'POST',
      credentials:"include",
      body:formData
    })
    const data=await res.json()
    
    setarr([...arr,{user:{...userInfo,imagePreview},model:`${data.geminiReply}`}])
    setImagePreview(null)
    setuserFile(null)
    text.current.value=""
  }
  useEffect(() => {
    console.log(arr);
    
  }, [arr])
  
  function startSpeechRecognition(bcp47Code) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error('Speech Recognition not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = bcp47Code || "bn-IN"; 
  console.log(recognition.lang);
      
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.onresult = (event) => {
    let interimText = '';
    text.current.value = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        text.current.value += transcript;  
      } else {
        text.current.value += transcript;  
         
      }
    }
  };

  recognition.onerror = (event) => {
    console.error('Error:', event.error);
  };

  recognition.onend = () => {
    console.log('Recognition stopped.');
  };

  recognition.start();
  return recognition; 
}

const recRef = useRef(null);
const startStreaming = () => {
  if (!isListening) {
    
    recRef.current = startSpeechRecognition(language);
    setIsListening(true);
  } else {
    recRef.current?.stop();
    setIsListening(false);
  }
};


  
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
                {msg.user.imagePreview && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 rounded-2xl rounded-br-sm text-white break-words">
                      <img src={`${msg.user.imagePreview}`} height={120} width={120} alt="" />
                    </div>
                  </div>
                )}
                {msg.user.text && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 rounded-2xl rounded-br-sm bg-blue-600 text-white break-words">
                      {msg.user.text}
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

        <div className="flex items-center gap-2 w-[70vw] right-20 px-4 py-3 absolute bottom-1 ">

          <div className="flex items-center gap-2 flex-1 bg-white rounded-full px-4 py-2.5 border border-gray-200 shadow-sm">
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
                name="image"
                onChange={userFileHandleChange}
                capture="environment"
                ref={image}
                className="hidden"
              />
            </button>
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
              <input name="file" onChange={userFileHandleChange} type="file" ref={file} className="hidden" />
            </button>

            <textarea ref={text}
              rows={1}
              name="text"
              onChange={handlechange}
              placeholder="Type Your Question Here..."
              className="flex-1  bg-transparent outline-none text-sm text-gray-700 
                     placeholder-gray-400 resize-none overflow-y-auto leading-6 "
            />

            <button onClick={()=>{startStreaming()}} className="p-1 flex-shrink-0 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Image src={isListening?`/mic-off.svg`:`mic.svg`} alt="mic" width={20} height={20}></Image>
            </button>
          </div>

          <button onClick={()=>{sendData()}}
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
