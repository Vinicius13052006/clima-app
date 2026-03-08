import { useState } from "react";
import axios from "axios";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const apiKey = "04a8c23cc605f09cfcd3bb0c43664f25";

  const searchWeather = async () => {
    if (!city) return;

    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );

      setWeather(res.data);
    } catch {
      alert("Cidade não encontrada");
    }
  };

  return (
    <div className="container">

      <div className="card">

        <h1>🌤️ Weather App</h1>

        <div className="search">

          <input
            type="text"
            placeholder="Digite uma cidade..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button onClick={searchWeather}>
            Buscar
          </button>

        </div>

        {weather && (
          <div className="weather">

            <h2>{weather.name}</h2>

            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icone"
            />

            <p className="temp">
              {Math.round(weather.main.temp)}°C
            </p>

            <p className="desc">
              {weather.weather[0].description}
            </p>

            <div className="details">

              <div>
                💧<span>{weather.main.humidity}%</span>
                <p>Umidade</p>
              </div>

              <div>
                🌬️<span>{weather.wind.speed} km/h</span>
                <p>Vento</p>
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}