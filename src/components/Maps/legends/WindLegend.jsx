import styled from "styled-components";

const WindLegend = () => {
  return (
    <Wrapper>
      <div style={{ backgroundColor: "rgba(255,255,255,0)" }} className="box">
        1
      </div>
      <div
        style={{ backgroundColor: "rgba(238, 206, 206,0.4)" }}
        className="box"
      >
        5
      </div>
      <div
        style={{ backgroundColor: "rgba(179, 100, 188, 0.7)" }}
        className="box"
      >
        15
      </div>
      <div style={{ backgroundColor: "rgba(63,33,59, 0.8)" }} className="box">
        25
      </div>
      <div
        style={{ backgroundColor: "rgba(116, 79, 172, 0.9)" }}
        className="box"
      >
        50
      </div>
      <div style={{ backgroundColor: "rgba(70, 0, 175, 1)" }} className="box">
        100
      </div>
      <div style={{ backgroundColor: "rgba(13, 17, 38, 1)" }} className="box">
        200
      </div>
      <div style={{ backgroundColor: "transparent" }} className="box-title">
        Wind (m/s)
      </div>
    </Wrapper>
  );
};

export default WindLegend;

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
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
