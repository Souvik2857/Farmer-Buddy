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

//---------Soil Data Collector--------//

const getSoilData = async(latitude, longitude) => {
    try{
        const soilRes = await fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o&property=nitrogen&depth=0-5cm&value=mean`);
        const soilData = soilRes.json();

        if(soilData.error){
            return null;
        }

        return soilData;
    }catch(err){
        console.error('Problem Occurd while Soil Data fetching', err.message);
    }
}

export { getWeather, getSoilData };
