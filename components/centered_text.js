import styled from "styled-components";
import { RichText } from "prismic-reactjs";

export default function Centered_Text({ data }) {
  return (
    <Container>
      <TextContainer>{RichText.render(data.primary.text)}</TextContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4rem 0;
`;

const TextContainer = styled.div`
  text-align: center;
  width: 35ch;
  font-weight: 600;
  font-size: 1.5rem;
`;
