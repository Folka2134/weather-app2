import React, { useEffect, useState } from "react";
import axios from "axios";

import "./App.css";
import notfound from "./assets/images/404.png";

const App = () => {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [description, setDescription] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);

  const APIKey = "728b0ee6df5687559812bd3169ad77b7";

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
      `http://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=f6b39355d32df8d5b4bb9916251c1611`
    );
    result.json().then((json) => {
      console.log(json);
      if (json.cod === "404") {
        console.log(json.message);
      } else {
        setDescription(json.weather.description);
        setTemperature(json.main.temp);
        setHumidity(json.main.humidity);
        setWind(json.wind.speed);
      }
    });
  }

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <div className="bg-gray-400 min-h-screen flex flex-col justify-center items-center">
      <div className="container relative w-[400px] h-[105px] bg-white p-4 overflow-hidden rounded-xl ease-out duration-75">
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

        <div className="hidden not-found w-full text-center mt-12 scale-0 opacity-0">
          <img className="w-[70%]" src={notfound} alt="404" />
          <p className="text-[#06283D] text-sm font-semibold mt-3"></p>
        </div>

        <div className="weather-box text-center">
          <img className="w-[60%] mt-8" src="" />
          <p className="temperature relative text-[#06283D] text-sm font-bold mt-8 ml-4">
            <span className="absolute ml-2 text-sm"></span>
          </p>
          <p className="description text-[#06283D] text-lg font-semibold capitalize"></p>
        </div>

        <div className="weather-details flex w-full h-[100px] items-center ">
          <div className="humidity flex items-center w-[50%] h-[100px] p-6 justify-start">
            <i className="fa-solid fa-water px-2"></i>
            <div>
              <span className="text-[#06283D] text-lg font">
                {data && data.main.humidity}
              </span>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind flex items-center w-[50%] h-[100px] p-6 justify-end">
            <i className="fa-solid fa-wind px-2"></i>
            <div>
              <span>{data && data.wind.speed}</span>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
