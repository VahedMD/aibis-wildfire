import styled from "styled-components";
import { Zoom } from "react-awesome-reveal";
import firemap from "../media/images/firemap.svg";
import statistics from "../media/images/statistics.svg";
import country from "../media/images/country.svg";
import forecasting from "../media/images/forecasting.svg";
import analytics from "../media/images/analytics.svg";

const ApplicationPage = () => {
  return (
    <Wrapper>
      <Zoom delay={200} triggerOnce>
        <FireMapWrapper>
          <div className="info">
            <h1>Online Fire Map from NASA</h1>
            <p>
              This application provides near-real time information on:
              <ul>
                <li>
                  Active fire detections from the NASA MODIS and VIIRS sensors
                </li>
                <li>
                  Near-real time burnt area perimeters derived from MODIS and
                  VIIRS
                </li>
                <li>
                  Fire emissions from the Copernicus CAM Service In addition,
                  access to a static global fuel map is available.{" "}
                </li>
              </ul>
            </p>
          </div>

          <div className="img">
            <img src={firemap} alt="" />
          </div>
        </FireMapWrapper>

        <StatisticsWrapper>
          <div className="img">
            <img src={statistics} alt="" />
          </div>
          <div className="info">
            <h1>statistics</h1>
            <p>
              Statistics are provided at national level and for regions of
              interest. The portal provides information on the evolution of the
              current fire season through the provision of:
              <ul>
                <li>
                  Current statistics of burnt areas and number of fires, as
                  compared to the average of the last 10 years. Statistics of
                  the current year can be compared to a single year or a period
                  in the past.
                </li>
                <li>
                  Seasonal cumulative trend in burnt areas and number of fires
                  as compared to the average of the last 10 years.
                </li>
                <li>
                  Number of thermal anomalies detected by the VIIRS sensor as
                  compared to the average of thermal anomalies for the last 10
                  years.
                </li>
                <li>
                  Number of thermal anomalies detected by the MODIS sensor as
                  compared to the average of the thermal anomalies for the last
                  10 years.
                </li>
              </ul>
            </p>
          </div>
        </StatisticsWrapper>
        <CountryProfileWrapper>
          <div className="info">
            <h1>Country Profile</h1>
            <p>
              This application provides a historical overview of fire regimes at
              country and sub-country level. It includes maps of yearly/monthly
              burnt areas, burnt area frequency and burnt area seasonality.
              Additionally, it provides multi-year and single-year charts of
              <ul>
                <li>Number of fires derived from GlobFire</li>
                <li>Burnt areas derived from MODIS MCD64A1</li>
                <li>Fire regimes (seasonality)</li>
                <li>Monthly fire size distribution per year</li>
                <li>Landcover damage</li>
                <li>
                  Yearly/monthly wildfire emissions Data (WIDFIRE ANALYTICS) are
                  downloadable in permium.
                </li>
              </ul>
            </p>
          </div>
          <img src={country} alt="" />
        </CountryProfileWrapper>
        <ForcastingWrapper>
          <img src={forecasting} alt="" />
          <div className="info">
            <h1>forcastings</h1>
            <p>
              In open access: Monthly and seasonal forecast of temperature and
              rainfall anomalies that are expected to prevail over the world.
              But in permium access:
              <ul>
                <li>
                  RISK ASSESSMENT: An estimation of WHEN, WHERE, WHY and HOW
                  wildfires are more likely to occur and propagate.
                </li>
                <li>SURVEY & EARLY DETECTION</li>
                <li>SPREAD EVALUATION</li>
                <li>WORKFORE & EQUIPMENT MANAGEMENT</li>
              </ul>
            </p>
          </div>
        </ForcastingWrapper>
        <AnalyticWrapper>
          <div className="info">
            <h1>Analytics</h1>
            <p>
              We apply smart data processing during and after wildfire to
              provide subtle analytics about any parameter connected to the
              managment processes.
            </p>
          </div>
          <img src={analytics} alt="" />
        </AnalyticWrapper>
      </Zoom>
    </Wrapper>
  );
};

export default ApplicationPage;

const Wrapper = styled.div`
  min-height: 100vh;
  display: grid;
  justify-content: center;
  color: #fff;
  margin-top: 6rem;

  background-image: linear-gradient(
    to top,
    #4fb576 0%,
    #44c489 30%,
    #28a9ae 46%,
    #28a2b7 59%,
    #4c7788 71%,
    #6c4f63 86%,
    #432c39 100%
  );

  h1 {
    text-align: center;
    font-size: 3rem;
    font-weight: 700;
  }

  p {
    text-align: left;
    padding: 1.5rem;
    padding-left: 5rem;
    font-weight: 500;
    font-size: 1.2rem;
  }

  ul {
    list-style-type: circle;
    margin-right: 2rem;
  }

  @media screen and (max-width: 1000px) {
    h1 {
      font-size: 1.5rem;
    }

    p {
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 600px) {
    h1 {
      font-size: 1rem;
    }

    p {
      font-size: 0.7rem;
    }
  }
`;

const FireMapWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  img {
    width: 90%;
    border-radius: 2rem;
  }

  .info {
    color: #fb923c;
    height: 90%;
    border-radius: 2rem;
    margin-right: 2rem;
    margin-left: 2rem;
  }

  @media screen and (max-width: 1000px) {
    .info {
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    background: rgba(0, 0, 0, 0.6);
    margin: 10px;
    border-radius: 1rem;
  }
`;

const StatisticsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  margin: 3rem;
  img {
    width: 90%;
    border-radius: 2rem;
  }

  .info {
    color: #2e1065;
    height: 90%;
    border-radius: 2rem;
    margin-right: 2rem;
    margin-left: 2rem;
  }

  @media screen and (max-width: 1000px) {
    .info {
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    background: rgba(200, 200, 200, 0.6);
    margin: 10px;
    border-radius: 1rem;
  }
`;

const CountryProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  color: #4c0519;
  img {
    width: 90%;
    border-radius: 2rem;
  }

  @media screen and (max-width: 1000px) {
    .info {
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    background: rgba(200, 200, 200, 0.6);
    margin: 10px;
    border-radius: 1rem;
  }
`;

const ForcastingWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  margin: 2rem;
  color: #431407;
  img {
    width: 90%;
    border-radius: 2rem;
  }

  @media screen and (max-width: 1000px) {
    .info {
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    background: rgba(200, 200, 200, 0.6);
    margin: 10px;
    border-radius: 1rem;
  }
`;

const AnalyticWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  margin: 2rem;
  margin-bottom: 5rem;
  color: #000;

  img {
    width: 90%;
    border-radius: 2rem;
  }

  @media screen and (max-width: 1000px) {
    .info {
      margin: 0;
    }
  }

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
    background: rgba(200, 200, 200, 0.6);
    margin: 10px;
    border-radius: 1rem;
  }
`;
