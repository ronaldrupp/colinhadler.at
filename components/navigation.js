import styled from "styled-components";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import { useEffect, useState } from "react";
import Logo from "./../public/colin-hadler-logo.svg";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "framer-motion";
import MenuSVG from "./../public/menu.svg";
import XSVG from "./../public/x.svg";

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

  useEffect(() => {
    if (showMobileContainer) {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#000");
    } else {
      document
        .querySelector('meta[name="theme-color"]')
        .setAttribute("content", "#fff");
    }
  }, [showMobileContainer]);

  return (
    <>
      <AnimatePresence>
        {showMobileContainer && (
          <MobileContainer
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5 }}
          >
            <MobileUl>
              {data.node.interne_seiten.map((site) => (
                <Link
                  href={site.interne_seite._meta.uid}
                  key={site.interne_seite._meta.uid}
                >
                  <LinkItem
                    onClick={() => {
                      setMobileContainer(!showMobileContainer);
                    }}
                    windowScroll={windowScroll}
                    index={router.route}
                    mobileContainer={showMobileContainer}
                    activeClass={
                      router.asPath === site.interne_seite._meta.uid
                        ? true
                        : false
                    }
                  >
                    {site.label}
                  </LinkItem>
                </Link>
              ))}
            </MobileUl>
          </MobileContainer>
        )}
      </AnimatePresence>
      <Container
        windowScroll={windowScroll}
        index={router.route}
        mobileContainer={showMobileContainer}
      >
        <InnerContainer>
          <Link href="/">
            <LogoContainerLink
              onClick={() => {
                if (showMobileContainer)
                  setMobileContainer(!showMobileContainer);
              }}
            >
              <LogoContainer
                windowScroll={windowScroll}
                index={router.route}
                mobileContainer={showMobileContainer}
              />
            </LogoContainerLink>
          </Link>
          <MenuButton
            onClick={() => setMobileContainer(!showMobileContainer)}
            aria-label="Menu Button"
          >
            <AnimatePresence>
              <MenuIcon>
                <MenuLine
                  className={` ${
                    showMobileContainer ? "firstActive white" : "first"
                  } ${
                    router.route === "/" && windowScroll.y < 60
                      ? "white"
                      : "black"
                  }`}
                ></MenuLine>
                <MenuLine
                  className={` ${
                    showMobileContainer ? "secondActive white" : "second"
                  } ${
                    router.route === "/" && windowScroll.y < 60
                      ? "white"
                      : "black"
                  }`}
                ></MenuLine>
              </MenuIcon>
            </AnimatePresence>
          </MenuButton>
          <LinkContainer>
            {data.node.interne_seiten.map((site) => (
              <li key={site.interne_seite._meta.uid}>
                <Link href={site.interne_seite._meta.uid}>
                  <LinkItem
                    windowScroll={windowScroll}
                    index={router.route}
                    mobileContainer={showMobileContainer}
                    active={
                      router.asPath === "/" + site.interne_seite._meta.uid
                        ? true
                        : false
                    }
                  >
                    {site.label}
                  </LinkItem>
                </Link>
              </li>
            ))}
          </LinkContainer>
        </InnerContainer>
      </Container>
    </>
  );
}

const MenuSVGContainer = styled.div`
  stroke: ${(props) =>
    (props.windowScroll.y < 60 && props.index === "/") || props.mobileContainer
      ? "white"
      : "black"};
`;
const MobileUl = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const MobileLinkItem = styled.a``;

const LinkItem = styled.a`
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  transition: var(--transition-duration);
  position: relative;
  overflow: hidden;
  color: ${(props) =>
    (props.windowScroll.y < 60 && props.index === "/") || props.mobileContainer
      ? "white"
      : "black"};
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    height: 1px;
    transform-origin: right center;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
      -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    background-color: ${(props) =>
      (props.windowScroll.y < 60 && props.index === "/") ||
      props.mobileContainer
        ? "white"
        : "black"};
    transform: ${(props) => {
      return props.active ? "scaleX(1)" : "scaleX(0)";
    }};
  }
  &:hover {
    cursor: pointer;
    &:after {
      transform: scaleX(1);
      transform-origin: left center;
    }
  }
  @media screen and (max-width: 768px) {
    font-size: 2rem;
    margin: 0;
    margin-bottom: 1rem;
    &:after {
      height: 5px;
    }
  }

  font-size: 1rem;
  transition: all 0.2s ease-in-out;
  position: relative;
`;

const Container = styled.nav`
  position: fixed;
  width: 100%;
  height: ${(props) => (props.windowScroll.y > 60 ? "75px" : "150px")};
  border-bottom: ${(props) =>
    props.windowScroll.y > 60 && !props.mobileContainer
      ? "1px solid rgba(200,200,200,0.6)"
      : "none"};
  top: 0;
  z-index: 999;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  /* filter: ${(props) =>
    (props.windowScroll.y < 60 && props.index === "/") || props.mobileContainer
      ? "invert(1)"
      : "invert(0)"}; */
  background-color: ${(props) => {
    if (props.windowScroll.y > 60 && !props.mobileContainer) {
      return "rgba(255,255,255,1)";
    } else if (props.mobileContainer) {
      return "black";
    } else {
      return "transparent";
    }
  }};
  /* backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px); */
  @media screen and (max-width: 768px) {
    height: var(--navbar-mobile-height);
  }
`;

const LogoContainerLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const LogoContainer = styled(Logo)`
  height: 50px;
  object-fit: contain;
  filter: ${(props) =>
    (props.windowScroll.y < 60 && props.index === "/") || props.mobileContainer
      ? "invert(1)"
      : "invert(0)"};
  @media screen and (max-width: 768px) {
    height: 20px;
  }
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
  z-index: 2;
`;

const LinkContainer = styled.ul`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0;
  list-style: none;
  /* gap: 1rem; */
  li {
    margin-left: 1rem;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MenuButton = styled.button`
  display: none;
  padding: 0;
  @media screen and (max-width: 768px) {
    width: 45px;
    height: 45px;
    border: none;
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const MenuIcon = styled.span`
  width: 60%;
  height: 50px;
  position: relative;
  .white {
    background-color: white;
  }
  .first {
    /* top:5px; */
    transform: translateY(20px);
  }
  .second {
    /* bottom:5px; */
    transform: translateY(30px);
  }
  .firstActive {
    transform: translateY(20px) rotateZ(-45deg);
  }
  .secondActive {
    transform: translateY(20px) rotateZ(45deg);
  }
`;

const MenuLine = styled.span`
  position: absolute;
  width: 100%;
  background-color: black;
  height: 1px;
  transition: 0.3s;
  left: 0;
`;

const MobileContainer = styled(motion.div)`
  width: 100%;
  min-height: 100vh;
  position: fixed;
  inset: 0;
  background-color: var(--primary-color);
  color: white;
  z-index: 999;
  padding: 1rem;
  padding-top: calc(var(--navbar-mobile-height) + 50px);
  ul,
  li {
    list-style: none;
  }
`;
