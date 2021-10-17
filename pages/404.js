import styled from "styled-components";

export default function NotFoundPage() {
  return (
    <Container>
      <Title>Page not found</Title>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 600px;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: white;
`;
