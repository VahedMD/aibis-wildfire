import styled from "styled-components";

const PressureLegend = () => {
  return (
    <Wrapper>
      <div style={{ backgroundColor: "rgba(0,115,255,1)" }} className="box">
        94
      </div>
      <div style={{ backgroundColor: "rgba(0,170,255,1)" }} className="box">
        96
      </div>
      <div style={{ backgroundColor: "rgba(75,208,214,1)" }} className="box">
        98
      </div>
      <div style={{ backgroundColor: "rgba(141,231,199,1)" }} className="box">
        100
      </div>
      <div style={{ backgroundColor: "rgba(176,247,32,1)" }} className="box">
        101
      </div>
      <div style={{ backgroundColor: "rgba(240,184,0,1)" }} className="box">
        102
      </div>
      <div style={{ backgroundColor: "rgba(251,85,21,1)" }} className="box">
        104
      </div>
      <div style={{ backgroundColor: "rgba(243,54,59,1)" }} className="box">
        106
      </div>
      <div style={{ backgroundColor: "rgba(198,0,0,1)" }} className="box">
        108
      </div>
      <div style={{ backgroundColor: "transparent" }} className="box-title">
        Pressure (kPa)
      </div>
    </Wrapper>
  );
};

export default PressureLegend;

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
