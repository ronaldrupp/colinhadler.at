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
  a {
    font-weight: 600;
    position: relative;
    &:after {
      content: "";
      height: 2.5px;
      width: 0%;
      background-color: black;
      position: absolute;
      bottom: 0;
      left: 0;
      transition: .4s;
    }
    &:hover {
      &:after {
        width: 100%;
      }
    }
  }
`;
