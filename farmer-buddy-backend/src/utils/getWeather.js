const getwhether = async (latitude, longitude) => {
    try{
        const weatherRes = await fetch('http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHERAPI_KEY}&q=${lat},${lon}&days=3');
        const weatherData = weatherRes.json;

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


const getSoilData = async(latitude, longitude, startDate, endDate) => {
    try{
        const soilRes = await fetch('https://power.larc.nasa.gov/api/temporal/daily/point?parameters=GWETTOP,GWETROOT&community=AG&latitude=${latitude}&longitude=${longitude}&start=${startDate}&end=${endDate}&format=JSON');
        const soilData = soilRes.json;

        if(soilData.error){
            return res.status(400).json({error: soilData.error.message});
        }

        return soilData;
    }catch(err){
        console.err('Problem Occurd while Soil Data fetching');
    }
}

export { getwhether, getSoilData };