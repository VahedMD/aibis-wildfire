import styled from "styled-components";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";

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

const WEEK_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const Forecast = ({ data }) => {
  const dayInAWeek = new Date().getDay();
  const forcastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );
  return (
    <Wrapper>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={
                      item.weather[0].icon === "01d"
                        ? d1
                        : item.weather[0].icon === "01n"
                        ? n1
                        : item.weather[0].icon === "02d"
                        ? d2
                        : item.weather[0].icon === "02n"
                        ? n2
                        : item.weather[0].icon === "03d"
                        ? d3
                        : item.weather[0].icon === "03n"
                        ? n3
                        : item.weather[0].icon === "04d"
                        ? d4
                        : item.weather[0].icon === "04n"
                        ? n4
                        : item.weather[0].icon === "09d"
                        ? d9
                        : item.weather[0].icon === "09n"
                        ? n9
                        : item.weather[0].icon === "10d"
                        ? d10
                        : item.weather[0].icon === "10n"
                        ? n10
                        : item.weather[0].icon === "11d"
                        ? d11
                        : item.weather[0].icon === "11n"
                        ? n11
                        : item.weather[0].icon === "13d"
                        ? d13
                        : item.weather[0].icon === "13n"
                        ? n13
                        : item.weather[0].icon === "50d"
                        ? d50
                        : item.weather[0].icon === "50n"
                        ? n50
                        : null
                    }
                    alt="weather"
                    className="icon-small"
                  />
                  <label className="day">{forcastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(item.main.temp_min)}°C /{" "}
                    {Math.round(item.main.temp_max)}°C
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure}hPa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind Speed</label>
                  <label>{Math.round(item.wind.speed * 3.6)} km/h</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea Level</label>
                  <label>{item.main.sea_level} m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels Like</label>
                  <label>{Math.round(item.main.feels_like)}°C</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Wrapper>
  );
};

export default Forecast;

const Wrapper = styled.div`
  .title {
    font-size: 1rem;
    font-weight: 700;
    display: grid;
    margin-top: 0.5rem;
    align-items: center;
    justify-content: center;
  }

  .daily-item {
    background: white;
    border-radius: 1rem;
    height: 3rem;
    margin: 0.5rem;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 1rem;
    padding: 0.3rem 1rem;
  }

  .icon-small {
    width: 3rem;
  }

  .day {
    color: #212121;
    flex: 1 1;
    font-weight: 700;
    margin-left: 1rem;
  }

  .description {
    flex: 1 1;
    margin-right: 1rem;
    text-align: right;
  }

  .min-max {
    color: #757575;
  }

  .daily-details-grid {
    display: grid;
    grid-row-gap: 0;
    grid-column-gap: 1rem;
    row-gap: 0;
    column-gap: 1rem;
    flex: 1 1;
    grid-template-columns: auto auto;
    padding: 0.3rem 1rem;
  }

  .daily-details-grid-item {
    display: flex;
    align-items: center;
    height: 1.5rem;
    justify-content: space-between;
    font-size: 1rem;
  }

  .daily-details-grid-item label:first-child {
    color: #757575;
  }

  .daily-details-grid-item label:last-child {
    color: #212121;
  }

  @media screen and (max-width: 500px) {
    .daily-item {
      font-size: 0.8rem;
    }
  }
`;
