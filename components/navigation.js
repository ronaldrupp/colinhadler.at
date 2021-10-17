import styled from "styled-components";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import { useEffect, useState } from "react";
import Logo from "./../public/colin-hadler-logo.svg";

export default function Navigation({ data }) {
  const [windowScroll, setWindowScroll] = useState({ y: 0, x: 0 });
  function handleScroll() {
    setWindowScroll({
      x: window.scrollX,
      y: window.scrollY,
    });
  }
  useEffect(() => {
    let navigationListener = window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", navigationListener);
    };
  }, []);
  return (
    <Container windowScroll={windowScroll}>
      <InnerContainer>
        <Link href="/">
          <a>
            <LogoContainer />
          </a>
        </Link>
        <LinkContainer>
          {data.data.interne_seiten.map((site) => (
            <li key={site.interne_seite.uid}>
              <Link href={site.interne_seite.uid}>
                <a>{RichText.render(site.seitennamen)}</a>
              </Link>
            </li>
          ))}
        </LinkContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  width: 100%;
  height: ${(props) => (props.windowScroll.y > 150 ? "75px" : "150px")};
  border-bottom: ${(props) => props.windowScroll.y > 150 && "1px solid rgb(200,200,200)"};
  top: 0;
  z-index: 999;
  transition: 0.3s;
  background-color: ${(props) =>
    props.windowScroll.y > 150 ? "white" : "transparent"};
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const LogoContainer = styled(Logo)`
  height: 75px;
  object-fit: contain;
`;

const InnerContainer = styled.div`
  width: 100%;
  height: inherit;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 0 1rem;
`;

const LinkContainer = styled.ul`
  display: flex;
  padding: 0;
  list-style: none;
  gap: 1rem;
  a > h2 {
    color: black;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    transition: var(--transition-duration);
  }
  a:hover > h2 {
    filter: brightness(0.5);
  }
`;
