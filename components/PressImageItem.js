import styled from "styled-components";
import { useState, useRef } from "react";
import { RichText } from "prismic-reactjs";
import gsap from "gsap";

export default function PressImageItem({ image }) {
  let ContainerRef = useRef();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(false);
  const download = (url, name) => {
    if (!url) {
      throw new Error("Resource URL not provided! You need to provide one");
    }
    setFetching(true);
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        setFetching(false);
        const blobURL = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = blobURL;
        a.style = "display: none";

        if (name && name.length) a.download = name;
        document.body.appendChild(a);
        a.click();
      })
      .catch(() => setError(true));
  };
  return (
    <ImageItem>
      <Image
        src={image.bild.url}
      ></Image>
      <InfoContainer>
        <ResolutionIndicator>
          {image.bild.dimensions.width}x{image.bild.dimensions.height}
        </ResolutionIndicator>
        <TitelContainer>{RichText.render(image.titel1)}</TitelContainer>
        <SubtitleContainer>
          {RichText.render(image.untertitel)}
        </SubtitleContainer>
        <DownloadBtn onClick={() => download(image.bild.url, image.titel1)}>
          {fetching ? "lädt..." : "Herunterladen"}
        </DownloadBtn>
      </InfoContainer>
    </ImageItem>
  );
}

const TitelContainer = styled.div`
  font-weight: 800;
  p {
    margin-bottom: 0rem;
  }
`;
const SubtitleContainer = styled.div`
  color: gray;
  font-size: 0.75rem;
  * {
    margin: 0;
  }
`;
const ResolutionIndicator = styled.span`
  border: 1px solid gray;
  padding: 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: gray;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: var(--main-width);
  margin: 0 auto;
  grid-gap: 2rem;
  padding: 1rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
    padding: 0.5rem;
  }
`;

const Image = styled.img`
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  background-color: rgb(220, 220, 220);
  border-radius: 0.25rem;
`;

const ImageItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  border: 1px solid rgb(200, 200, 200);
  padding: 1rem;
  border-radius: 0.25rem;
  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-top: 1rem;
`;

const DownloadBtn = styled.button`
  background-color: black;
  border: 0;
  width: 100%;
  padding: 1rem;
  border-radius: 0.25rem;
  color: white;
  font-weight: 600;
  margin-top: 1rem;
  cursor: pointer;
  :active {
    filter: brightness(0.3);
  }
`;
