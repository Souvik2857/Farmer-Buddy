import { userinfo } from "../models/userInfo"

const getwhether = async (latitude, longitude) => {
    try{
        const user = await userinfo.findOne({ email });
        if(!user){
            return res.status(404).json({error: 'User not found'});
        }
        const weatherRes = await fetch('http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${encodeURIComponent(city)');
        const weatherData = await weatherRes.json;

        if(weatherData.error){
            return res.status(400).json({success: false, error: weatherData.error.message});
        }

        return res.json({
            success: true,
            latitude: weatherData.location.lat,
            longitude: weatherData.location.lon,
            weather: weatherData.current
        });
    }catch(err){
        console.err('Weather fetching failed to load');
        return res.status(500).json({error: err.message});
    }
};