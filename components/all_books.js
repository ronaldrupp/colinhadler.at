import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

export default function All_Books({ data }) {
  console.log(data);
  return (
    <Container>
      {data.fields.map((book) => (
        <Link href={book.buch._meta.uid} key={book.buch._meta.uid}>
          <a>
            <BookItem>
              <Image
                width={400}
                height={600}
                src={book.buch.cover.url}
                alt={book.buch.cover.alt}
              />
              <InfoContainer>
                {RichText.render(book.buch.titel)}
                <span>{dayjs(book.buch.erscheinungsdatum).format("YYYY")}</span>
              </InfoContainer>
            </BookItem>
          </a>
        </Link>
      ))}
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: var(--main-width);
  margin: 2rem auto;
  padding: 1rem;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const BookItem = styled.article`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    transform: translateY(-10px);
  }
  @media screen and (max-width: 768px) {
    :hover {
      transform: translateX(10px);
    }
  }
`;

const Cover = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  h1 {
    line-height: 1;
    margin-bottom: 0;
    font-size: 1rem;
    font-weight: 600;
  }
  span {
    color: rgb(50, 50, 50);
    font-size: 0.75rem;
  }
`;
const NewIndicator = styled.div`
  border: 1px solid black;
  padding: 0.25rem;
  border-radius: var(--border-radius);
  font-size: 0.25rem;
`;
