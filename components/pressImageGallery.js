import styled from "styled-components";
import PressImageItem from "./PressImageItem";
import { RichText } from "prismic-reactjs";

export default function PressImageGallery({ data }) {
  return (
    <Container>
      {RichText.render(data.primary.titel_des_containers1)}
      {RichText.render(data.primary.beschreibung_des_containers)}
      <InnerContainer>
        {data.fields.map((image, idx) => (
          <PressImageItem image={image} key={idx} />
        ))}
      </InnerContainer>
    </Container>
  );
}

const Container = styled.section`
  max-width: var(--main-width);
  margin: 0 auto;
  padding: 1rem;
`;
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

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: var(--main-width);
  margin: 0 auto;
  grid-gap: 2rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 0.5rem;
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
