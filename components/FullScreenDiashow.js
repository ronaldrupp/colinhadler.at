import styled from "styled-components";
import Image from "next/image";
import PrimaryBtn from "./PrimaryBtn";
import XSVG from "./../public/x.svg";
import { useEffect, useRef } from "react";
import Head from "next/head";
export default function FullScreenDiashow({
  images,
  showDiashow,
  closeDia,
  currentImage,
}) {
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute("content", "#000");

  let scrollableContainerRef = useRef();

  useEffect(() => {
    scrollableContainerRef.current.children[currentImage].scrollIntoView();
    // scrollableContainerRef.current?.children[currentImage].scrollintoView();
  }, [scrollableContainerRef]);
  //   if (!showDiashow) return null;
  return (
    <Container>
      <OverlayActions>
        {/* <PrimaryBtn whiteBg>
          <span>Herunterladen</span>
        </PrimaryBtn> */}
        <CloseBtn
          onClick={() => {
            closeDia();
          }}
        >
          <XSVG></XSVG>
        </CloseBtn>
      </OverlayActions>
      <ScrollableContainer ref={scrollableContainerRef}>
        {images.map((image, idx) => (
          <ImageOuterContainer key={image.bild.url}>
            <Image src={image.bild.url} layout="fill" objectFit="contain" />
          </ImageOuterContainer>
        ))}
      </ScrollableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  position: fixed;
  inset: 0;
  z-index: 9999;
  background-color: black;
`;

const ImageOuterContainer = styled.div`
  position: relative;
  min-width: 100vw;
  scroll-snap-align: center;
`;

const ScrollableContainer = styled.div`
  overflow-x: auto;
  display: flex;
  scroll-snap-type: x mandatory;
`;

const OverlayActions = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1em;
  z-index: 9999;
`;

const CloseBtn = styled.button`
  border: none;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  color: white;
  margin-left: 1rem;
  cursor: pointer;
  background-color: transparent;
  &:hover {
  }
`;
