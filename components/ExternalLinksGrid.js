import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import ExternalLinkSVG from "./../public/external-link.svg";

export default function ExternalLinksGrid({ data }) {
  return (
    <Container>
      {RichText.render(data.primary.titel1)}
      {RichText.render(data.primary.beschreibung)}

      <InnerContainer>
        {console.log(data.fields)}
        {data.fields.map((video, idx) => (
          <ExternalLink
            href={video.external_link.url}
            target="_blank"
            key={idx}
          >
            <ExternalLinkSVG className="exLinkSVG" />
            <h2>{video.label}</h2>
          </ExternalLink>
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

const InnerContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const ExternalLink = styled.a`
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
  .exLinkSVG {
    width: 50px;
    stroke: white;
  }
`;
