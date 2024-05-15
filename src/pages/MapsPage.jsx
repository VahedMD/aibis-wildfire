import { Rotate } from "react-awesome-reveal";
import styled from "styled-components";
import TabsPanel from "../components/MapTabs/TabPanel";
import Tab from "../components/MapTabs/Tab";
import FireApp from "../components/Maps/FireApp";
import WeatherPanel from "../components/Maps/WeatherPanel";
import FWIApp from "../components/Maps/FWIApp";

const MapsPage = () => {
  return (
    <Rotate duration={2000} delay={500}>
      <Wrapper>
        <TabsPanel>
          <Tab title="Online Fire Map">
            <FireApp />
          </Tab>
          <Tab title="Online Weather">
            <WeatherPanel />
          </Tab>
          <Tab title="Online FWI">
            <FWIApp />
          </Tab>
        </TabsPanel>
      </Wrapper>
    </Rotate>
  );
};

export default MapsPage;

const Wrapper = styled.div`
  margin-top: 5rem;
  min-height: 100vh;
  background-image: linear-gradient(
    -225deg,
    #69eacb 0%,
    #eaccf8 48%,
    #6654f1 100%
  );

  max-width: 100vw;
  font-family: "Poppins", sans-serif;
  color: #1f1f1f;

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

  .subtitle {
    color: #1f1f1f;
  }
`;
