import { useState } from "react";
import styled from "styled-components";
import WeatherMap from "./WeatherMap";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Search from "./search/Search";
import CurrentWeather from "./CurrentWeather";
import Forecast from "./Forecast";

const WeatherPanel = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lng] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherReponse = await response[0].json();
        const forcastReponse = await response[1].json();

        setCurrentWeather({ city: searchData.label, ...weatherReponse });
        setForecast({ city: searchData.label, ...forcastReponse });
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container>
      <div className="info">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
        {forecast && <Forecast data={forecast} />}
      </div>
      <div className="map-layers">
        <WeatherMap center={currentWeather ? currentWeather.coord : [40, 40]} />
      </div>
    </Container>
  );
};

export default WeatherPanel;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  .info {
    width: 40%;
  }
  .map-layers {
    width: 58%;
  }

  @media screen and (max-width: 800px) {
    flex-direction: column;

    .info {
      width: 90%;
    }
    .map-layers {
      width: 90%;
    }
  }

  @media screen and (max-width: 500px) {
    flex-direction: column;

    .info {
      width: 100%;
    }
    .map-layers {
      width: 100%;
    }
  }
`;
