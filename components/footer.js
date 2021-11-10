import styled from "styled-components";
import Link from "next/link";
import { RichText } from "prismic-reactjs";

export default function Footer({ data }) {
  return (
    <Container>
      <InnerContainer>
        <List>
          {data.node.sitemap.map((site) => (
            <Link
              href={site.interne_seite._meta.uid}
              key={site.interne_seite._meta.uid}
            >
              <a>{RichText.render(site.seitennamen)}</a>
            </Link>
          ))}
        </List>
        <LegalNoticeContainer>
          <ul>
            {data.node.legal_notice.map((site) => (
              <li key={site.interne_seiten._meta.uid}>
                <Link href={site.interne_seiten._meta.uid}>
                  <a>{RichText.render(site.seitennamen)}</a>
                </Link>
              </li>
            ))}
          </ul>
        </LegalNoticeContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.footer`
  width: 100%;
  padding: 2rem 0;
  background-color: black;
  color: white;
  h1 {
    margin: 0.25rem 0;
  }
  li {
    list-style: none;
  }
  a {
    transition: all 0.2s ease-in-out;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 50px;
      width: 100%;
      height: 5px;
      transform: scaleX(0);
      transform-origin: right center;
      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
        -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      opacity: 1;
      background-color: white;
      left: 0;
    }
    &:hover {
      cursor: pointer;
      &:after {
        transform: scaleX(1);
        transform-origin: left center;
      }
    }
  }
`;

const InnerContainer = styled.div`
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 0 1rem;
`;

const LegalNoticeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ul{
    padding: 0;
  }
`;

const List = styled.ul`
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
`;
