import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/solid';
import './index.css';
import Weather from './components/Weather';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'bg-colorDark1 text-colorLight2' : 'bg-colorLight2 text-colorDark1'}`}>
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl">Weather App</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-500"
        >
          {darkMode ? <SunIcon className="h-6 w-6 text-yellow-500" /> : <MoonIcon className="h-6 w-6 text-gray-800" />}
        </button>
      </header>
      <div className="wrapper flex flex-col items-center justify-center transition-colors duration-500">
        <Weather />
      </div>
    </div>
  );
}

export default App;
