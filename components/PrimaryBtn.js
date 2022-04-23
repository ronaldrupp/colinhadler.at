import styled from "styled-components";

export default function PrimaryBtn({ children, whiteBg, isLink }) {
  return <Btn whiteBg={whiteBg}>{children}</Btn>;
}

const Btn = styled.div`
  background-color: ${({ whiteBg }) => (whiteBg ? "white" : "black")};
  color: ${({ whiteBg }) => (whiteBg ? "black" : "white")};
  padding: 0.75rem 2rem;
  /* margin-top: 1rem; */
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  position: relative;
  border-radius: var(--border-radius);
  transition: all 0.3s;
  @media (hover: hover) {
    :hover {
    }
  }
  :before {
    content: "";
    width: 100%;
    height: 100%;
    background-color: white;
    position: absolute;
    top: 0;
    left: 0;
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
      -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }
  :hover {
    filter: brightness(0.75);
  }
`;
