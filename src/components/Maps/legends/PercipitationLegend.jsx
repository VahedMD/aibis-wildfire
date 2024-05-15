import styled from "styled-components";

const PercipitationLegend = () => {
  return (
    <Wrapper>
      <div
        style={{ backgroundColor: "rgba(225, 200, 100, 0)" }}
        className="box"
      >
        0
      </div>
      <div
        style={{ backgroundColor: "rgba(110, 110, 205, 0.3)" }}
        className="box"
      >
        1
      </div>
      <div style={{ backgroundColor: "rgba(80,80, 225, 0.7)" }} className="box">
        10
      </div>
      <div
        style={{ backgroundColor: "rgba(20, 20, 255, 0.9)" }}
        className="box"
      >
        140
      </div>
      <div style={{ backgroundColor: "transparent" }} className="box-title">
        Precipitation (mm)
      </div>
    </Wrapper>
  );
};

export default PercipitationLegend;

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
