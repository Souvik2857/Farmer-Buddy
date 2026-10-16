import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
const UserDataCard = ({ email, createdAt }) => {
  const [userDetails, setuserDetails] = useState({});
  useEffect(() => {
    const getUserDetails = async () => {
      const res = await fetch(
        "http://localhost:5000/api/v1/admin/userFullDetails",
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


  return (
    <div className="border w-[70vw] h-[75vh] flex justify-evenly bg-amber-100">
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
        <p className="text-center text-white">Image</p>
        <div>
          <Image loading="eager" src={userDetails?.picture} fill className="object-cover"></Image>
        </div>
      </div>
    </div>
  );
};

export default UserDataCard;
