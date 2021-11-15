import { RichText } from "prismic-reactjs";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";

export default function TermineSection({ data }) {
  return (
    <Container>
      {/* <Image
        src={data.primary.hintergrundbild.url}
        width={1200}
        height={600}
        objectFit="cover"
        className="bg-img"
      /> */}
      <BackgroundImage
        src={data.primary.hintergrundbild.url}
        alt={data.primary.hintergrundbild.alt}
      />
      <OuterContainer>
        <InnerContainer>
          <Overlay>
            {RichText.render(data.primary.titel)}
            {RichText.render(data.primary.kurzbeschreibung)}
            <Link href={data.primary.link_zur_internen_seite._meta.uid}>
              <Btn>
                <span>Mehr erfahren</span>
              </Btn>
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
  .bg-img {
    filter: saturate(0);
  }
`;
const OuterContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 768px) {
    position: static;
  }
`;
const InnerContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: inherit;
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 1rem;
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
  @media screen and (max-width: 768px) {
    padding: 0;
    width: 100%;
  }
`;

const BackgroundImage = styled.img`
  width: 100%;
  height: 600px;
  object-fit: cover;
  filter: saturate(0);
  @media screen and (max-width: 768px){
    height: 250px;
  }
`;

const Btn = styled.a`
  background-color: black;
  color: white;
  padding: 0.75rem 2rem;
  margin-top: 1rem;
  font-weight: 700;
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
