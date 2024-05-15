import React from "react";
import styled from "styled-components";
import Tab from "../components/MapTabs/Tab";
import TabsPanel from "../components/MapTabs/TabPanel";
import WhatWeDo from "../components/WhatWeDo";
import WhoWeAre from "../components/WhoWeAre";

const AboutusPage = () => {
  return (
    <Wrapper>
      <TabsPanel>
        <Tab title="Who We Are">
          <WhoWeAre />
        </Tab>
        <Tab title="What We Do">
          <WhatWeDo />
        </Tab>
      </TabsPanel>
    </Wrapper>
  );
};

export default AboutusPage;

const Wrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  margin-top: 6rem;

  .title {
    text-align: center;
    margin-bottom: 1rem;
  }

  .tabs {
    list-style: none;
    display: flex;
    gap: 6rem;
    align-items: center;
    justify-content: center;
    border-bottom: none;

    @media screen and (max-width: 1000px) {
      gap: 1rem;
    }
  }

  .tabs .tab {
    margin: 1rem;
    padding: 0.4rem 6rem;
    cursor: pointer;
    transform: translateY(1px);
    border-radius: 1rem;
    transition: background-color 0.2s ease-in-out;
    border: 1px solid transparent;
    text-align: center;
    background: #57534e;
    font-size: 2rem;
    font-weight: 600;
    margin-top: 2rem;
    transition: all 0.5s ease-in-out;
    font-family: "Righteous", sans-serif;

    @media screen and (max-width: 1000px) {
      font-size: 1rem;
      margin: 15px;
      padding: 20px;
    }
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
    color: #4ade80;
  }

  .tabs .tab.selected:hover {
    background: none;
    background-color: #ececec;
  }

  .tab__content {
    padding: 1rem 0rem;
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
