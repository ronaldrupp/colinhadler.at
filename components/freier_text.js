import { RichText } from "prismic-reactjs";
import styled from "styled-components";

export default function Freier_Text({ data }) {
  return <Container>{RichText.render(data.primary.text)}</Container>;
}

const Container = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 2rem auto;
  max-width: var(--main-width);
  p {
    margin: 0.25rem 0;
  }
  a {
    font-weight: 600;
    position: relative;
    &:after {
      content: "";
      height: 2.5px;
      width: 100%;
      background-color: black;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scaleX(0);
      transform-origin: right center;
      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
        -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    }
    &:hover {
      &:after {
        width: 100%;
        transform: scaleX(1);
        transform-origin: left center;
      }
    }
  }
`;
