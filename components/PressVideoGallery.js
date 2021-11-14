import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import PlaySVG from "./../public/play.svg";

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
          <PlaySVG className="playSVG" />
          {RichText.render(video.titel1)}
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
  padding: 2rem;
  color: white;
  font-size: 1rem;
  border-radius: 0.25rem;
  aspect-ratio: 16/9;
  h3 {
    margin: 0;
    margin-top: 0.5rem;
  }
  .playSVG {
    width: 50px;
  }
`;
