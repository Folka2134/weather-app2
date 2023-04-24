import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import notfound from "./assets/images/404.png";
import clear from "./assets/images/clear.png";
import cloud from "./assets/images/cloud.png";
import mist from "./assets/images/mist.png";
import rain from "./assets/images/rain.png";
import snow from "./assets/images/snow.png";

const App = () => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(false);
  const [description, setDescription] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [image, setImage] = useState(null);
  const [notFound, setNotFound] = useState(null);

  const APIKey = "f6b39355d32df8d5b4bb9916251c1611";

  function handleChange(event) {
    setCity(event.target.value);
  }

  const handleKeypress = (e) => {
    if (e.keyCode === 13) {
      getWeather();
    }
  };

  async function getWeather() {
    const result = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=${APIKey}`
    );
    result.json().then((json) => {
      console.log(json);
      if (json.cod === "404") {
        setNotFound(true);
      } else {
        setDescription(json.weather[0].description);
        setTemperature(json.main.temp);
        setHumidity(json.main.humidity);
        setWind(json.wind.speed);
        setData(true);
        setNotFound(false);

        switch (json.weather[0].main) {
          case "Clear":
            setImage(clear);
            break;

          case "Rain":
            setImage(rain);
            break;

          case "Snow":
            setImage(snow);
            break;

          case "Clouds":
            setImage(cloud);
            break;

          case "Haze":
            setImage(mist);
            break;

          // default:
          //   setImage("");
        }
      }
    });
  }

  return (
    <div className="bg-gray-400 min-h-screen flex flex-col justify-center items-center">
      <div
        // className={`container${isContainerActive ? " right-panel-active" : ""}`}
        className={`container relative w-[400px] bg-white p-4 overflow-hidden rounded-xl ease-out duration-75 ${
          data ? "h-[590px]" : "h-[105px]"
        } ${notFound && "h-[450px]"} `}
      >
        <div className="search-box flex items-center justify-between w-full h-min p-5 bg-white rounded-lg">
          <i className="fa-solid fa-location-dot "></i>
          <input
            className="bg-gray-200 w-[80%] text-lg font-semibold capitalize pl-8 rounded-full"
            type="text"
            placeholder="Enter Your Location"
            onChange={handleChange}
            onKeyDown={handleKeypress}
          />
          <button
            onClick={getWeather}
            className="fa-solid fa-magnifying-glass bg-gray-300 hover:bg-[#06283D] hover:text-white p-2 rounded-full transition-colors ease-linear duration-150"
          ></button>
        </div>

        {notFound ? (
          <div className="not-found flex flex-col items-center w-full text-center mt-12 ">
            <img className=" w-[80%]" src={notfound} alt="404" />
            <p className="text-[#06283D] text-md font-semibold mt-3">
              <p>Oops! Invalid location</p>
            </p>
          </div>
        ) : (
          <div>
            <div className="weather-box flex flex-col items-center text-center">
              <img className="w-[60%] mt-8" src={image} />
              <p className="temperature relative w-full text-[#06283D] text-sm font-bold mt-8 ">
                <span className="text-center w-full text-[1.5rem]">
                  {temperature}°C
                </span>
              </p>
              <p className="description text-[#06283D] text-lg font-semibold capitalize">
                {description}
              </p>
            </div>

            <div
              className={`weather-details flex w-full h-[100px] items-center ${
                data ? "fadeIn" : ""
              }`}
            >
              <div className="humidity flex items-center w-[50%] h-[100px] p-6 justify-start">
                <i className="fa-solid fa-water px-2"></i>
                <div>
                  <span className="text-[#06283D] text-lg font">
                    {humidity}
                  </span>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="wind flex items-center w-[50%] h-[100px] p-6 justify-end">
                <i className="fa-solid fa-wind px-2"></i>
                <div>
                  <span>{wind}</span>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
