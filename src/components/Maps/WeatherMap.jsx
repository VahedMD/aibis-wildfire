import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { icon } from "leaflet";
import { useState } from "react";
import styled from "styled-components";
import TempLegend from "./legends/TempLegend";
import PercipitationLegend from "./legends/PercipitationLegend";
import WindLegend from "./legends/WindLegend";
import PressureLegend from "./legends/PressureLegend";
import positionIcon from "../../media/icons/position.png";

const WeatherMap = ({ center, zoom }) => {
  const ICON = icon({
    iconUrl: positionIcon,
    iconSize: [45, 45],
  });

  const [selectedBase, setSelectedBase] = useState("option1");
  const [selectedLayer, setSelectedLayer] = useState(null);

  const handleSelectBase = (value) => {
    setSelectedBase(value);
  };

  const handleSelectLayer = (value) => {
    setSelectedLayer(value);
  };

  return (
    <>
      <Wrapper>
        <div className="base">
          <input
            type="radio"
            id="option1"
            value="option1"
            checked={selectedBase === "option1"}
            onChange={() => handleSelectBase("option1")}
          />
          <label htmlFor="option1">Topographic Map</label>
          <input
            type="radio"
            id="option2"
            value="option2"
            checked={selectedBase === "option2"}
            onChange={() => handleSelectBase("option2")}
          />
          <label htmlFor="option2">Street Map</label>
        </div>
        <div className="layer">
          <input
            type="radio"
            id="option1"
            value="option1"
            checked={selectedLayer === "option1"}
            onChange={() => handleSelectLayer("option1")}
          />
          <label htmlFor="option1">Temperature</label>
          <input
            type="radio"
            id="option2"
            value="option2"
            checked={selectedLayer === "option2"}
            onChange={() => handleSelectLayer("option2")}
          />
          <label htmlFor="option2">Precipitation</label>
          <input
            type="radio"
            id="option3"
            value="option3"
            checked={selectedLayer === "option3"}
            onChange={() => handleSelectLayer("option3")}
          />
          <label htmlFor="option3">Clouds</label>
          <input
            type="radio"
            id="option4"
            value="option4"
            checked={selectedLayer === "option4"}
            onChange={() => handleSelectLayer("option4")}
          />
          <label htmlFor="option4">Wind speed</label>
          <input
            type="radio"
            id="option5"
            value="option5"
            checked={selectedLayer === "option5"}
            onChange={() => handleSelectLayer("option5")}
          />
          <label htmlFor="option5">Sea level pressure</label>
          <input
            type="radio"
            id="option6"
            value="option6"
            checked={selectedLayer === "option6"}
            onChange={() => handleSelectLayer("option6")}
          />
          <label htmlFor="option6">None</label>
        </div>
      </Wrapper>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ minHeight: "85vh", minWidth: "55vw" }}
      >
        {selectedBase === "option1" ? (
          <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
        ) : (
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        )}

        {selectedLayer === "option1" ? (
          <TileLayer url="https://{s}.tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=e33109597f29a0008b6e07d6090da32c" />
        ) : selectedLayer === "option2" ? (
          <TileLayer url="https://{s}.tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=e33109597f29a0008b6e07d6090da32c" />
        ) : selectedLayer === "option3" ? (
          <TileLayer url="https://{s}.tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=e33109597f29a0008b6e07d6090da32c" />
        ) : selectedLayer === "option4" ? (
          <TileLayer url="https://{s}.tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=e33109597f29a0008b6e07d6090da32c" />
        ) : selectedLayer === "option5" ? (
          <TileLayer url="https://{s}.tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=e33109597f29a0008b6e07d6090da32c" />
        ) : null}

        <Marker position={center} icon={ICON} />
      </MapContainer>
      {selectedLayer === "option1" ? (
        <TempLegend />
      ) : selectedLayer === "option2" ? (
        <PercipitationLegend />
      ) : selectedLayer === "option4" ? (
        <WindLegend />
      ) : selectedLayer === "option5" ? (
        <PressureLegend />
      ) : null}
    </>
  );
};

export default WeatherMap;

WeatherMap.defaultProps = {
  center: {
    lat: 42.3265,
    lng: -122.8756,
  },
  zoom: 6,
};

const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.5);
  color: wheat;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 0.8rem;
  box-shadow: 30px -20px 30px #57534e;
  border-radius: 15px 15px 0px 0px;

  .base {
    background: #ffedd5;
    justify-content: left;
    padding: 5px;
    border-radius: 5px;
    color: #5b21b6;
  }

  .base label {
    margin-right: 10px;
  }

  .layer {
    justify-content: space-between;
    padding: 5px;
    background: #b45309;
    color: #fed7aa;
    border-radius: 5px;
  }

  .layer label {
    margin-right: 10px;
  }

  @media screen and (max-width: 1650px) {
    .base {
      display: grid;
      grid-template-columns: 25px auto;
    }

    .layer {
      display: grid;
      grid-template-columns: repeat(3, 25px auto);
    }
  }

  @media screen and (max-width: 1000px) {
    flex-direction: column;
    .base {
      display: grid;
      grid-template-columns: 25px auto;
    }

    .layer {
      display: grid;
      grid-template-columns: repeat(2, 25px auto);
    }
  }
`;
