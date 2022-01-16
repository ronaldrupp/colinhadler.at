import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import ExternalLinkSVG from "./../public/external-link.svg";
import Gallerie from "./gallerie";

export default function ExternalLinksGrid({ data }) {
  // function logEventToGA(name) {
  //   if (window) {
  //     ga.event({
  //       action: "Klick",
  //       params: {
  //         name,
  //       },
  //     });
  //   }
  // }
  return (
    <Container>
      {RichText.render(data.primary.titel1)}
      {RichText.render(data.primary.beschreibung)}
      <InnerContainer>
        {data.fields.map((video, idx) => (
          <ExternalLink
            href={video.external_link.url}
            target="_blank"
            key={idx}
            // onClick={() => {
            //   logEventToGA(video.label);
            // }}
          >
            <DetailContainer>
              <ExternalLinkSVG className="exLinkSVG" />
              <span>{video.label}</span>
            </DetailContainer>
          </ExternalLink>
        ))}
      </InnerContainer>
    </Container>
  );
}

const DetailContainer = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 50px auto;
  span {
    font-weight: 600;
    font-size: 1.25rem;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
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
  flex-grow: 1;
  .exLinkSVG {
    width: 50px;
    stroke: white;
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
