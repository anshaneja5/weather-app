import { useState, useEffect } from 'react';
import WeatherCard from './WeatherCard';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const Weather = () => {
  const [tab, setTab] = useState('userWeather');
  const [userWeatherData, setUserWeatherData] = useState(null);
  const [searchWeatherDataList, setSearchWeatherDataList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [locationGranted, setLocationGranted] = useState(false);

  useEffect(() => {
    if (tab === 'userWeather') {
      const localCoordinates = sessionStorage.getItem("user-coordinates");
      if (localCoordinates) {
        setLocationGranted(true);
        fetchUserWeatherInfo(JSON.parse(localCoordinates));
      } else {
        getLocation();
      }
    }
  }, [tab]);

  const fetchWeather = async (url, setData) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(prev => [...prev, data]);
    } catch (error) {
      console.error("Failed to fetch weather data", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserWeatherInfo = async (coordinates) => {
    const { lat, lon } = coordinates;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUserWeatherData(data);
    } catch (error) {
      console.error("Failed to fetch user weather data", error);
    } finally {
      setLoading(false);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinates = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        sessionStorage.setItem("user-coordinates", JSON.stringify(coordinates));
        setLocationGranted(true);
        fetchUserWeatherInfo(coordinates);
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const cities = e.target.elements.city.value.split(',');
    setSearchWeatherDataList([]); // Reset search weather data list
    cities.forEach(city => {
      if (city.trim()) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`;
        fetchWeather(url, setSearchWeatherDataList);
      }
    });
    e.target.elements.city.value = ''; // Clear input field
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center">
      <div className="tab-container w-11/12 max-w-md mx-auto mt-16 flex justify-between">
        <button
          onClick={() => setTab('userWeather')}
          className={`tab cursor-pointer text-sm tracking-widest py-2 px-3 rounded ${tab === 'userWeather' && 'bg-opacity-50 bg-gray-300 dark:bg-gray-700'}`}
        >
          Your Weather
        </button>
        <button
          onClick={() => setTab('searchWeather')}
          className={`tab cursor-pointer text-sm tracking-widest py-2 px-3 rounded ${tab === 'searchWeather' && 'bg-opacity-50 bg-gray-300 dark:bg-gray-700'}`}
        >
          Search Weather
        </button>
      </div>
      {tab === 'userWeather' ? (
        !locationGranted ? (
          <div className="grant-location-container mt-4 flex flex-col items-center">
            <img src="./assets/location.png" alt="Location" className="w-20 h-20 mb-8"/>
            <p className="text-lg font-bold">Grant Location Access</p>
            <p className="text-sm font-medium mt-3 mb-7 tracking-wide">Allow Access to get weather Information</p>
            <button onClick={getLocation} className="btn text-sm uppercase rounded bg-colorDark2 text-white py-2 px-8 mb-2 cursor-pointer">Grant Access</button>
          </div>
        ) : (
          <div className="mt-8">
            {loading ? (
              <div className="loading-container flex flex-col items-center mt-4">
                <img src="./assets/loading.gif" alt="Loading" className="w-16 h-16"/>
                <p className="text-sm font-medium uppercase">Loading</p>
              </div>
            ) : (
              userWeatherData && <WeatherCard weatherData={userWeatherData} />
            )}
          </div>
        )
      ) : (
        <form onSubmit={handleSearch} className="form-container mt-4 flex space-x-2">
          <input type="text" name="city" placeholder="Enter cities, comma separated..." className="input px-4 py-2 border rounded-lg text-black"/>
          <button type="submit" className="btn text-sm uppercase rounded bg-colorDark2 text-white py-2 px-4 cursor-pointer">Search</button>
        </form>
      )}
      {tab === 'searchWeather' && (
        <div className="mt-8">
          {loading ? (
            <div className="loading-container flex flex-col items-center mt-4">
              <img src="./assets/loading.gif" alt="Loading" className="w-16 h-16"/>
              <p className="text-sm font-medium uppercase">Loading</p>
            </div>
          ) : (
            <div className="user-info-container mt-4 flex flex-wrap justify-center gap-4">
              {searchWeatherDataList.map((weatherData, index) => (
                <WeatherCard key={index} weatherData={weatherData} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
