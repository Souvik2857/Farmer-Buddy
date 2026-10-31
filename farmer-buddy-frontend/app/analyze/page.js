"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useRef, useState, useEffect } from "react";
import { getUserLanguage } from "@/utils/languageDetection";
import { getLocation } from "@/utils/getUserLocation";
import GlowButton from "@/components/RingGlow";
import Image from "next/image";
import ChatThreadSkeleton from "@/components/ChatConverSationLoader";
const Page = () => {
  const { data: session,status } = useSession();
  const [isLoading, setisLoading] = useState(false)
  const [language, setlanguage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [fieldDetails, setfieldDetails] = useState({})
  const [coOrdinates, setcoOrdinates] = useState({})
  const [userInfo, setUserInfo] = useState({})
  const [userFile, setuserFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [arr, setarr] = useState([])
  const [isVerified, setisVerified] = useState(false)
  const [adminData, setadminData] = useState({})
  const [feildData, setFeildData] = useState(false)
  const [chatLoading, setchatLoading] = useState(false)
  const text=useRef()


  useEffect(() => {
    const verifyAdmin=async()=>{
      const res=await fetch("http://localhost:5000/api/v1/admin/verifyAdmin",
        {
          credentials:'include'
        }
      )
      const data=await res.json()
      if(data.status==200){

        setisVerified(true)
        setadminData({...adminData,...data.adminData})
      }
    }
    verifyAdmin()
  }, [])
  

 useEffect(() => {
  if (session === undefined) {
    return;
  }

  const getUserData = async () => {
    try {
      if(session){
        setchatLoading(true)
        const [res, res2] = await Promise.all([
        fetch("http://localhost:5000/api/v1/user/getUser", { credentials: "include" }),
        fetch("http://localhost:5000/api/v1/user/getConversation", { credentials: "include" })
      ]);

      const [user, history] = await Promise.all([res.json(), res2.json()]);

      const { userData } = user;
      const { data } = history;
      setcoOrdinates({
        latitude:userData?.cordinates?.latitude,
        longitude:userData?.cordinates?.longitude
      })
      const languageCode = getUserLanguage(userData?.location?.state);
      setlanguage(languageCode.bcp47);   
      setarr(data);
      setchatLoading(false)
    }
    else if(isVerified){
        setchatLoading(true)
        const res=await fetch("http://localhost:5000/api/v1/admin/getAdminConversation",
          {
            credentials:"include"
          }
        )
        const {data} = await res.json()
        
        setcoOrdinates({
        latitude:adminData?.coordinates?.latitude,
        longitude:adminData?.coordinates?.longitude
      })
      const languageCode = getUserLanguage(adminData?.location?.state);
      setlanguage(languageCode.bcp47);   
      setarr(data);    
      setchatLoading(false)     
    }
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
      setcoOrdinates({
        latitude:location.latitude,
        longitude:location.longitude
      })
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  if (session || isVerified) {
    getUserData();
    
  } else {
    userLocation();
    
  }
}, [session,isVerified]);

  
  const getUserFieldDetails=async()=>{
      setisLoading(true)
      try {
        
        const [res,res2]=await Promise.all([
            fetch('http://localhost:5000/api/v1/user/getWeather',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({latitude:coOrdinates?.latitude,longitude:coOrdinates?.longitude})
            }),
            fetch('http://localhost:5000/api/v1/user/getSoilData',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({latitude:coOrdinates?.latitude,longitude:coOrdinates?.longitude})
            })
        ])
        const [weatherData,soilData]=await Promise.all([res.json(),res2.json()])
        setFeildData(true)
        setfieldDetails({
          weather:{
            ...weatherData.data
          },
          soilData:{
            ...soilData.data
          }
        })
      } catch (error) {
        console.log(error);
      }
      finally{
        setisLoading(false)
      }
      
  }
  
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
    setisLoading(true)
   try {
     const formData=new FormData()
     if(userInfo==""){
      userInfo.text=text.current.value
     }
     formData.append("text", JSON.stringify(userInfo))
     formData.append("files", userFile)
     formData.append("weatherData", JSON.stringify(fieldDetails.weather))
     formData.append("soilData", JSON.stringify(fieldDetails.soilData))
     let res
     if(session){
       res=await fetch("http://localhost:5000/api/v1/user/analyze",{
         method:'POST',
         credentials:"include",
         body:formData
        })
      }
      else if(isVerified){
        res=await fetch("http://localhost:5000/api/v1/user/analyzeAdmin",{
         method:'POST',
         credentials:"include",
         body:formData
        })
      }
      else{
        res=await fetch("http://localhost:5000/api/v1/user/logoutUserAnalyze",{
         method:'POST',
         body:formData
        })
      }
    const data=await res.json()
    const {conversation}=data
    const user=conversation?.user
    const gemini=conversation?.gemini
    const {picture}=data
     
    setarr([...arr,{conversation:{user:user,gemini:gemini},picture:picture,isApproved:data.isApproved}])
    setImagePreview(null)
    setuserFile(null)
    text.current.value=""
   } catch (error) {
    console.log("there is a error in submiting the data ",error);
   }
   finally{
      setisLoading(false)
   }
    
  }
  
  const removeSelectedPicture=()=>{
    setImagePreview(null)
    setuserFile(null)
    setImagePreview(null)
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
        console.log(transcript);
        
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
      <div className="flex justify-center items-center flex-col">
        {feildData && 
       <div className="absolute bottom-30 bg-gray-800 text-white px-2 py-1 rounded-xl">Field data loaded</div>    
        }
        <div className="analyze-ai flex flex-col items-center w-[78vw] h-[72vh]">
          <p className="text-xl text-center mt-6 mb-4">
            Ask me anything about crops, pests, weather, soil or farming
          </p>

          <div className="w-[90vw] h-[70vh] overflow-y-auto flex flex-col gap-3 p-3">
            {chatLoading ?<ChatThreadSkeleton></ChatThreadSkeleton>:<>
            {arr?.map((msg, index) => (
              <div key={index} className="flex flex-col gap-2">
                {msg?.picture && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 rounded-2xl rounded-br-sm text-white break-words">
                      <Image loading="lazy" src={`${msg.picture}`} height={150} width={150} alt="" />
                    </div>
                  </div>
                )}
                {msg?.conversation?.user && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%] px-3 py-2 text-xl rounded-2xl rounded-br-sm bg-blue-600 text-white break-words">
                      {msg?.conversation?.user}
                    </div>
                  </div>
                )}
                
                {msg?.isApproved && (
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
                {msg?.adminFeedback && (
                  <div className="flex justify-start">
                    <div className="max-w-[70%] px-3 py-2 text-xl rounded-2xl rounded-br-sm bg-blue-600 text-white break-words">
                      <p>Admin Dicision:</p>{msg.adminFeedback}
                    </div>
                  </div>
                )}

              </div>
            ))}</>
          }
          </div>
        </div>

        <div className="max-sm:flex justify-center min-[600px]:flex items-center gap-2 w-[70vw] px-4 py-3 ">
          <button className="py-4 max-[580px]:px-3 py-1 text-[16px] min-[580px]:border-none px-2 p-2 p-4 bg-green-400 rounded-xl cursor-pointer" onClick={()=>{
            getUserFieldDetails()
          }}>Field Details</button>
          <div className="flex items-center gap-2 relative flex-1 bg-white rounded-xl px-4 py-2.5 border border-gray-200 shadow-sm">
            
            {imagePreview &&
          <div className="image-preview absolute bottom-14 left-0 bg-white w-full rounded-t-xl flex flex-col justify-center">
            <Image className="rounded-xl ml-2 relative" src={imagePreview} width={140} height={140}>
            </Image>
            <Image className="absolute top-2 right-3 cursor-pointer" onClick={()=>{
              removeSelectedPicture()
            }} src={'/cross.svg'} width={15} height={20} alt="cross"></Image>
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
              onKeyDown={(event)=>{event.key=="Enter"?sendData():""}}
              onChange={handlechange}
              placeholder="Type Your Question Here..."
              className="md:flex-1  bg-transparent outline-none text-sm text-gray-700 
                     placeholder-gray-400 resize-none overflow-y-auto leading-6 "
            />
            <button onClick={()=>{startStreaming()}} className="p-1 flex-shrink-0 hover:bg-gray-50 rounded-lg cursor-pointer">
              <Image src={isListening?`/mic-off.svg`:`mic.svg`} alt="mic" width={20} height={20}></Image>
            </button>
          </div>
           {!isLoading?(   
          <button onClick={()=>{sendData()}}
            className="w-13 h-13 rounded-full bg-white border border-gray-200 
                         shadow-sm flex items-center justify-center flex-shrink-0 
                         hover:bg-gray-50 cursor-pointer"
          >
            <Image src={"/send.svg"} alt="send" width={20} height={20}></Image>
          </button>)
            :(<GlowButton loading={isLoading}></GlowButton>)}
          
        </div>
      </div>
    </>
  );
};

export default Page;
