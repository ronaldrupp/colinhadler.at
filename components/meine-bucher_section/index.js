import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

import styled from "styled-components";
import Link from "next/link";

export default function MeineBucherSection({ data }) {
  return (
    <Container>
      <h2>Meine Bücher</h2>
      <ul>
        {data.items.map((buch) => (
          <li key={buch.buch.slug}>
            <Link href={`/buch/${buch.buch.slug}`}>
              <a>{buch.buch.uid}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}

const Container = styled.div`
  max-width: var(--main-width);
  margin: 20rem auto;
`;
