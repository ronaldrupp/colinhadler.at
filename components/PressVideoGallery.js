import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import PlaySVG from "./../public/play.svg";
import Image from "next/image";

export default function PressVideoGallery({ data }) {
  return (
    <Container>
      {RichText.render(data.primary.titel_des_containers1)}
      {RichText.render(data.primary.beschreibung_des_containers)}
      <InnerContainer>
        {data.fields.map((video, idx) => (
          <VideoLink
            href={video.externer_videolink.url}
            target="_blank"
            key={idx}
          >
            <Image
              src={video.image.url}
              width={379}
              height={200}
              objectFit="cover"
            />
            <VideoDescription>
              <PlaySVG className="playSVG" />
              <VideoTitel>{video.titel1}</VideoTitel>
            </VideoDescription>
          </VideoLink>
        ))}
      </InnerContainer>
    </Container>
  );
}
const Container = styled.section`
  max-width: var(--main-width);
  padding: 4rem 1rem;
  margin: 0 auto;
`;
const InnerContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const VideoLink = styled.a`
  background-color: black;
  color: white;
  font-size: 1rem;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  h3 {
    margin: 0;
    margin-top: 0.5rem;
  }
  .playSVG {
    width: 25px;
  }
  img {
    border-radius: 0.25rem 0.25rem 0 0;
  }
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    transform: translateY(-10px);
  }
  @media screen and (max-width: 768px) {
    :hover {
      transform: translateX(10px);
    }
  }
`;

const VideoDescription = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-grow: 1;
  z-index: 2;
`;

const VideoTitel = styled.span`
  font-weight: 600;
  margin-left: 1rem;
`;
