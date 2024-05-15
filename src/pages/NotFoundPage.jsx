import styled from "styled-components";

const NotFoundPage = () => {
  return (
    <Wrapper>
      <h1>Page not found (404)</h1>
    </Wrapper>
  );
};

export default NotFoundPage;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to top, #e8198b 0%, #c7eafd 100%);
  margin-top: 3rem;

  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 3rem;
    font-weight: 700;
  }
`;
