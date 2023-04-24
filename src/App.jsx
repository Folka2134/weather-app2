import React, { useEffect, useState } from "react";
import axios from "axios";

import notfound from "./assets/images/404.png";

const App = () => {
  const [city, setCity] = useState("Brighton");
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  const APIKey = "728b0ee6df5687559812bd3169ad77b7";

  useEffect(() => {
    getWeather();
  }, []);

  async function getWeather() {
    await axios(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},uk&APPID=f6b39355d32df8d5b4bb9916251c1611`
    )
      .then((response) => {
        setData(response.data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching");
      })
      .finally(() => {
        setLoading(false);
      });
  }
  function handleChange(event) {
    setCity(event.target.value);
  }

  const handleKeypress = (e) => {
    // it triggers by pressing the enter key
    if (e.keyCode === 13) {
      getWeather();
    }
  };

  return (
    <div className="bg-gray-400 min-h-screen flex flex-col justify-center items-center">
      <div className="relative w-[400px] h-[105px] bg-white p-4 overflow-hidden rounded-xl ease-out duration-75">
        <div className="search-box flex items-center justify-between w-full h-min bg-white p-4 rounded-lg">
          <i className="fa-solid fa-location-dot "></i>
          <input
            className="bg-gray-200 w-[80%] text-lg font-semibold uppercase pl-8 rounded-full"
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

        <div className="not-found">
          <img src={notfound} alt="404" />
        </div>

        <div className="weather-box text-center">
          <img className="w-[60%] mt-8" src="" />
          <p className="temperature relative text-[#06283D] text-sm font-bold mt-8 ml-4">
            <span className="absolute ml-2 text-sm"></span>
          </p>
          <p className="description text-[#06283D] text-lg font-semibold capitalize"></p>
        </div>

        <div className="weather-details flex w-full justify-between mt-8  ">
          <div className="humidity flex items-center w-[50%] h-[100px] p-6 justify-start">
            <i className="fa-solid fa-water px-2"></i>
            <div>
              <span className="text-[#06283D] text-lg font"></span>
              <p>Humidity</p>
            </div>
          </div>
          <div className="wind flex items-center w-[50%] h-[100px] p-6 justify-end">
            <i className="fa-solid fa-wind px-2"></i>
            <div>
              <span></span>
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
