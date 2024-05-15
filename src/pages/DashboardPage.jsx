import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../components/Maps/api";
import {
  angstrom,
  bui,
  dc,
  dmc,
  ffmc,
  fmiDangerRating,
  fuelMoistureIndex,
  fwi,
  isi,
} from "../utils/FireIndices";
import styled from "styled-components";
import SideMenu from "../components/SideMenu";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import TabsPanel from "../components/MapTabs/TabPanel";
import Tab from "../components/MapTabs/Tab";
import { icon } from "leaflet";

const DashboardPage = () => {
  const [initialPosition, setInitialPosition] = useState([0, 0]);
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const ICON = icon({
    iconUrl: "../media/icons/position.png",
    iconSize: [45, 45],
  });
  const position = [51.505, -0.09];

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  }, []);

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

  const AngValue = currentWeather
    ? angstrom(currentWeather.main.temp, currentWeather.main.humidity)
    : "";

  const FMIValue = currentWeather
    ? fuelMoistureIndex(currentWeather.main.temp, currentWeather.main.humidity)
    : "";
  const FValue = currentWeather
    ? fmiDangerRating(
        currentWeather.main.temp,
        currentWeather.main.humidity,
        currentWeather.wind.speed
      )
    : "";

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

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  useEffect(() => {
    const usr = JSON.parse(localStorage.getItem("user"));
    setUser(usr);
    return user; // unsubscribe on unmount
  }, []);

  console.log("user: ", user);

  return (
    <Wrapper>
      <SideMenu username={user && user.displayName}>
        <>
          <SidePanel>
            <div className="info">
              <div>
                <h3>Click on the desired point</h3>
              </div>
              <div className="city">
                <input
                  value={
                    currentWeather &&
                    currentWeather.name + " " + currentWeather.sys.country
                  }
                  type="text"
                />
              </div>
            </div>
            <div className="values">
              <p>Angstroem Index: {AngValue}</p>
              <p>Fuel Moisture Index: {FMIValue}</p>
              <p>Forest fire danger rating index: {FValue} </p>
              <p>fine fuel moisture code: {ffmcValue} </p>
              <p>Duff moisture code: {dmcValue} </p>
              <p>drought code: {dcValue} </p>
              <p>Initialize spread index: {isiValue} </p>
              <p>Build-up index: {buiValue} </p>
              <p>Fire weather index: {fwiValue} </p>
            </div>
          </SidePanel>
          <TabsPanel>
            <Tab title="Fire Danger Indices">
              <MapContainer
                center={position}
                zoom={6}
                scrollWheelZoom={false}
                style={{ minHeight: "65vh", minWidth: "60vw" }}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                <Markers />
                <Marker icon={ICON} position={selectedPosition} />
              </MapContainer>
            </Tab>
            <Tab title="Statistics"></Tab>
            <Tab title="Country Profile"></Tab>
            <Tab title="AI Based Risk Assessment"></Tab>
          </TabsPanel>
        </>
      </SideMenu>
    </Wrapper>
  );
};

export default DashboardPage;

const Wrapper = styled.div`
  min-height: 100dvh;
  margin-top: 5rem;

  .title {
    text-align: center;
    margin-bottom: 1rem;
  }

  .tabs {
    list-style: none;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    border-bottom: none;
    color: #000;
  }

  .tabs .tab {
    margin: 0px 0.1em;
    padding: 1em;
    cursor: pointer;
    transform: translateY(1px);
    border-radius: 1rem;
    transition: background-color 0.2s ease-in-out;
    border: 1px solid transparent;
    text-align: center;
    background: rgba(255, 255, 255, 0.5);
    font-size: 1rem;
    font-weight: 600;
    margin-top: 2rem;
    transition: all 0.5s ease-in-out;
    font-family: "Righteous", sans-serif;
  }

  .tabs .tab:hover {
    background-color: #ececec;
    transform: scale(1.2);
  }

  .tabs .tab.selected {
    border-radius: 1rem;
    border-width: 1px;
    border-color: #ccc #ccc #fff #ccc;
    border-style: solid;
    color: #bb3357;
  }

  .tabs .tab.selected:hover {
    background: none;
  }

  .tab__content {
    padding: 1em 2em;
    color: #525151;
    font-size: 20px;
  }

  .tab__icon {
    padding-left: 0.5em;
  }
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
  flex-direction: column;
  align-items: center;

  .info {
    display: flex;
    justify-content: space-around;
    flex-direction: row;
  }

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
