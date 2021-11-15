import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";

export default function MeineBucherSection({ data }) {
  // let containerRef = [];
  // useEffect(() => {
  //   containerRef.forEach((panel) => {
  //     ScrollTrigger.create({
  //       trigger: panel,
  //       start: "top top",
  //       pin: true,
  //       pinSpacing: false,
  //     });
  //   });
  // }, []);
  return (
    <Container>
      <h2>Meine Bücher</h2>
      <BookContainer>
        {data.fields.map((buch) => (
          <Link href={buch.buch._meta.uid} key={buch.buch._meta.uid}>
            <ElementContainer>
              <Cover src={buch.buch.cover.url} alt={buch.buch.cover.alt} />
            </ElementContainer>
          </Link>
        ))}
      </BookContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: var(--main-width);
  margin: 4rem auto;
  padding: 4rem 1rem;
  text-align: center;
`;

const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
`;
const Cover = styled.img`
  width: 200px;
`;

const ElementContainer = styled.a`
  cursor: pointer;
`;
