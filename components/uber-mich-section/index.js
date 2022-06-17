// import { RichText } from "prismic-reactjs";
// import Link from "next/link";
// import styled from "styled-components";

// export default function UberMichSection({ data }) {
//   return (
//     <Container>
//       <BackgroundContainer
//         style={{ backgroundColor: data.primary.hintergrundfarbe }}
//       ></BackgroundContainer>
//       <Hintergrundnamen>
//         {RichText.render(data.primary.hintergrundnamen)}
//       </Hintergrundnamen>
//       <Content>
//         <TextContainer>
//           {RichText.render(data.primary.kurze_beschreibung)}
//         </TextContainer>
//         <Link href="/ueber-mich">
//           <Btn>Mehr erfahren</Btn>
//         </Link>
//       </Content>
//       <ColinImage src={data.primary.bild.url} alt={data.primary.bild.alt} />
//     </Container>
//   );
// }

// const Container = styled.section`
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(11, 1fr);
//   grid-template-rows: repeat(6, 100px);
//   max-width: var(--main-width);
//   padding: 4rem 0;
//   margin: 0 auto;
//   position: relative;
//   @media screen and (max-width: 768px) {
//     padding: 0;
//   }
// `;

// const TextContainer = styled.div`
//   /* max-width: 30ch; */
// `;

// const BackgroundContainer = styled.div`
//   grid-column: 1 / 12;
//   grid-row: 1 / 6;
// `;

// const Btn = styled.a`
//   background-color: black;
//   color: white;
//   padding: 0.75rem 2rem;
//   margin-top: 1rem;
//   font-weight: 500;
//   font-size: 0.8rem;
//   cursor: pointer;
//   position: relative;
//   border-radius: 0.25rem;
//   :before {
//     content: "";
//     width: 100%;
//     height: 100%;
//     background-color: white;
//     position: absolute;
//     top: 0;
//     left: 0;
//     transform: scaleX(0);
//     transform-origin: right center;
//     transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
//       -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
//   }
//   :hover {
//     filter: brightness(1.5);
//   }
// `;

// const Hintergrundnamen = styled.div`
//   grid-column: 12;
//   grid-row: 1;
//   z-index: 1;
//   position: absolute;
//   top: 1rem;
//   right: 1rem;
//   p {
//     font-weight: 800;
//     margin: 0;
//     line-height: 1;
//     font-size: 12rem;
//     text-align: right;
//     text-transform: uppercase;
//     color: hsla(0, 0%, 100%, 0.445);
//   }
//   @media screen and (max-width: 768px) {
//     display: none;
//   }
// `;

// const Content = styled.div`
//   grid-column: 1 / 6;
//   grid-row: 1 / 6;
//   z-index: 3;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: center;
//   padding: 2rem;
//   font-size: 1.5rem;
//   @media screen and (max-width: 768px) {
//     font-size: 1rem;
//     grid-column: 1 / 12;
//     grid-row: 2;
//     text-align: center;
//     align-items: center;
//   }
// `;

// const ColinImage = styled.img`
//   z-index: 2;
//   grid-column: 7 / 10;
//   grid-row: 2 / 9;
//   width: 100%;
//   height: 100%;
//   object-fit: contain;
//   @media screen and (max-width: 768px) {
//     grid-column: 4 / 10;
//     grid-row: 4 / 12;
//   }
// `;

import { RichText } from "prismic-reactjs";
import Link from "next/link";
import styled from "styled-components";
import PrimaryBtn from "../PrimaryBtn";
import { useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function UberMichSection({ data }) {
  let textContainerRef = useRef();
  let colinRef = useRef();
  let potraitRef = useRef();
  useEffect(() => {
    gsap.from('.text-container > p', {
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: "top bottom",
        end: "bottom 70%",
        scrub: 1,
      },
      y: 40,
      opacity: 0,
    });
    gsap.from(colinRef.current, {
      scrollTrigger: {
        trigger: textContainerRef.current,
        start: "top bottom",
        end: "bottom 70%",
        scrub: 1,
      },
      xPercent: 10,
      opacity: 0,
    });
    gsap.from(potraitRef.current, {
      scrollTrigger: {
        trigger: potraitRef.current,
        start: "top bottom",
        end: "bottom 70%",
        scrub: 1,
      },
      xPercent: -30,
      opacity: 0.8,
    });
  },[])

  return (
    <Container>
      <InnerContainer
        style={{ backgroundColor: data.primary.hintergrundfarbe }}
      >
        <Bild>
          <img src={data.primary.bild.url} ref={potraitRef} />
        </Bild>
          <Hintergrundnamen>
            <div ref={colinRef}>
              {RichText.render(data.primary.hintergrundnamen)}
            </div>
          </Hintergrundnamen>
        <Content>
          <TextContainer ref={textContainerRef} className="text-container">
            {RichText.render(data.primary.kurze_beschreibung)}
          </TextContainer>
          <Link href="/ueber-mich">
            <a>
              <PrimaryBtn>Mehr erfahren</PrimaryBtn>
            </a>
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
  max-width: var(--main-width);
  margin: 5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: relative;
  @media screen and (max-width: 768px) {
    height: 700px;
    margin: 0 auto;
  }
`;

const TextContainer = styled.div`
  max-width: 30ch;
  margin-bottom: 40px;
`;

const HintergrundnamenContainer = styled.div`

`
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
  overflow:hidden;
  p {
    font-weight: 800;
    margin: 0;
    line-height: 1;
    font-size: 12rem;
    text-align: right;
    text-transform: uppercase;
    color: rgba(0,0,0,0.5);
  }
  @media screen and (max-width: 768px){
    display: none;
  }
`;

const Content = styled.div`
  z-index: 3;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 2rem;
  @media screen and (max-width: 768px) {
    text-align: center;
    align-items: center;
  }
`;

const Bild = styled.div`
  position: absolute;
  top: 30%;
  right: 10%;
  z-index: 2;
  @media screen and (max-width: 768px) {
    top: 52%;
  }
`;