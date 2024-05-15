import React, { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import bg from "../media/images/bg6.jpg";
import wf4 from "../media/images/wildfire4.jpg";
import wf1 from "../media/images/wildfire1.jpg";
import wf2 from "../media/images/wildfire2.jpg";
import wf3 from "../media/images/photo-7752664.jpg";
import PurchaseButton from "../components/PurchaseButton";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [current, setCurrent] = useState(0);

  let length = 4;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  useEffect(() => {
    const handleAutoplay = setInterval(nextSlide, 7000);
    return () => clearInterval(handleAutoplay);
  }, [nextSlide]);

  return (
    <Wrapper
      current={current}
      className="h-screen w-screen relative overflow-hidden"
    >
      <img
        src={bg}
        alt="background"
        className="h-[calc(100vh+4rem)] overflow-hidden w-screen opacity-20"
      />
      <div className="left-side h-full w-1/3 absolute top-0 left-0 text-white">
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-6xl font-bold mt-0 pb-0 text-purple-400 drop-shadow-landh">
            <span className="bg-clip-text text-transparent bg-gradient-to-r text-7xl from-[#ffd7ff] to-[#db2777]">
              Wildfire
            </span>
            <br />
            is comming!
          </h1>
          <div className="mx-12 my-6">
            <h4 className="font-semibold text-xl leading-8">
              We propose an{" "}
              <span className="uppercase text-[#2dd4bf] drop-shadow-landi">
                Artificial Intelligence-Based Integrated Wildfire managment
                system
              </span>
            </h4>
          </div>
          <div>
            <PurchaseButton title="get pro access" />
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-semibold  mt-0 pt-0 text-[#a78bfa] drop-shadow-landh">
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ffd7ff] to-[#db2777]">
              Wildfires
            </span>
            <br />
            are becoming more intense and more frequent!
          </h1>
          <div className="mx-12 mb-6 mt-0">
            <p className="font-normal text-base leading-8">
              Climate change and land-use change are making wildfires worse and
              anticipates a global increase of extreme fires even in areas
              previously unaffected.
            </p>
          </div>
          <div className="purchase-btn">
            <PurchaseButton title="get pro access" />
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-semibold  mb-0 pb-0 text-[#a78bfa] drop-shadow-landh">
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ffd7ff] to-[#db2777]">
              Wildfires
            </span>
            <br />
            exacerbate climate change!
          </h1>
          <div className="mx-12 mb-6 mt-0">
            <p className="font-normal text-base leading-8">
              Wildfire contributing significant greenhouse gasses to the
              atmosphere, the very occurrence of wildfires releases tons of CO
              <sub>2</sub> into the atmosphere.
            </p>
          </div>
          <div className="purchase-btn">
            <PurchaseButton title="get pro access" />
          </div>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-semibold  mb-0 pb-0 text-[#a78bfa] drop-shadow-landh">
            <span className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#ffd7ff] to-[#db2777]">
              We Offer
            </span>
            <br />
            an intelligent solution!
          </h1>
          <div className="mx-12 mb-6 mt-0">
            <p className="font-normal text-base leading-8">
              We help the authorized organization to
              <Link to="/" className="uppercase text-[#2dd4bf]">
                {" "}
                predict
              </Link>{" "}
              the likelihood of occurrence, to
              <Link to="/" className="uppercase text-[#2dd4bf]">
                {" "}
                prevent
              </Link>{" "}
              wildfire ignition, to
              <Link to="/" className="uppercase text-[#2dd4bf]">
                {" "}
                prepare an action plan
              </Link>{" "}
              against that, to
              <Link to="/" className="uppercase text-[#2dd4bf]">
                {" "}
                manage
              </Link>{" "}
              resources during firefighting, and to
              <Link to="/" className="uppercase text-[#2dd4bf]">
                {" "}
                analyze
              </Link>{" "}
              the burnt area to help it to rebuild.
            </p>
          </div>
          <div className="purchase-btn">
            <PurchaseButton title="get pro access" />
          </div>
        </div>
      </div>
      <div className="right-side h-full absolute left-1/3 top-0">
        <img src={wf4} alt="" className="overflow-hidden h-full m-0 p-0" />
        <img src={wf1} alt="" className="overflow-hidden h-full m-0 p-0" />
        <img src={wf2} alt="" className="overflow-hidden h-full m-0 p-0" />
        <img src={wf3} alt="" className="overflow-hidden h-full m-0 p-0" />
      </div>
      <div>
        <button
          className="bg-white border-0 text-red-600 cursor-pointer text-base p-4 hover:text-[#222] focus:outline-none absolute left-1/3 top-1/2 z-50 rounded-l-full -translate-x-full"
          onClick={nextSlide}
        >
          <FaArrowUp />
        </button>
        <button
          className="bg-white border-0 text-red-600 cursor-pointer text-base p-4 hover:text-[#222] focus:outline-none absolute left-1/3 top-1/2 z-50 rounded-r-full -translate-y-full"
          onClick={prevSlide}
        >
          <FaArrowDown />
        </button>
      </div>
    </Wrapper>
  );
};

export default LandingPage;

const Wrapper = styled.div`
  .left-side {
    transition: transform 1s ease-in-out;
    transform: ${(props) =>
      props.current === 0
        ? ""
        : props.current === 1
        ? "translateY(-100%)"
        : props.current === 2
        ? "translateY(-200%)"
        : "translateY(-300%)"};
  }

  .right-side {
    transition: transform 1s ease-in-out;
    transform: ${(props) =>
      props.current === 0
        ? "translateY(-300%)"
        : props.current === 1
        ? "translateY(-200%)"
        : props.current === 2
        ? "translateY(-100%)"
        : ""};
  }
`;
