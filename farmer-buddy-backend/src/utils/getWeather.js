const getWeather = async (latitude, longitude) => {
    try{
        
        const weatherRes = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHERAPI_KEY}&q=${latitude},${longitude}`);
        
        const weatherData = await weatherRes.json();
        
        if(weatherData.error){
            return res.status(400).json({success: false, error: weatherData.error.message});
        }

        return {
            pressure: weatherData.current.pressure_mb,
            dewPoint: weatherData.current.dewpoint_c,
            humidity: weatherData.current.humidity,
            windDirection: weatherData.current.wind_degree,
            windSpeed: weatherData.current.wind_kph,
            temperature: weatherData.current.temp_c,
            location: weatherData.location.localtime,
        };
    }catch(err){
        console.error('Weather fetching failed to load ',err);
    }
};

//---------Soil Data Collector--------//

const getSoilData = async(latitude, longitude) => {
    try{

        const soilRes = await fetch(`https://rest.isric.org/soilgrids/v2.0/properties/query?lon=${longitude}&lat=${latitude}&property=phh2o&property=nitrogen&property=soc&property=clay&property=sand&property=silt&property=cec&property=bdod&depth=0-5cm&depth=5-15cm&depth=15-30cm&depth=30-60cm&value=mean&value=Q0.05&value=Q0.95`);
        const soilData = await soilRes.json();

        if(soilData.error){
            return null;
        }

        return {
            ph: soilData.properties.layers[4].depths[0].values.mean/soilData.properties.layers[4].unit_measure.d_factor || "",
            organicCarbon: soilData.properties.layers[7].depths[0].values.mean/soilData.properties.layers[7].unit_measure.d_factor || "",
            nitrogen: soilData.properties.layers[3].depths[0].values.mean/soilData.properties.layers[3].unit_measure.d_factor || "",
            clay: soilData.properties.layers[2].depths[0].values.mean/soilData.properties.layers[2].unit_measure.d_factor || "",
            silt: soilData.properties.layers[6].depths[0].values.mean/soilData.properties.layers[6].unit_measure.d_factor || "",
            sand: soilData.properties.layers[5].depths[0].values.mean/soilData.properties.layers[5].unit_measure.d_factor || "",
            cec: soilData.properties.layers[1].depths[0].values.mean/soilData.properties.layers[1].unit_measure.d_factor || "",
            bulkDensity: soilData.properties.layers[0].depths[0].values.mean/soilData.properties.layers[0].unit_measure.d_factor || ""
        };
    }catch(err){
        console.error('Problem Occurd while Soil Data fetching', err);
    }
}

export { getWeather, getSoilData };
