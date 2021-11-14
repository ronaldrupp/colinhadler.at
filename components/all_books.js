import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";
import Link from "next/link";

export default function All_Books({ data }) {
  return (
    <Container>
      {data.fields.map((book) => (
        <Link href={book.buch._meta.uid} key={book.buch._meta.uid}>
          <a>
            <BookItem>
              <Cover src={book.buch.cover.url} />
              {/* <InfoContainer>
            {book.buch.data.isnew && <NewIndicator>NEU</NewIndicator>}
            {RichText.render(book.buch.data.titel)}
            {dayjs(book.buch.data.erscheinungsdatum).format("YYYY")}
          </InfoContainer> */}
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
`;

const Cover = styled.img`
  width: 100%;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const NewIndicator = styled.div`
  border: 1px solid black;
  padding: 0.5rem;
`;
