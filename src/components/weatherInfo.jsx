import React from 'react';
import { WeatherSvg } from 'weather-icons-animated';

const defaults = {
    height: 100,
    width: 100,
    animate: "true"
};

const WeatherInfo = (props) => {
    console.log("Received Props:", props)
    let state;
    switch (props.weatherName) {
        case "Haze":
        case "Hazy":
        case "Light Haze":
            state = 'partlycloudy';
            break;
        case "Clouds":
            state = 'cloudy';
            break;
        case "Sunny":
        case "Clear":
            state = 'sunny';
            break;
        case "Rain":
            state = 'rainy';
            break;
        case "Snow":
            state = 'snowy';
            break;
        case "Thunderstorm":
            state = 'lightning-rainy';
            break;
        case "Dust":
            state = 'windy';
            break;
        case "Fog":
            state = 'fog';
            break;
        case "Smoke":
            state = 'fog';
            break;
        case "Tornado":
            state = 'windy-variant';
            break;
        case "Hail":
            state = 'hail';
            break;
        default:
            console.warn(`Unhandled weather type: ${props.weatherName}`);
            state = 'cloudy';

    }
    console.log("Selected weather state:", state);
    return (
        <>
            <div className="bg-[rgba(0,0,0,0.66)] w-full rounded-lg overflow-hidden">
                <div className="container p-4 md:p-6">
                    <div className="flex flex-col items-center space-y-4 md:space-y-0">
                        <div className="flex flex-col justify-center items-center">
                            <WeatherSvg state={state} height={defaults.height} width={defaults.width} animate={defaults.animate} />
                            <h1 className="text-white text-3xl mt-2" aria-live="polite">{props.weatherName || 'Loading....'}</h1>
                        </div>

                        <div className="grid grid-cols-1 w-full gap-2 px-4 text-white">
                            <div className="flex justify-between border-b border-white py-2">
                                <h1>Humidity</h1>
                                <h1>{props.humidity}%</h1>
                            </div>
                            <div className="flex justify-between border-b border-white py-2">
                                <h1>Visibility</h1>
                                <h1>{props.visibility}mi</h1>
                            </div>
                            <div className="flex justify-between border-b border-white py-2">
                                <h1>Wind Speed</h1>
                                <h1>{props.windSpeed}Km/h</h1>
                            </div>
                            <div className="flex justify-between border-b border-white py-2">
                                <h1>Feels Like</h1>
                                <h1>{props.feelsLike}°C</h1>
                            </div>
                            <div className="flex justify-between ">
                                <h1>Max Temp</h1>
                                <h1>{props.maxTemp}°C</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
};

WeatherInfo.defaultProps = {
    weatherName: 'Unknown'
};

export default WeatherInfo;