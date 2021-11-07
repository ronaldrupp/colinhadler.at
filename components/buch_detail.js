import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";
export default function Buch_Detail({ data }) {
  return (
    <Container>
      <Header>
        <Cover src={data.primary.buch.cover.url} />
        <Infos>
          {RichText.render(data.primary.buch.titel)}
          {dayjs(data.primary.buch.erscheinungsdatum).format("YYYY")}
          <MerchantsContainer>
            {data.primary.buch.listoflinks &&
              data.primary.buch.listoflinks.map((merchant, idx) => (
                <>
                  <MerchantItem href={merchant.link.url} key={idx}>
                    <Logo src={merchant.merchant.logo_of_merchant.url} />
                  </MerchantItem>
                </>
              ))}
          </MerchantsContainer>
          <p>Am besten bestellen Sie in Ihrer lokalen Buchhandlung!</p>
        </Infos>
      </Header>
      <Description>
        {RichText.render(data.primary.buch.beschreibung)}
      </Description>
      <ReviewsContainer>
        {data.primary.buch.rezensionen.map((review, idx) => (
          <ReviewItem key={idx}>
            <ReviewQoute>{RichText.render(review.text)}</ReviewQoute>
            <ReviewAuthor>{RichText.render(review.name)}</ReviewAuthor>
          </ReviewItem>
        ))}
      </ReviewsContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 1rem;
  max-width: var(--main-width);
  margin: 0 auto;
  margin-top: var(--navbar-height);
  @media screen and (max-width: 768px) {
    margin-top: var(--navbar-mobile-height);
  }
`;
const MerchantsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;
const Description = styled.div`
  max-width: 70ch;
  margin: 6rem auto;
`;
const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const Cover = styled.img`
  width: 100%;
  height: 500px;
  object-fit: contain;
  @media screen and (max-width: 768px) {
    height: 350px;
  }
`;

const Infos = styled.div`
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = styled.img`
  width: 30%;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const MerchantItem = styled.a`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  transition: 0.4s;
  filter: saturate(0);
  &:hover {
    filter: saturate(1);
  }
`;

const ReviewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 70ch;
  margin: 2rem auto;
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2rem;
`;
const ReviewQoute = styled.div`
  font-style: italic;
`;
const ReviewAuthor = styled.div`
  width: 100%;
  text-align: right;
`;
