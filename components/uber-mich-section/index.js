import { RichText } from "prismic-reactjs";
import Link from "next/link";
import styled from "styled-components";

export default function UberMichSection({ data }) {
  return (
    <Container>
      <InnerContainer
        style={{ backgroundColor: data.primary.hintergrundfarbe }}
      >
        <Bild>
          <img src={data.primary.bild.url} />
        </Bild>
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
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: 450px;
  max-width: 900px;
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
`;

const TextContainer = styled.div`
  max-width: 30ch;
`;

const Btn = styled.a`
  padding: 1rem;
  color: white;
  background-color: black;
  margin-top: 2rem;
  cursor: pointer;
`;

const Hintergrundnamen = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  z-index: 1;
  p {
    font-weight: 800;
    margin: 0;
    line-height: 1;
    font-size: 12rem;
    text-align: right;
    text-transform: uppercase;
    color: hsla(0, 0%, 100%, 0.445);
  }
`;

const Content = styled.div`
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
`;

const Bild = styled.div`
  position: absolute;
  top: 30%;
  right: 10%;
  z-index: 2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
