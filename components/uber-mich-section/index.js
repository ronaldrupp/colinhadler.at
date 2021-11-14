import { RichText } from "prismic-reactjs";
import Link from "next/link";
import styled from "styled-components";

export default function UberMichSection({ data }) {
  return (
    <Container>
      <BackgroundContainer
        style={{ backgroundColor: data.primary.hintergrundfarbe }}
      ></BackgroundContainer>
      <Hintergrundnamen>
        {RichText.render(data.primary.hintergrundnamen)}
      </Hintergrundnamen>
      <Content>
        <TextContainer>
          {RichText.render(data.primary.kurze_beschreibung)}
        </TextContainer>
        <Link href="/ueber-mich">
          <Btn>Mehr erfahren</Btn>
        </Link>
      </Content>
      <ColinImage src={data.primary.bild.url} />
    </Container>
  );
}

const Container = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(11, 1fr);
  grid-template-rows: repeat(6, 100px);
  max-width: var(--main-width);
  padding: 4rem 0;
  margin: 0 auto;
  position: relative;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const TextContainer = styled.div`
  /* max-width: 30ch; */
`;

const BackgroundContainer = styled.div`
  grid-column: 1 / 12;
  grid-row: 1 / 6;
`;

const Btn = styled.a`
  background-color: black;
  color: white;
  padding: 0.75rem 2rem;
  margin-top: 1rem;
  font-weight: 500;
  font-size: 0.8rem;
  cursor: pointer;
  position: relative;
  border-radius: 0.25rem;
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
    filter: brightness(1.5);
  }
`;

const Hintergrundnamen = styled.div`
  grid-column: 12;
  grid-row: 1;
  z-index: 1;
  position: absolute;
  top: 1rem;
  right: 1rem;
  p {
    font-weight: 800;
    margin: 0;
    line-height: 1;
    font-size: 12rem;
    text-align: right;
    text-transform: uppercase;
    color: hsla(0, 0%, 100%, 0.445);
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Content = styled.div`
  grid-column: 1 / 6;
  grid-row: 1 / 6;
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
  font-size: 1.5rem;
  @media screen and (max-width: 768px) {
    font-size: 1rem;
    grid-column: 1 / 12;
    grid-row: 2;
    text-align: center;
    align-items: center;
  }
`;

const ColinImage = styled.img`
  z-index: 2;
  grid-column: 7 / 10;
  grid-row: 2 / 9;
  width: 100%;
  height: 100%;
  object-fit: contain;
  @media screen and (max-width: 768px) {
    grid-column: 4 / 10;
    grid-row: 4 / 12;
  }
`;
