import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaTree } from "react-icons/fa";
import ring from "../media/icons/ring.png";

function PurchaseButton(props) {
  const { title } = props;
  return (
    <Wrapper>
      <NavLink to="/register">
        <IconWrapper>
          <FaTree className="tree" />
          <Ring src={ring} />
        </IconWrapper>
        <TextWrapper>
          <Title>{title}</Title>
        </TextWrapper>
      </NavLink>
    </Wrapper>
  );
}

export default PurchaseButton;

const Wrapper = styled.div`
  width: 15rem;
  height: 5rem;
  border-radius: 2rem;
  background: linear-gradient(180deg, #16a34a 0%, #4f46e5 100%);
  box-shadow: 0px 1rem 3rem rgba(0, 0, 0, 0.1),
    0px 20px 3rem rgba(23, 0, 102, 0.2),
    inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    text-decoration: none;
  }

  *,
  & {
    transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  &:hover {
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
      0px 30px 60px rgba(23, 0, 102, 0.5),
      inset 0px 0px 0px 0.5px rgba(255, 255, 255, 0.2);
    transform: scale(1.2);
    .icon {
      transform: scale(1.2);
    }
  }
`;

const TextWrapper = styled.div`
  display: grid;
  gap: 4px;
`;

const Title = styled.p`
  font-size: 15px;
  font-weight: 600;
  line-height: 18px;
  text-transform: uppercase;
  color: black;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background: linear-gradient(200.44deg, #4316db 13.57%, #9076e7 98.38%);
  border-radius: 50%;
  display: grid;
  justify-content: center;
  align-items: center;
  justify-self: center;
  position: relative;

  .tree {
    font-size: 2rem;
    color: #22c55e;
  }

  ${Wrapper}:hover & {
    filter: hue-rotate(10deg) brightness(150%) saturate(120%);
  }
`;

const Ring = styled.img`
  position: absolute;
  width: 5rem;
  top: -2.75rem;
  left: -0px;

  ${Wrapper}:hover & {
    transform: scale(1.2) translate(0px, -5px);
  }
`;
