import styled from "styled-components";
import d1 from "../../media/icons/01d.png";
import n1 from "../../media/icons/01n.png";
import d2 from "../../media/icons/02d.png";
import n2 from "../../media/icons/02n.png";
import d3 from "../../media/icons/03d.png";
import n3 from "../../media/icons/03n.png";
import d4 from "../../media/icons/04d.png";
import n4 from "../../media/icons/04n.png";
import d9 from "../../media/icons/09d.png";
import n9 from "../../media/icons/09n.png";
import d10 from "../../media/icons/10d.png";
import n10 from "../../media/icons/10n.png";
import d11 from "../../media/icons/11d.png";
import n11 from "../../media/icons/11n.png";
import d13 from "../../media/icons/13d.png";
import n13 from "../../media/icons/13n.png";
import d50 from "../../media/icons/50d.png";
import n50 from "../../media/icons/50n.png";
const CurrentWeather = ({ data }) => {
  return (
    <Wrapper>
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="description">{data.weather[0].description}</p>
        </div>
        <img
          src={
            data.weather[0].icon === "01d"
              ? d1
              : data.weather[0].icon === "01n"
              ? n1
              : data.weather[0].icon === "02d"
              ? d2
              : data.weather[0].icon === "02n"
              ? n2
              : data.weather[0].icon === "03d"
              ? d3
              : data.weather[0].icon === "03n"
              ? n3
              : data.weather[0].icon === "04d"
              ? d4
              : data.weather[0].icon === "04n"
              ? n4
              : data.weather[0].icon === "09d"
              ? d9
              : data.weather[0].icon === "09n"
              ? n9
              : data.weather[0].icon === "10d"
              ? d10
              : data.weather[0].icon === "10n"
              ? n10
              : data.weather[0].icon === "11d"
              ? d11
              : data.weather[0].icon === "11n"
              ? n11
              : data.weather[0].icon === "13d"
              ? d13
              : data.weather[0].icon === "13n"
              ? n13
              : data.weather[0].icon === "50d"
              ? d50
              : data.weather[0].icon === "50n"
              ? n50
              : null
          }
          alt="weather"
          className="icon"
        />
      </div>

      <div className="bottom">
        <p className="temp">{Math.round(data.main.temp)}°C</p>
        <div className="details">
          <div className="row">
            <span className="label">Details</span>
          </div>
          <div className="row">
            <span className="label">Feels Like</span>
            <span className="value">{Math.round(data.main.feels_like)}°C</span>
          </div>
          <div className="row">
            <span className="label">Wind</span>
            <span className="value">
              {Math.round(data.wind.speed * 3.6)} km/h
            </span>
          </div>
          <div className="row">
            <span className="label">Humidity</span>
            <span className="value">{data.main.humidity}%</span>
          </div>
          <div className="row">
            <span className="label">Pressure</span>
            <span className="value">{data.main.pressure} hPa</span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default CurrentWeather;

const Wrapper = styled.div`
  width: 90%;
  height: 25%;
  border-radius: 0.5rem;
  box-shadow: 10px -2px 20px 2px rgb(0 0 0 / 30%);
  color: #d6d3d1;
  background: #333;
  margin: 20px auto 0 auto;
  padding: 0 20px 20px 20px;

  .top,
  .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .city {
    font-weight: 600;
    font-size: 1rem;
    line-height: 1.5;
    margin: 0;
    letter-spacing: 1px;
    margin-top: 1rem;
  }

  .description {
    font-weight: 400;
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0;
  }

  .icon {
    width: 6rem;
  }

  .temp {
    font-weight: 600;
    font-size: 3rem;
    width: auto;
    letter-spacing: 1px;
    margin: 10px 0;
  }
  .details {
    width: 100%;
    padding: 10px;
  }

  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px;
  }

  .label {
    text-align: left;
    font-weight: 400;
    font-size: 0.8rem;
  }

  .value {
    text-align: right;
    font-weight: 600;
    font-size: 0.8rem;
  }
`;
