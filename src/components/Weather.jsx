import React, { useEffect, useRef, useState } from "react";
import Cloud from "../assets/image/cloud.png";
import Wind from "../assets/image/wind.png";
import clear from "../assets/image/clear.png";
import rain from "../assets/image/rain.png";
import snow from "../assets/image/snow.png";
import drizzle from "../assets/image/drizzle.png";
import Humidity from "../assets/image/humidity.png";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef();
  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": Cloud,
    "02n": Cloud,
    "03d": Cloud,
    "03n": Cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "010d": rain,
    "010n": rain,
    "013d": snow,
    "013n": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please Enter City Name");
      return;
    }
    try {
      const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const res = await fetch(URL);
      const data = await res.json();

      if (!res.ok) {
        setErrorMessage("Incorrect Data Added");
        setWeatherData(null);
        return;
      }

      const icons = allIcons[data.weather[0].icon] || clear;
      setWeatherData({
        Humidity: data.main.humidity,
        Temp: Math.floor(data.main.temp),
        Wind: data.wind.speed,
        City: data.name,
        icon: icons,
      });
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Error fetching data");
      setWeatherData(null);
    }
  };

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-courier" style={{ backgroundColor: "#1e3a8a" }}>
      <div className="w-full max-w-lg bg-gradient-to-r to-cyan-500 from-blue-500 shadow-lg rounded-3xl px-8 py-6 relative">
        <div className="flex items-start">
          <div className="flex-1">
            <h3 className="text-white text-3xl font-bold">
              Weather Application
            </h3>
            <p className="text-white text-1xl mt-1">
              Will Get Full Information Of Searched City
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-6">
          <div className="flex flex-1 px-4 py-2.5 rounded-lg border border-gray-300 focus-within:border-blue-600 min-w-[220px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-white mr-4"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
            <input
              type="text"
              ref={inputRef}
              placeholder="Search by city name"
              className="w-full outline-none bg-transparent text-white text-sm border-white hover:border-white placeholder-white"
            />
          </div>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg text-white text-sm border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
            onClick={() => search(inputRef.current.value)}
          >
            Search
          </button>
        </div>
        {errorMessage && <p className="text-white mt-2">{errorMessage}</p>}

        {weatherData ? (
          <div className="mt-6 divide-y">
            <div className="flex flex-wrap items-center gap-4 py-3">
              <img src={weatherData.icon} className="w-20 h-16" />
              <div>
                <p className="text-white font-bold text-4xl">
                  {weatherData.Temp}°C
                </p>
              </div>
              <p className="text-3xl text-white mt-0.5 ml-[120px]">
                {weatherData.City}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 py-3">
              <img src={Humidity} className="w-14 h-10 ml-2" />
              <div>
                <p className="text-white font-bold text-4xl ml-5">
                  {weatherData.Humidity}%
                </p>
              </div>
              <p className="text-3xl text-white mt-0.5 ml-[120px]">Humidity</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 py-3">
              <img src={Wind} className="w-14 h-12 ml-2" />
              <div>
                <p className="text-white font-bold text-[25px] ml-5">
                  {weatherData.Wind} km/h
                </p>
              </div>
              <p className="text-3xl text-white mt-0.5 ml-[10px]">Wind Speed</p>
            </div>
          </div>
        ) : (
          !errorMessage && <h1 className="text-white mt-8">No Data Found</h1>
        )}
      </div>
    </div>
  );
}

export default Weather;

