import { RichText } from "prismic-reactjs";
import styled from "styled-components";

export default function PotraitImageWithText({ data }) {
  return (
    <Container>
      <Image
        src={data.primary.bild.url}
        alt={data.primary.bild.alt}
        leftRight={data.primary.links_oder_rechts}
      />
      {data.primary.beschreibung ? (
        <Description leftRight={data.primary.links_oder_rechts}>
          {RichText.render(data.primary.beschreibung)}
        </Description>
      ) : null}
    </Container>
  );
}

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  padding: 2rem 0rem;
  background-color: var(--secondary-color);
  @media screen and (max-width: 768px) {
  }
`;

const Image = styled.img`
  width: 100%;
  grid-column: ${(params) => (params.leftRight ? "6 / 12" : "4 / 9")};
  grid-row: 1/13;
  @media screen and (max-width: 768px) {
    grid-column: ${(params) => (params.leftRight ? "6 / 13" : "1 / 10")};
    grid-row: 1/12;
  }
`;

const DescriptionWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
`;

const Description = styled.div`
  background-color: white;
  font-weight: 500;
  font-size: 1.5rem;
  grid-column: ${(params) => (!params.leftRight ? "7 / 12" : "2 / 7")};
  grid-row: 2 / 5;
  padding: 3rem;
  p {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    padding: 2rem;
    grid-column: ${(params) => (!params.leftRight ? "2 / 13" : "1 / 11")};
    grid-row: 12;
  }
`;
