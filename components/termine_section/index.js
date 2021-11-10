import { RichText } from "prismic-reactjs";
import Link from "next/link";
import styled from "styled-components";

export default function TermineSection({ data }) {
  return (
    <Container>
      <BackgroundImage src={data.primary.hintergrundbild.url} />
      <OuterContainer>
        <InnerContainer>
          <Overlay>
            {RichText.render(data.primary.titel)}
            {RichText.render(data.primary.kurzbeschreibung)}
            <Link href={data.primary.link_zur_internen_seite._meta.uid}>
              <Btn>Mehr erfahren</Btn>
            </Link>
          </Overlay>
        </InnerContainer>
      </OuterContainer>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  height: 600px;
`;
const OuterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: inherit;
  max-width: var(--main-width);
  margin: 0 auto;
`;
const Overlay = styled.div`
  width: 350px;
  padding: 2rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h1 {
    margin: 0;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0);
`;

const Btn = styled.a`
  background-color: black;
  padding: 0.75rem 2rem;
  color: white;
  margin-top: 1rem;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
`;
