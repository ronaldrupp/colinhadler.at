import styled from "styled-components";
import Link from "next/link";
import { RichText } from "prismic-reactjs";

export default function Footer({ data }) {
  return (
    <Container>
      <InnerContainer>
        <ul>
          {data.data.sitemap.map((site) => (
            <li key={site.interne_seite.uid}>
              <Link href={site.interne_seite.uid}>
                <a>{RichText.render(site.seitennamen)}</a>
              </Link>
            </li>
          ))}
        </ul>
        <LegalNoticeContainer>
          <ul>
            {data.data.legal_notice.map((site) => (
              <li key={site.interne_seiten.uid}>
                <Link href={site.interne_seiten.uid}>
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
  h1 {
    margin: 0.25rem 0;
  }
  ul {
    padding: 0;
  }
  li {
    list-style: none;
  }
  a {
    transition: 0.3s;
    &:hover {
      filter: brightness(0.7);
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
`;
