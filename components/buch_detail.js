import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";
import Link from "next/link";
import InfoSvg from "./../public/info.svg";
import Image from 'next/image'

export default function Buch_Detail({ data }) {
  return (
    <>
      <Container>
        <BackLink>
          <Link href="/buecher">
            <BackLinkA>Zur Übersicht</BackLinkA>
          </Link>
        </BackLink>
        <Header>
          <Cover src={data.primary.buch.cover.url} />
          <Infos>
            {RichText.render(data.primary.buch.titel)}
            {dayjs(data.primary.buch.erscheinungsdatum).format("YYYY")}
            <MerchantsContainer>
              {data.primary.buch.listoflinks &&
                data.primary.buch.listoflinks.map((merchant, idx) => (
                  <>
                    <MerchantItem
                      href={merchant.link.url}
                      target="_blank"
                      key={idx}
                    >
                      <Image
                        src={merchant.merchant.logo_of_merchant.url}
                        width={100}
                        height={25}
                        objectFit="contain"
                      />
                    </MerchantItem>
                  </>
                ))}
            </MerchantsContainer>
            <InfoParagraph>
              <InfoSvg />
              <p>Am besten bestellen Sie in Ihrer lokalen Buchhandlung!</p>
            </InfoParagraph>
          </Infos>
        </Header>
        <Description>
          {RichText.render(data.primary.buch.beschreibung)}
        </Description>
      </Container>

      <ReviewsContainer>
        {data.primary.buch.rezensionen.map((review, idx) => (
          <ReviewItem key={idx}>
            <ReviewQoute>{RichText.render(review.text)}</ReviewQoute>
            <ReviewAuthor>{RichText.render(review.name)}</ReviewAuthor>
          </ReviewItem>
        ))}
      </ReviewsContainer>
    </>
  );
}

const InfoParagraph = styled.div`
  background-color: var(--gray-color);
  padding: 1em;
  border-radius: var(--border-radius);
  font-size: 0.875em;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 1.5em;
  p {
    margin: 0.1em 0;
  }
  svg {
    margin-right: 0.5em;
  }
`;
const BackLinkA = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  font-size: 0.85rem;
  :before {
    display: inline-block;
    content: "";
    background: url("arrow-left.svg");
    width: 20px;
    height: 20px;
    margin-right: 0.25rem;
  }
  :after {
    transition: all 0.2s ease-in-out;
    position: relative;
    content: "";
    position: absolute;
    bottom: 0px;
    width: 100%;
    height: 1px;
    transform: scaleX(0);
    transform-origin: right center;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
      -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    background-color: black;
    left: 0;
  }
  &:hover {
    cursor: pointer;
    &:after {
      transform: scaleX(1);
      transform-origin: left center;
    }
  }
`;
const BackLink = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-bottom: 4rem;
  text-transform: uppercase;
  font-weight: 100;
`;
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
  width:100%;
`;
const Description = styled.div`
  max-width: 70ch;
  margin: 6rem auto;
  text-align: justify;
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
  border-radius: var(--border-radius);
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
  width: 100%;
  background-color: rgb(40, 40, 40);
  color: white;
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  max-width: 70ch;
  margin: 2rem auto;
  padding: 1rem;
`;
const ReviewQoute = styled.div`
  font-style: italic;
  font-weight: 500;
`;
const ReviewAuthor = styled.div`
  width: 100%;
  text-align: right;
`;
