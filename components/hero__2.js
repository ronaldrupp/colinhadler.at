import styled from "styled-components";
import { RichText } from "prismic-reactjs";
export default function Hero__2({ data }) {
  console.log(data);
  return (
    <Container>
      <BigBgTitle>
        {RichText.render(data.primary.big_background_text)}
      </BigBgTitle>
      <ImageContainer>
        <Image src={data.primary.image.url} />
      </ImageContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 800px;
  padding: 4rem 0;
`;

const BigBgTitle = styled.div`
  font-size: 15rem;
  line-height: 0.9;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  p {
    margin: 0;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img``;
