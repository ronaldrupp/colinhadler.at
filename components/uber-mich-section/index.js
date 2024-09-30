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

      <div style={{height: 700, backgroundSize: "cover", backgroundPosition: "center", backgroundImage: "url('/DSC00635.jpg')"}}>
        <div style={{maxWidth: 1200, paddingInline: "1rem", margin: '0rem auto', display: "flex", flexDirection: 'column', alignItems: 'flex-start'}}>
          <p style={{maxWidth: "30ch", fontSize: "1.25rem"}}>{RichText.render(data.primary.kurze_beschreibung)}</p>
          <Link href="/ueber-mich">
             <a>
               <PrimaryBtn>Mehr erfahren</PrimaryBtn>
             </a>
           </Link>
        </div>
      </div>
  // <Container>
  //
  //
  //   <InnerContainer>
  //       <Hintergrundnamen>
  //         <img src="/DSC00635.jpg" />
  //       </Hintergrundnamen>
  //       <Content>
  //         <TextContainer ref={textContainerRef} className="text-container">
  //           {RichText.render(data.primary.kurze_beschreibung)}
  //         </TextContainer>
  //         <Link href="/ueber-mich">
  //           <a>
  //             <PrimaryBtn>Mehr erfahren</PrimaryBtn>
  //           </a>
  //         </Link>
  //       </Content>
  //     </InnerContainer>
  //   </Container>
  );
}

// const Container = styled.div`
//   width: 100%;
// `;
//
// const InnerContainer = styled.div`
//   width: 100%;
//   height: 650px;
//
//   padding-block: 5rem;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
//   position: relative;
//   @media screen and (max-width: 768px) {
//     height: 850px;
//     margin: 0 auto;
//     margin-bottom: 10em;
//     padding: 5em 0;
//   }
// `;
//
// const TextContainer = styled.div`
//   max-width: 30ch;
//   margin-bottom: 40px;
// `;
//
// const HintergrundnamenContainer = styled.div`
//
// `
// const Hintergrundnamen = styled.div`
//   position: absolute;
//   inset: 0;
//   overflow: hidden;
// `;
//
// const Content = styled.div`
//   z-index: 3;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   justify-content: flex-start;
//   padding: 2rem;
//   max-width: var(--main-width);
//   @media screen and (max-width: 768px) {
//     text-align: center;
//     align-items: center;
//   }
// `;
