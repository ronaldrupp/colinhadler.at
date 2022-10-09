import { RichText } from "prismic-reactjs";
import Link from "next/link";
import styled from "styled-components";
import PrimaryBtn from "./../PrimaryBtn";
export default function TermineSection({ data }) {
  return (
    <Container
      style={{ backgroundImage: `url(${data.primary.hintergrundbild.url})` }}
    >
      <div style={{ clipPath: "inset(0px 0px 0px 0px)" }}>
        {/* <BackgroundImage
          src={data.primary.hintergrundbild.url}
          alt={data.primary.hintergrundbild.alt}
        /> */}
      </div>
      <OuterContainer>
        <InnerContainer>
          <Overlay>
            {RichText.render(data.primary.titel)}
            {RichText.render(data.primary.kurzbeschreibung)}
            <Link href={data.primary.link_zur_internen_seite._meta.uid}>
              <a>
                <PrimaryBtn>
                  <span>Mehr erfahren</span>
                </PrimaryBtn>
              </a>
            </Link>
          </Overlay>
        </InnerContainer>
      </OuterContainer>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 800px;
  background-position: 35% 0%;
  background-size: cover;
  background-repeat: no-repeat;
  filter: saturate(0);
`;
const OuterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
  }
`;
const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: inherit;
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 1rem;
  @media screen and (max-width: 768px) {
    justify-content:center;
    align-items: flex-end;
    padding: 2rem;
  }
`;
const Overlay = styled.div`
  width: 350px;
  padding: 2rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: var(--border-radius);
  h1 {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    text-align: center;
    justify-content: flex-start;
    align-items: center;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  filter: saturate(0);
  @media screen and (max-width: 768px) {
    height: 700px;
  }
`;
