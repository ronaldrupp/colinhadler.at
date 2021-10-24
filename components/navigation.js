import styled from "styled-components";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import { useEffect, useState } from "react";
import Logo from "./../public/colin-hadler-logo.svg";
import { useRouter } from "next/router";

export default function Navigation({ data }) {
  const router = useRouter();
  const [showMobileContainer, setMobileContainer] = useState(false);
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
    <>
      {showMobileContainer && (
        <MobileContainer>
          <button onClick={() => setMobileContainer(false)}>button</button>
        </MobileContainer>
      )}
      <Container windowScroll={windowScroll} index={router.route}>
        <InnerContainer>
          <Link href="/">
            <a>
              <LogoContainer />
            </a>
          </Link>
          <MenuButton onClick={() => setMobileContainer(true)}>
            BUTTON
          </MenuButton>
          <LinkContainer>
            {data.node.interne_seiten.map((site) => (
              <li key={site.interne_seite._meta.uid}>
                <Link href={site.interne_seite._meta.uid}>
                  <a>{RichText.render(site.seitennamen)}</a>
                </Link>
              </li>
            ))}
          </LinkContainer>
        </InnerContainer>
      </Container>
    </>
  );
}

const Container = styled.nav`
  position: fixed;
  width: 100%;
  height: ${(props) => (props.windowScroll.y > 60 ? "75px" : "150px")};
  border-bottom: ${(props) =>
    props.windowScroll.y > 60 && "1px solid rgb(200,200,200)"};
  top: 0;
  z-index: 999;
  transition: 0.3s;
  filter: ${(props) =>
    props.windowScroll.y < 60 && props.index === "/"
      ? "invert(1)"
      : "invert(0)"};
  background-color: ${(props) =>
    props.windowScroll.y > 60 ? "white" : "transparent"};
  @media screen and (max-width: 768px) {
    height: var(--navbar-mobile-height);
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
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  list-style: none;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    display: none;
  }
  a > h2 {
    color: inherit;
    font-size: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    transition: var(--transition-duration);
    position: relative;
    overflow: hidden;

    &:after {
      content: "";
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 0;
      height: 1px;
      transition: all 0.15s ease-in-out;
      transition-duration: 0.75s;
      background-color: black;
      transform: translateX(-100%);
    }
    &:hover {
      cursor: pointer;
      &:after {
        transform: translateX(0%);
      }
    }
  }
  a {
    font-size: 1rem;
    transition: all 0.2s ease-in-out;
    position: relative;
    &:after {
      content: "";
      position: absolute;
      top: 50px;
      width: 0px;
      height: 5px;
      transition: all 0.2s ease-in-out;
      transition-duration: 0.75s;
      opacity: 1;
      background-color: inherit;
      left: 0;
    }
    &:hover {
      cursor: pointer;
      &:after {
        width: 100%;
        opacity: 1;
      }
    }
  }
`;

const MenuButton = styled.button`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const MobileContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  inset: 0;
  background-color: var(--bg-color);
  z-index: 9999;
`;
