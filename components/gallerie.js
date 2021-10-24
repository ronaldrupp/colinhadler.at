import styled from "styled-components";
import { RichText } from "prismic-reactjs";

export default function Gallerie({ data }) {
  return (
    <Container>
      {data.fields.map((bild, idx) => (
        <Element>
          <Image src={bild.bild.url} key={bild.bild.url} />
          <TextContainer>{RichText.render(bild.beschreibung)}</TextContainer>
        </Element>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Image = styled.img`
  max-width: 792px;
  max-height: 520px;
`;

const Element = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  max-width: 1200px;
  margin: 0 auto;
`;

const TextContainer = styled.div`
  width: 35ch;
  font-size: 1.25rem;
  background-color: white;
  padding: 32px 40px;
`;
