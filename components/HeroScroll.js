import styled from "styled-components";
import Image from "next/image";
import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect } from "react";
gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";
import PrimaryBtn from "./PrimaryBtn";

export default function HeroScroll() {
  let textContainerRef = useRef();
  let contentContainer = useRef();
  let coverContainerRef = useRef();

  useEffect(() => {
    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: textContainerRef.current,
        toggleActions: "restart none none reset",
        markers: false,
        start: "100% 60%",
        end: "100% 20%",
        scrub: 1,
      },
    });
    tl.to(textContainerRef.current, {
      opacity: 0,
      ease: "power3.out",
      delay: 0.2,
      duration: 5,
      scale: 0.8,
    });
    /* gsap.from(coverContainerRef.current, {
      scrollTrigger: {
        trigger: coverContainerRef.current,
        markers: false,
        start: "10% 80%",
        end: "50% 50%",
        markers: true,
        scrub: 1,
      },
      scale: 1.5,
    }); */
  }, []);

  return (
    <Container>
      <BgImage>
        <Image
          className="bgBackground"
          layout="fill"
          objectFit="cover"
          src="/exilium-bg.png"
          alt="Innenklappe vom Buch Exilium"
        />
      </BgImage>
      <Content ref={contentContainer}>
        <TextContainer ref={textContainerRef}>
          <h1>Wie viele Menschen haben noch ihren freien Willen?</h1>
          <h1>Der neue Jugendthriller von Colin Hadler</h1>
        </TextContainer>
        <CoverContainer ref={coverContainerRef}>
          <Link href="/exilium">
            <a>
              <Image
                src="/exilium-3d.png"
                width={500}
                height={600}
                objectFit="contain"
                style={{ cursor: "pointer" }}
              />
            </a>
          </Link>
          <Link href="/exilium">
            <a style={{ marginTop: 20 }}>
              <PrimaryBtn whiteBg>Mehr erfahren</PrimaryBtn>
            </a>
          </Link>
        </CoverContainer>
      </Content>
    </Container>
  );
}

const Content = styled.div`
  width: 100%;
  margin-top: calc((100vh + 7.5px) * -1);
`;
const BgImage = styled.div`
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  filter: brightness(0.5);
  top: 0;
  bottom: 0;
  position: sticky;
`;
const Container = styled.div`
  background-color: #000;
  position: relative;
`;

const TextContainer = styled.div`
  text-align: center;
  color: white;
  height: 100vh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: sticky;
  top: 0;
  padding: 20px;
  h1 {
    margin: 0;
    text-transform: uppercase;
    line-height: 1;
    &:nth-child(2) {
      font-weight: 400;
      font-size: 20px;
      margin-top: 20px;
    }
  }
`;

const CoverContainer = styled.div`
  height: 100vh;
  z-index: 99;
  position: sticky;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
