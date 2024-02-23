import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";

export default function Hero__2({ data }) {
  let BigBgTitleRef = useRef();
  let ImageRef = useRef();

  useLayoutEffect(() => {
    gsap.from(BigBgTitleRef.current, {
      scale: 0.7,
      ease: "power3.out",
      duration: 2,
    });
    gsap.from(ImageRef.current, {
      scale: 1.3,
      ease: "power3.out",
      duration: 2,
    });
  }, []);

  return (
    <Container>
      <BigBgTitle ref={BigBgTitleRef}>
        {RichText.render(data.primary.big_background_text)}
      </BigBgTitle>
      <ImageContainer>
        <Image src={data.primary.image.url} alt={data.primary.image.alt} ref={ImageRef} />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 800px;
  height:100vh;
  padding: 4rem 0;
  overflow: hidden;
  @media screen and (max-width: 768px) {
  }
`;

const BigBgTitle = styled.div`
  font-size: 15rem;
  line-height: 0.9;
  text-align: center;
  font-weight: 600;
  overflow: hidden;
  text-transform: uppercase;
  p {
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    font-size: 4.5rem;
    position:absolute;
    top:95px;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const Image = styled.img`
width:400px;
height:600px;
object-fit: contain;
`;
