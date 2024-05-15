import styled from "styled-components";

const TempLegend = () => {
  return (
    <Wrapper>
      <div style={{ backgroundColor: "rgba(252, 128, 20, 1)" }} className="box">
        30
      </div>
      <div style={{ backgroundColor: "rgba(255, 194, 40,1)" }} className="box">
        25
      </div>
      <div style={{ backgroundColor: "rgba(255, 240, 40, 1)" }} className="box">
        20
      </div>
      <div style={{ backgroundColor: "rgba(194, 255, 40, 1)" }} className="box">
        10
      </div>
      <div style={{ backgroundColor: "rgba(35, 221, 221, 1)" }} className="box">
        0
      </div>
      <div style={{ backgroundColor: "rgba(32, 196, 232, 1)" }} className="box">
        -10
      </div>
      <div style={{ backgroundColor: "rgba(32, 140, 236, 1)" }} className="box">
        -20
      </div>
      <div style={{ backgroundColor: "rgba(130, 87, 219, 1)" }} className="box">
        -30
      </div>
      <div style={{ backgroundColor: "rgba(130, 22, 146, 1)" }} className="box">
        -40
      </div>
      <div style={{ backgroundColor: "transparent" }} className="box-title">
        Temperature (°C)
      </div>
    </Wrapper>
  );
};

export default TempLegend;

const Wrapper = styled.div`
  display: flex;
  justify-content: end;
  color: #000;

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 50px;
  }
  .box-title {
    width: 150px;
    text-align: center;
  }
`;
