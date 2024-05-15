import { Zoom } from "react-awesome-reveal";
import styled, { keyframes } from "styled-components";
import startup from "../media/images/startup.jpg";
import value from "../media/images/values.jpg";
import mission from "../media/images/mission.png";

const WhoWeAre = () => {
  return (
    <Wrapper>
      <Zoom delay={500}>
        <h1>We are champions of multidisciplinary engineering and science.</h1>
        <div className="info">
          <img src={startup} alt="" className="back-image" />
          <div className="content">
            <p>
              Our team includes highly qualified scientists, managers,
              programmers and AI specialists all working multidisciplinary with
              direct knowledge on the industry, extensive research experience,
              and unique administrative skills in the field of big data,
              programming, AI and engineering development. We provide a{" "}
              <span className="upper">
                forest wildfire management smart system
              </span>{" "}
              that includes <span>risk assessment</span>,{" "}
              <span>early wildfire detection</span> within 25 minutes from
              ignition, <span>spread prediction</span> enabling firefighters to
              extinguish fires before they spread out of control and finally{" "}
              <span>wildfire analytics</span>.
            </p>
          </div>
        </div>
        <div className="email">
          <p>
            Submit your email to get the last trends on wildfire management.
          </p>
          <input type="email" placeholder="Enter email" />
          <button className="submit">Submit</button>
        </div>

        <div className="value">
          <div className="left-value">
            <h4>Our Values</h4>
            <ul>
              <li>
                <span>Quality:</span> providing the best service, and constantly
                improve{" "}
              </li>
              <li>
                <span>Integrity:</span> examining company practices openly and
                honestly, learn from mistakes, and meet commitments
              </li>
              <li>
                <span>Teamwork:</span> communicating constructively with others
              </li>
              <li>
                <span>Continuous learning</span>
              </li>
              <li>
                <span>Environmentalism:</span> protecting our home planet. We’re
                all part of nature, and every decision you make is in the
                context of the environmental crisis challenging humanity.{" "}
              </li>
              <li>
                <span>Fearlessness:</span>willing to experiment and make
                mistakes
              </li>
              <li>
                <span>Speed in productivity:</span> Quickly testing and
                validating new ideas
              </li>
              <li>
                <span>Respect:</span> Optimizing the user experience
              </li>
            </ul>
          </div>
          <img src={value} alt="value" />
        </div>
        <div className="mission">
          <img src={mission} alt="mission" />
          <div className="right-mission">
            <h4>Our Mission</h4>
            <p>
              design, develop, and market new patented services and technologies
              in the field of wildfire management
            </p>
            <ul className="mission-list">
              <li>
                Effectively utilizing the philosophies of high-quality, advanced
                techniques, and customer service
              </li>
              <li>
                Provide the field of wildfire management with big-data driven
                AI-empowered services and with innovative designs which will
                improve the safety of forest environment.{" "}
              </li>
              <li>
                Estimate the behavior of fire from igniting to spread pattern.
              </li>
            </ul>
          </div>
        </div>
      </Zoom>
    </Wrapper>
  );
};

export default WhoWeAre;

