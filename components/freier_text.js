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
  margin: 0 auto;
  max-width: var(--main-width);
`;
