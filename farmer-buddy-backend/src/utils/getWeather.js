const getWeather = async (latitude, longitude) => {
    try{
        const weatherRes = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lon}&days=3`);
        const weatherData = await weatherRes.json();

        if(weatherData.error){
            return res.status(400).json({success: false, error: weatherData.error.message});
        }

        return {
            latitude: weatherData.location.lat,
            longitude: weatherData.location.lon,
            weather: weatherData.current
        };
    }catch(err){
        console.err('Weather fetching failed to load');
    }
};

export { getWeather };
