import React from 'react';

const WeatherCard = ({ weatherData }) => {
  return (
    <div className="location-card w-80 p-4 bg-opacity-50 bg-gray-300 dark:bg-gray-700 rounded-lg flex flex-col items-center">
      <div className="name flex items-center gap-2 mb-4">
        <p className="text-2xl">{weatherData.name}</p>
        <img src={`https://flagcdn.com/144x108/${weatherData.sys.country.toLowerCase()}.png`} alt="Country Flag" className="w-8 h-8"/>
      </div>
      <p className="text-lg font-medium">{weatherData.weather[0].description}</p>
      <img src={`http://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt="Weather Icon" className="w-20 h-20"/>
      <p className="text-4xl font-bold mt-4">{weatherData.main.temp} °C</p>
      <div className="parameter-container w-full flex justify-between mt-4">
        <div className="parameter flex flex-col items-center">
          <img src="./assets/wind.png" alt="Wind" className="w-12 h-12"/>
          <p className="text-sm font-semibold uppercase">Wind Speed</p>
          <p className="text-sm font-light">{weatherData.wind.speed} m/s</p>
        </div>
        <div className="parameter flex flex-col items-center">
          <img src="./assets/humidity.png" alt="Humidity" className="w-12 h-12"/>
          <p className="text-sm font-semibold uppercase">Humidity</p>
          <p className="text-sm font-light">{weatherData.main.humidity}%</p>
        </div>
        <div className="parameter flex flex-col items-center">
          <img src="./assets/cloud.png" alt="Cloudiness" className="w-12 h-12"/>
          <p className="text-sm font-semibold uppercase">Clouds</p>
          <p className="text-sm font-light">{weatherData.clouds.all}%</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
