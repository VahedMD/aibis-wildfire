import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { icon } from "leaflet";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import {
  bui,
  dailySeverityRating,
  dc,
  dmc,
  ffmc,
  fwi,
  isi,
} from "../../utils/FireIndices";

import positionIcon from "../../media/icons/position.png";

const FWIApp = () => {
  const ICON = icon({
    iconUrl: positionIcon,
    iconSize: [45, 45],
  });
  const position = [51.505, -0.09];

  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const Markers = () => {
    const map = useMapEvents({
      click(e) {
        const [lat, lng] = [e.latlng.lat, e.latlng.lng];
        setSelectedPosition([lat, lng]);

        const currentWeatherFetch = fetch(
          `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_API_KEY}&units=metric`
        )
          .then(async (response) => {
            const weatherReponse = await response.json();
            setCurrentWeather(weatherReponse);
          })
          .catch((err) => console.log(err));
      },
    });
  };

  const ffmcValue = currentWeather
    ? currentWeather.rain
      ? ffmc(
          currentWeather.main.temp,
          currentWeather.rain["1h"],
          currentWeather.wind.speed,
          currentWeather.main.humidity,
          85
        )
      : ffmc(
          currentWeather.main.temp,
          0,
          currentWeather.wind.speed,
          currentWeather.main.humidity,
          85
        )
    : "";

  const dmcValue = currentWeather
    ? currentWeather.rain
      ? dmc(
          currentWeather.main.temp,
          currentWeather.rain["1h"],
          currentWeather.main.humidity,
          new Date().getMonth(),
          selectedPosition[0],
          6
        )
      : dmc(
          currentWeather.main.temp,
          0,
          currentWeather.main.humidity,
          new Date().getMonth(),
          selectedPosition[0],
          6
        )
    : "";

  const dcValue = currentWeather
    ? currentWeather.rain
      ? dc(
          currentWeather.main.temp,
          currentWeather.rain["1h"],
          new Date().getMonth(),
          selectedPosition[0],
          15
        )
      : dc(
          currentWeather.main.temp,
          0,
          new Date().getMonth(),
          selectedPosition[0],
          15
        )
    : "";

  const isiValue = currentWeather
    ? isi(currentWeather.wind.speed, ffmcValue)
    : "";

  const buiValue = bui(dmcValue, dcValue);
  const fwiValue = fwi(isiValue, buiValue);

  return (
    <Wrapper>
      <SidePanel>
        <div className="info">
          <h3>
            Click on the desired point on map and see the corresponding value
          </h3>
        </div>
        <div className="city">
          <input
            value={
              currentWeather &&
              currentWeather.name +
                " " +
                currentWeather.sys.country +
                ", " +
                "SR:" +
                dailySeverityRating(fwiValue)
            }
            type="text"
          />
        </div>
      </SidePanel>
      <Indices>
        <div className="index">
          <p>FFMC:</p>
          <input type="text" value={ffmcValue} />
        </div>
        <div className="index">
          <p>DMC:</p>
          <input type="text" value={dmcValue} />
        </div>
        <div className="index">
          <p>DC:</p>
          <input type="text" value={dcValue} />
        </div>
        <div className="index">
          <p>ISI: </p>
          <input type="text" value={isiValue} />
        </div>
        <div className="index">
          <p>BUI:</p>
          <input type="text" value={buiValue} />
        </div>
        <div className="index">
          <p>FWI:</p>
          <input type="text" value={fwiValue} />
        </div>
      </Indices>
      <MapContainer
        center={selectedPosition}
        zoom={6}
        scrollWheelZoom={false}
        style={{ minHeight: "65vh", minWidth: "90vw" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Markers />
        <Marker icon={ICON} position={selectedPosition} />
      </MapContainer>
    </Wrapper>
  );
};

export default FWIApp;

FWIApp.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const SidePanel = styled.div`
  min-height: 10vh;
  width: 98%;
  background: linear-gradient(45deg, #1497b8 0%, #641e41 100%);
  border-radius: 50px;

  padding-left: 2rem;
  color: #000;

  display: flex;
  justify-content: space-around;
  align-items: center;

  h3 {
    font-size: 1.2rem;
  }

  .city {
    text-align: center;
    color: #000;
    padding: 0 2rem;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.8rem;

    input {
      font-weight: 600;
      padding: 10px;
      border-radius: 20px;
      border: 2px solid rgba(0, 0, 0, 0.8);
      background: transparent;
      color: #ca92f9;
      text-align: center;
    }
  }

  @media screen and (max-width: 1000px) {
    h3 {
      font-size: 1rem;
    }

    .city {
      input {
        font-size: 1rem;
      }
    }
  }

  @media screen and (max-width: 600px) {
    flex-direction: column;
    h3 {
      font-size: 0.8rem;
    }

    .city {
      padding: 0 5px;
      input {
        font-size: 0.8rem;
        padding: 2px;
      }
    }
  }
`;

const Indices = styled.div`
  min-height: 10vh;
  width: 98%;
  background: linear-gradient(45deg, #1497b8 0%, #641e41 100%);
  border-radius: 50px;

  padding-left: 2rem;
  color: #000;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-content: center;

  .index {
    font-size: 1rem;
    text-align: center;
    color: #000;
    padding: 0 0.5rem;
    display: flex;
    align-items: center;
    gap: 10px;

    input {
      font-weight: 600;
      padding: 10px 0;
      border-radius: 20px;
      border: 2px solid rgba(0, 0, 0, 0.8);
      background: transparent;
      color: #ca92f9;
      text-align: center;
    }
  }

  @media screen and (max-width: 1000px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;
