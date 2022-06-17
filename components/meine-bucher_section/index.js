import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

export default function MeineBucherSection({ data }) {
  return (
    <Container>
      <h2>Meine Bücher</h2>
      <BookContainer>
        {data.fields.map((buch) => (
          <Link href={buch.buch._meta.uid} key={buch.buch._meta.uid} passHref>
            <ElementContainer>
              <Image
                width={200}
                height={300}
                src={buch.buch.cover.url}
                alt={buch.buch.cover.alt}
              />
            </ElementContainer>
          </Link>
        ))}
      </BookContainer>
    </Container>
  );
}

const Container = styled.div`
  max-width: var(--main-width);
  margin: 5rem auto;
  padding: 7rem 1rem;
  text-align: center;
`;

const BookContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5rem;
  margin-top: 5rem;
`;
const Cover = styled.img`
  width: 200px;
`;

const ElementContainer = styled.a`
  cursor: pointer;
`;
