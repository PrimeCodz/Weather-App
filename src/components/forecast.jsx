import React, { useState } from 'react';
import axios from 'axios';
import { API_KEY, BASE_URL } from './apikey';


const Forecast = () => {
    const [query, setQuery] = useState("");
    const [error, setError] = useState("");
    const [weather, setWeather] = useState(null);
    const [precipitation, setPrecipitation] = useState(0);

    const search = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}weather?q=${query}&units=metric&appid=${API_KEY}`
            );
            const precipitationValue = response.data.rain ? response.data.rain['1h'] : (response.data.snow ? response.data.snow['1h'] : 0);
            setPrecipitation(precipitationValue);
            setWeather(response.data);
            setQuery("");
            setError("")
        } catch (error) {
            console.log(error);
            setWeather(null);
            setQuery("");
            setError({ message: "Not Found", query: query });
        }
    };

    //useEffect(() => {
    //    search("Delhi");
    //}, []);


    return (
        <>
            <div className="w-full md:w-2/3 lg:w-1/2 mx-auto p-2 bg-transparent backdrop-filter backdrop-blur-md bg-opacity-20 rounded-lg shadow-md">
                <div className="flex items-center justify-center mb-2">
                    <input
                        type='text'
                        className="flex-grow p-2 rounded-lg bg-transparent text-white border-b text-sm search-bar focus:outline-none focus:border-b focus:border-slate-400 focus:transition-all"
                        placeholder='Search for a city'
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                    />
                    <button className="p-2 rounded-full hover:shadow-lg hover:bg-slate-600 focus:outline-none" onClick={search}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                            <path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M32.4,26.2l8.1,8.1c1.7,1.7,1.7,4.5,0,6.2l0,0c-1.7,1.7-4.5,1.7-6.2,0L30,36.2"></path><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M8,25c-1.8-4.7-0.8-10.2,3-14c3.8-3.8,9.5-4.8,14.2-2.9"></path><path fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M31.3,13.1c3.4,5.1,2.8,12.1-1.7,16.6c-4.9,4.9-12.6,5.1-17.7,0.8"></path>
                        </svg>
                    </button>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {weather && (
                    <>
                        <div className="flex justify-between items-center">
                            <h1 className="text-2xl text-white">{weather.name}, {weather.sys.country}</h1>
                            <img className="w-16 h-16" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        </div>
                        <div className="flex items-center justify-center flex-col text-white">
                            <p className="text-4xl font-medium">{Math.round(weather.main.temp)}°C</p>
                            <p className="text-xl uppercase">{weather.weather[0].description}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2 text-white px-4 py-4">
                            <div className="flex justify-between items-center">
                                <p>Humidity</p>
                                <span>{(weather.main.humidity)}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Precipitation</p>
                                <span>{precipitation} mm</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Visibility</p>
                                <span>{(weather.visibility)} mi</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Wind Speed</p>
                                <span>{(weather.wind.speed)} Km/h</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Feels Like</p>
                                <span>{Math.round(weather.main.feels_like)}°C</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <p>Max Temp</p>
                                <span>{Math.round(weather.main.temp_max)}°C</span>
                            </div>
                        </div>
                    </>
                )}
            </div >
        </>
    );
};

export default Forecast;