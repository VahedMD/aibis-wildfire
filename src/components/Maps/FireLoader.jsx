import styled from "styled-components";
import loading from "../../media/icons/loading.gif";

export const FireLoader = () => {
  return (
    <Wrapper>
      <img src={loading} alt="loading" />
      <h1>Fetching Data</h1>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
  img {
    width: 25%;
  }
  h1 {
    font-size: 2rem;
    margin-top: -1rem;
  }
`;
