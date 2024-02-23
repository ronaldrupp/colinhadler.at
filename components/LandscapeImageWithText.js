import styled from "styled-components";
import { RichText } from "prismic-reactjs";

export default function LandscapeImageWithText({ data }) {

  return (
    <Container>
      <Image src={data.primary.bild.url} alt={data.primary.bild.alt}/>
      <Description>{RichText.render(data.primary.beschreibung)}</Description>
    </Container>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background-color: var(--secondary-color);
  padding: 4rem 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  grid-column: 1 / 11;
  grid-row: 1 / 6;
  object-fit: cover;
  @media screen and (max-width: 768px) {
    grid-column: 1/13;
    grid-row: 1 / 12;
  }
`;

const Description = styled.div`
  background-color: white;
  font-weight: 500;
  font-size: 1.5rem;
  grid-column: 6 / 13;
  padding: 3rem;
  grid-row: 6;

  @media screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 2rem;
    grid-column: ${(params) => (!params.leftRight ? "2 / 13" : "2 / 7")};
    grid-row: 12;
  }
`;
