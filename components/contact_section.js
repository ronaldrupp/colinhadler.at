import styled from "styled-components";
import { RichText } from "prismic-reactjs";

export default function ContactSection({ data }) {
  return (
    <Container>
      <InnerContainer>
        <div>
          {RichText.render(data.primary.titel1)}
          {RichText.render(data.primary.text)}
        </div>
        <LinksContainer>
          {data.fields.map((link) => (
            <ExternalLink
              href={link.externer_link.url}
              target={link.externer_link.target}
            >
              {link.name_des_buttons}
            </ExternalLink>
          ))}
        </LinksContainer>
      </InnerContainer>
    </Container>
  );
}

const Container = styled.div`
  padding: 0 1rem;
  max-width: var(--main-width);
  margin: 0 auto;
`;
const InnerContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 2rem 0;
  border-bottom: 1px solid gray;
  h2 {
    font-size: 2rem;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ExternalLink = styled.a`
  color: white;
  background-color: black;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
`;

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
`;
