import React, { useState, useEffect } from 'react';
import woodjpg from './assets/wood.jpg';
import Clock from './components/clock';
import { API_KEY, BASE_URL } from './components/apikey';
import WeatherInfo from './components/weatherInfo';
import loader from './assets/WeatherIcon.gif';
import Forecast from './components/forecast';
import Footer from './components/footer';

const App = () => {
  const [weatherData, setWeatherData] = useState({
    latitude: null,
    longitude: null,
    temp: null,
    locationName: null,
    country: null,
    humidity: null,
    visibility: null,
    windSpeed: null,
    feelsLike: null,
    maxTemp: null,
    precipitation: null,
    weatherName: null
  });

  useEffect(() => {
    const getPositions = () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      });
    };

    const getWeather = async (latitude, longitude) => {
      try {
        const response = await fetch(
          `${BASE_URL}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();
        console.log(data);
        setWeatherData({
          temp: Math.round(data.main.temp),
          locationName: data.name,
          country: data.sys.country,
          humidity: data.main.humidity,
          visibility: data.visibility,
          windSpeed: data.wind.speed,
          feelsLike: Math.round(data.main.feels_like),
          maxTemp: Math.round(data.main.temp_max),
          weatherName: data.weather[0].main
        });
      }
      catch (error) {
        console.error("Error Fetching Weather Data:", error);
      };
    };

    getPositions()
      .then((position) => {
        getWeather(position.coords.latitude, position.coords.longitude)
        console.log(position.coords.latitude, position.coords.longitude)
      });
  }, []);

  if(weatherData.temp){
  return (
    <>
      <div className="w-full min-h-screen transition-all duration-200 bg-[url('./assets/thunder.jpg')] bg-center bg-no-repeat bg-cover bg-fixed overflow-x-hidden">
        <section className="container px-4 mx-auto md:px-10 mt-10 mb-10 py-8 md:py-16">
          <div className="flex flex-col md:items-center justify-center gap-4 md:gap-1 md:flex-row">
            <div className="w-full lg:w-2/5 bg-black bg-opacity-50 rounded-lg shadow-xl overflow-hidden">
              <div className="relative rounded-lg">
                <img src={woodjpg} className="w-full h-96 md:h-[25rem] object-cover rounded-md" />
                <div className="absolute top-0 left-0 p-4">
                  <h1 className="text-white m-0 text-3xl md:text-5xl">{weatherData.locationName || 'Loading...'}</h1>
                  <p className="text-white text-lg md:text-2xl">{(weatherData.country)}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 gap-1 flex justify-between items-end p-4">
                  <div className="">
                    <h1 className="text-white m-0"><Clock /></h1>
                  </div>

                  <div className="text-white">
                    <h1 className="md:text-5xl text-3xl">{weatherData.temp !== null ? `${weatherData.temp}°C` : 'Loading...'}</h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-2/5">

              <WeatherInfo
                humidity={weatherData.humidity}
                visibility={weatherData.visibility}
                windSpeed={weatherData.windSpeed}
                feelsLike={weatherData.feelsLike}
                maxTemp={weatherData.maxTemp}
                weatherName={weatherData.weatherName}
              />
            </div>
          </div>
        </section>

        <section className="my-5 mx-4">
            <Forecast />
        </section>

        <section className="my-10 mx-4">
          <Footer />
        </section>
      </div>
    </>
  )}
  else{
    return (
      <>
        <div className="w-full bg-[url('./assets/thunder.jpg')] h-[100vh] bg-center bg-no-repeat bg-cover bg-fixed overflow-hidden">
          <div className="container w-full md:w-2/5 mt-40 bg-transparent backdrop-filter backdrop-blur-sm rounded-lg shadow-md flex flex-col justify-center items-center m-auto px-4">
            <img src={loader} className="w-1/2 image" />
            <h3 className="text-white text-lg md:text-2xl font-medium px-4">
              Detecting your location
            </h3>
            <h1 className="text-white text-md mt-1 w-full px-4 pb-2">
              Your current location wil be displayed on the App & used
              for calculating Real time weather.
            </h1>
            </div>
          </div>
      </>
    )
  }
}

export default App;