const animation = keyframes`
from {opacity: 0; transform: translateY(-10px); filter:blur(10px);}
to {opacity: 1; transform: translateY(0px); filter:blur(0px);}
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;

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
    animation: ${animation} 1.3s forwards;
    color: rgba(255, 255, 255, 1);
    font-weight: 700;
    padding: 0 1rem;
    text-align: center;
    color: #22c55e;
    text-shadow: #ad1457 1rem 1rem 1rem;
    font-family: "Lilita One", sans-serif;
    font-size: 3rem;
  }

  .info {
    animation: ${animation} 1.3s forwards;
    background: linear-gradient(
      -45deg,
      rgba(115, 0, 64, 0.6) 0%,
      rgba(48, 28, 190, 1) 100%
    );

    max-width: 100%;
    margin: 1rem;
    text-align: center;
    border-radius: 20px;
    display: flex;
    gap: 1rem;

    .back-image {
      animation: ${animation} 1s forwards;
      width: 50dvw;
      max-height: 100vh;
      position: relative;
      z-index: -1;
      opacity: 0.1;
      border-radius: 1rem 0 0 1rem;
    }

    .content {
      padding: 2rem;
      p {
        animation: ${animation} 2s forwards;
        color: rgba(178, 235, 242, 1);
        padding: 1rem;
        line-height: 2;
        font-size: 1.5rem;
        text-align: center;
        span {
          animation: ${animation} 2s forwards;
          color: rgba(115, 255, 64, 1);
        }
        .upper {
          animation: ${animation} 2s forwards;
          text-transform: uppercase;
          text-decoration: underline;
        }
      }
    }
  }
  @media screen and (max-width: 1000px) {
    h1 {
      font-size: 1.5rem;
    }

    .info {
      .content {
        p {
          font-size: 1rem;
        }
      }
    }
  }

  .email {
    animation: ${animation} 1s forwards;
    background: rgba(0, 0, 0, 0.6);
    text-align: center;
    color: bisque;
    padding: 3rem;
    width: 80%;
    border-radius: 5rem;

    p {
      animation: ${animation} 1.5s forwards;
      font-size: 1rem;
      text-transform: uppercase;
      font-weight: 600;
      letter-spacing: 1px;
    }
    input {
      animation: ${animation} 2s forwards;
      min-width: 30rem;
      min-height: 3rem;
      border-radius: 2rem;
      border: 0px;
      border-bottom: 0.8rem solid;
      border-top: 0.8rem solid;
      border-bottom-color: #6200ea;
      border-top-color: bisque;
      background: #71717a;
      margin-top: 1rem;
      padding: 0 1.5rem;
      color: #000;
      font-weight: 600;
      font-size: 1rem;
      text-align: center;
    }
    input::placeholder {
      font-size: 0.8rem;
      color: #d4d4d8;
      letter-spacing: 1px;
    }

    .submit {
      cursor: pointer;
      animation: ${animation} 2s forwards;
      font-size: 1rem;
      margin-left: 1.5rem;
      padding: 1rem;
      border-radius: 1rem;
      font-weight: 700;
      color: wheat;
      background: linear-gradient(45deg, #ad1457 0%, #6200ea 100%);
      transition: 0.3s ease-in-out;
      &:hover {
        transform: translateX(5px) translateY(-5px) scale(1.2);
      }
    }
  }

  .value {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(180deg, #730040 0%, #301cbe 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    img {
      width: 50dvw;
      padding: 20px;
    }
    h4 {
      font-weight: 700;
      font-size: 2.5rem;
      padding: 2rem;
    }
    ul {
      line-height: 2;
      font-size: 1.5rem;
      text-align: justify;
      padding-left: 3rem;
    }
    span {
      font-weight: 700;
      text-transform: uppercase;
    }
    @media screen and (max-width: 1000px) {
      h4 {
        font-size: 1.5rem;
        padding-left: 1rem;
      }
      ul {
        font-size: 1.2rem;
      }
    }
  }

  .mission {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 2rem;
    background: linear-gradient(180deg, #730040 0%, #301cbe 100%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    img {
      width: 40dvw;
      padding: 20px;
    }
    h4 {
      font-weight: 700;
      font-size: 2.5rem;
      padding: 2rem;
    }
    p {
      text-align: center;
      text-transform: uppercase;
      padding: 1rem;
      background: rgba(48, 28, 190, 0.2);
      border-radius: 200px;
      margin-right: 2rem;
      font-size: 18px;
      font-weight: 600;
    }
    ul {
      line-height: 2;
      font-size: 1.5rem;
      text-align: justify;
      padding: 3rem;
      list-style-type: disc;
    }
  }
`;
