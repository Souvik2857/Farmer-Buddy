"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import { getUserLanguage } from "@/utils/languageDetection";
import { getLocation } from "@/utils/getUserLocation";
import Image from "next/image";
const Page = () => {
  const { data: session,status } = useSession();
  const [language, setlanguage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [userFile, setuserFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [arr, setarr] = useState([])
  const text=useRef()
 useEffect(() => {
  if (session === undefined) {
    return;
  }

  const getUserData = async () => {
    try {
      const [res, res2] = await Promise.all([
        fetch("http://localhost:5000/api/v1/user/getUser", { credentials: "include" }),
        fetch("http://localhost:5000/api/v1/user/getConversation", { credentials: "include" })
      ]);

      const [user, history] = await Promise.all([res.json(), res2.json()]);

      const { userData } = user;
      const { data } = history;

      const languageCode = getUserLanguage(userData.location.state);
      setlanguage(languageCode.bcp47);
      
      setarr(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const userLocation = async () => {
    try {
      const location = await getLocation();
      const res = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${location.latitude}&longitude=${location.longitude}`
      );
      const data = await res.json();

      const state = data.principalSubdivision;
      const languageCode = getUserLanguage(state);

      setlanguage(languageCode.bcp47);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  if (session) {
    getUserData();
  } else {
    userLocation();
  }
}, [session]);

  const userFileHandleChange=(e)=>{
      const file=e.target.files[0]
      URL.revokeObjectURL(imagePreview)
      
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
    setImagePreview(null)
    const data=await res.json()
    const {conversation}=data
    const user=conversation?.user
    const gemini=conversation?.gemini
    const {picture}=data
 
    setarr([...arr,{conversation:{user:user,gemini:gemini},picture:picture,isApproved:data.isApproved}])
    setImagePreview(null)
    setuserFile(null)
    text.current.value=""
  }


  
  function startSpeechRecognition(bcp47Code) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.error('Speech Recognition not supported in this browser.');
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = bcp47Code || language; 

      
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
      <div className="flex gap-3 justify-center items-center flex-col">      
        <div className="analyze-ai flex flex-col items-center w-[78vw] h-[75vh]">
          <p className="text-xl text-center mt-6 mb-4">
            Ask me anything about crops, pests, weather, soil or farming
          </p>

          <div className="w-[90vw] h-[70vh] overflow-y-auto flex flex-col gap-3 p-3">
            {arr.map((msg, index) => (
              <div key={index} className="flex flex-col gap-2">
                {msg.picture && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 rounded-2xl rounded-br-sm text-white break-words">
                      <img src={`${msg.picture}`} height={150} width={150} alt="" />
                    </div>
                  </div>
                )}
                {msg?.conversation?.user && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 text-xl rounded-2xl rounded-br-sm bg-blue-600 text-white break-words">
                      {msg.conversation.user}
                    </div>
                  </div>
                )}
                {msg.isApproved && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 text-xl rounded-2xl rounded-br-sm bg-blue-600 text-white break-words">
                      {msg.isApproved === 'Moderate' || msg.isApproved==='Low'?
                      (
                         <span className="text-yellow-500">Warning: Moderate or Low approval</span>
                      ):(
                        <span className="text-green-500">All good!</span>
                      )

                      }
                    </div>
                  </div>
                )}
                {msg.conversation?.gemini && (
                  <div className="flex justify-start">
                    <div className=" max-w-[70%] px-3 py-2 text-xl rounded-2xl rounded-bl-sm bg-zinc-700 text-white break-words">
                      {msg.conversation.gemini}
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 w-[70vw] px-4 py-3 ">
          <div className="flex items-center gap-2 relative flex-1 bg-white rounded-xl px-4 py-2.5 border border-gray-200 shadow-sm">
            {imagePreview &&
          <div className="image-preview absolute bottom-14 left-0 bg-white w-full rounded-t-xl flex flex-col justify-center">
            <Image className="rounded-xl ml-2" src={imagePreview} width={140} height={140}></Image>
          </div>
}
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

export default Page;
