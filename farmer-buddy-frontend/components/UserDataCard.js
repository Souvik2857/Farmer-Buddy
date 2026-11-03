import React from "react";
import { useState, useEffect,useRef } from "react";
import Image from "next/image";
const UserDataCard = ({ email, createdAt ,adminDetails}) => {
  const [userDetails, setuserDetails] = useState({});
  const [adminReviewData, setAdminReviewData] = useState()
  const adminFeedback = useRef()
  useEffect(() => {
    const getUserDetails = async () => {
      const res = await fetch(
        "https://farmer-buddy-vtfw.onrender.com/api/v1/admin/userFullDetails",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, createdAt: createdAt }),
        },
      );
      const data = await res.json();
      setuserDetails(data.user);
    };
    getUserDetails();
  }, []);

  const setAdminFeedback=async(approval)=>{
    setAdminReviewData({adminEmail:adminDetails.email,feedback:adminFeedback.current.value,userEmail:email,createdAt:createdAt,approval:approval})   
    const res=await fetch('https://farmer-buddy-vtfw.onrender.com/api/v1/admin/reviewChat',
      {
        method:'POST',
        headers:{
           "Content-Type": "application/json",
        },
        body:JSON.stringify(adminReviewData)
      }
    )
    const data=await res.json()
    if(data.status==200){
      alert('Admin feedback updated successfully')
    }
  }

  
  return (
    <div className="border w-[70vw] h-[80vh] bg-amber-100">
      <div className="flex justify-evenly">
      <div className="border h-60 w-55 mt-10 bg-[#1FB8D0] font-bold">
        <p className="text-center text-white">Weather details</p>
        <div className="ml-1 mt-1">
          <ul>
            <li>Pressure: {userDetails?.weather?.pressure}</li>
            <li>DewPoint: {userDetails?.weather?.dewPoint}</li>
            <li>Humidity: {userDetails?.weather?.humidity}</li>
            <li>WindDirection: {userDetails?.weather?.windDirection}</li>
            <li>WindSpeed: {userDetails?.weather?.windSpeed}</li>
            <li>Temperature: {userDetails?.weather?.temperature}</li>
            <li>Time: {userDetails?.weather?.location}</li>
          </ul>
        </div>
      </div>
      <div className="border h-60 w-55 mt-10 bg-[#895449] font-bold">
        <p className="text-center text-white">Soil details</p>
        <div className="ml-1 mt-1">
          <ul>
            <li>BulkDensity: {userDetails?.soil?.bulkDensity}</li>
            <li>CEC: {userDetails?.soil?.cec}</li>
            <li>Clay: {userDetails?.soil?.clay}</li>
            <li>Nitrogen: {userDetails?.soil?.nitrogen}</li>
            <li>OrganicCarbon: {userDetails?.soil?.organicCarbon}</li>
            <li>PH: {userDetails?.soil?.ph}</li>
            <li>Sand: {userDetails?.soil?.sand}</li>
            <li>Silt: {userDetails?.soil?.silt}</li>
          </ul>
        </div>
      </div>
      <div className="border h-60 w-55 mt-10 bg-[#B3B3B3] font-bold relative">
        <p className="text-center text-white">{!userDetails.picture?"Image is not provided":""}</p>
        <div>
          <Image loading="eager" src={userDetails?.picture} fill className="object-cover"></Image>
        </div>
      </div>
      </div>
        <div className="conversation grid grid-cols-2 mt-2 gap-20">
          <div className="ml-3">
            <p className="text-left ml-4">User</p>
              <p className="border p-2 rounded-b-xl rounded-r-xl">{userDetails?.conversation?.user}</p>
              <div className="flex flex-col mt-3">
            <label>Admin Decision</label>
            <input type="text" ref={adminFeedback} className="border" placeholder="Enter your decision" />
              </div>
            </div>
          <div className="mr-3">
            <p className="text-right mr-4">Model</p>
              <p className="border p-2 rounded-b-xl rounded-l-xl max-h-[250px] scrollbar-none overflow-y-auto">{userDetails?.conversation?.gemini}</p>
            </div>
        </div>
        <div className="flex justify-center mt-4">
        <button onClick={()=>{setAdminFeedback("True")}} className="border px-5 py-2 bg-green-700 text-white font-bold cursor-pointer rounded-xl">Approved</button>
        </div>
    </div>

  );
};

export default UserDataCard;
