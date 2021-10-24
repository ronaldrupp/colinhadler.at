import styled from "styled-components";

export default function HeaderTitle({ data }) {
  return (
    <Container>
      <h1>{data.primary.headertitle[0].text}</h1>
    </Container>
  );
}

const Container = styled.div`
  margin-top: var(--navbar-height);
  max-width: var(--main-width);
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  @media screen and (max-width: 768px) {
    margin-top: var(--navbar-mobile-height);
  }
`;
