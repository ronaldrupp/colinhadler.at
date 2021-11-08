import styled from "styled-components";
import { RichText } from "prismic-reactjs";

export default function Gallerie({ data }) {
  return (
    <Container>
      {data.fields.map((bild, idx) => (
        <Element key={bild.bild.url}>
          <Image src={bild.bild.url} />
          {bild.beschreibung && (
            <TextContainer>{RichText.render(bild.beschreibung)}</TextContainer>
          )}
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
  max-width: var(--main-width);
  margin: 4rem auto;
`;

const Image = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: cover;
  @media screen and (max-width:768px){
    width: 100%;
  }
`;

const Element = styled.div`
  display: flex;
  max-width: var(--main-width);
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const TextContainer = styled.div`
  max-width: 35ch;
  font-size: 1.25rem;
  background-color: white;
  padding: 1rem;
`;
