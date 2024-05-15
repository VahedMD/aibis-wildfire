import { Zoom } from "react-awesome-reveal";
import styled from "styled-components";
import firefighter from "../media/images/firefighter.jpg";

const WhatWeDo = () => {
  return (
    <Wrapper>
      <img src={firefighter} alt="what we do" className="baseImg" />
      <Zoom delay={500}>
        <div className="info">
          <h1>
            These are what we do against wildfire with a<span>i</span>b
            <span>i</span>s
          </h1>

          <div className="parts">
            <ul>
              <li>
                <span className="header">1. Risk Assessment:</span> An
                estimation of <span className="upper">when</span>,{" "}
                <span className="upper">where</span>,{" "}
                <span className="upper">why</span> and{" "}
                <span className="upper">how</span> wildfires are more likely to
                occur and propagate. Report on wildfire risk assessment includes
                all factors that affect both the likelihood of occurrence and
                the potential damages (including exposure and vulnerability)
                that the fire may cause, not only on human lives and assets, but
                also on ecosystem services and ecological values as well.
              </li>
              <li>
                <span className="header">2. Survey & Early Detection:</span> We
                use a highly equipped <span className="upper">drone</span> to
                survey prone area inch-by-inch. In this survey the drone can
                detect any{" "}
                <span className="upper">pill-up of flammable materials</span>{" "}
                and report the properties and location to the authorized person.
              </li>
              <li>
                <span className="header">3. Spread Evaluation:</span> We use an
                sophisticated and dedicated smart system corporating{" "}
                <span className="upper">
                  computational algorithms alongside AI{" "}
                </span>
                and also the field data gathered with drone to estimate the
                spread spreed and direction of wildfire. elicate
              </li>
              <li>
                <span className="header">
                  4. Workfore & Equipment management:
                </span>{" "}
                The AI-based analysis of situation alongside the data gathered
                on fire filed using dedicated drone helps the authorized
                communities to optimize the passes managing resources.
              </li>
              <li>
                <span className="header">5. Wildfire analytics: </span>
                We use a variety of statistical analysis and modeling techniques
                to draw new insights about wildfires that can be used to improve
                interactions between fire, people and ecosystems.
              </li>
            </ul>
          </div>
        </div>
      </Zoom>
    </Wrapper>
  );
};

export default WhatWeDo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  position: relative;
  overflow: hidden;

  .baseImg {
    width: 100%;
    margin: 1rem;
    position: absolute;
    top: -15rem;
    z-index: 0;
  }

  .info {
    z-index: 1;

    h1 {
      z-index: 1;
      margin-top: 4rem;
      text-transform: uppercase;
      text-align: center;
      font-weight: 700;
      font-size: 3rem;
      background: linear-gradient(180deg, #16a34a 0%, #000 100%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      span {
        text-transform: lowercase;
      }
    }
  }

  ul {
    z-index: 1;
    background: linear-gradient(
      45deg,
      rgba(115, 0, 64, 0.8) 0%,
      rgba(48, 28, 190, 0.8) 100%
    );
    color: beige;
    margin: 5rem;
    border-radius: 100px;
    margin-top: 1rem;
    padding: 3rem 10rem;
    font-size: 20px;
    line-height: 2;
    list-style-type: square;
    text-align: justify;

    .header {
      z-index: 1;
      font-weight: 600;
      color: rgba(255, 200, 50, 1);
      text-decoration: underline;
      text-transform: uppercase;
    }
    .upper {
      z-index: 1;
      text-transform: uppercase;
      color: greenyellow;
    }
  }
`;
