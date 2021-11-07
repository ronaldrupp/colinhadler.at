import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styled from "styled-components";
import Link from "next/link";

export default function MeineBucherSection({ data }) {
  return (
    <Container>
      <h2>Meine Bücher</h2>
      {data.fields.map((buch) => (
        <Link href={`/buch/${buch.buch._meta.uid}`} key={buch.buch._meta.uid}>
          <a>
            <Cover src={buch.buch.cover.url} />
          </a>
        </Link>
      ))}
    </Container>
  );
}

const Container = styled.div`
  max-width: var(--main-width);
  margin: 20rem auto;
  display: flex;
  align-items: center;
  overflow: hidden;
`;

const Cover = styled.img`
  width: 200px;
`;
