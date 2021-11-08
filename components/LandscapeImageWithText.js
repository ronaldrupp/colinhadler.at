import styled from "styled-components";
import { RichText } from "prismic-reactjs";

export default function LandscapeImageWithText({ data }) {
  console.log(data);

  return (
    <Container>
      <Image src={data.primary.bild.url} />
      <Description>{RichText.render(data.primary.beschreibung)}</Description>
    </Container>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(8, 1fr);
  background-color: var(--secondary-color);
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  grid-column: 1 / 11;
  grid-row: 1 / 6;
  object-fit: cover;
`;

const Description = styled.div`
  position: absolute;
  background-color: white;
  font-weight: 500;
  font-size: 1.5rem;
  grid-column: 6 / 12;
  padding: 3rem;
  grid-row: 5 / auto;
`;
