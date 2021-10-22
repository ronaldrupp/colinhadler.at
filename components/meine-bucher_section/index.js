import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styled from "styled-components";
import Link from "next/link";

export default function MeineBucherSection({ data }) {
  return (
    <Container>
      <h2>Meine Bücher</h2>
      {data.items.map((buch) => (
        <Link href={`/buch/${buch.buch.slug}`} key={buch.buch.slug}>
          <a>
          <Cover src={buch.buch.data.cover.url} />
          </a>
        </Link>
      ))}
    </Container>
  );
}

const Container = styled.div`
  max-width: var(--main-width);
  margin: 20rem auto;
`;

const Cover = styled.img`
  width: 200px;
`;
