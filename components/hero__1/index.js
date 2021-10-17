import { RichText } from "prismic-reactjs";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import gsap from "gsap";

export default function Hero__1({ data }) {
  const [days, setDays] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  let countDownRef = useRef();
  function countDown() {
    const total =
      Date.parse(data.primary.releasedatum) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    // Display the result in the element with id="demo"
    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);

  }

  useEffect(() => {
    let countDownInterval = setInterval(() => countDown(), 1000);
    gsap.to(countDownRef, { opacity: 1, duration: 1 });

    return () => {
      clearInterval(countDownInterval);
    };
  }, []);

  return (
    <Container>
      <BgImage
        className="bgBackground"
        src={data.primary.hintergrundbild.url}
      />
      <Overlay>
        <TextContent>
          <Quote>{RichText.render(data.primary.kurzbeschreibung)}</Quote>
          <div>Release in</div>
          <div style={{ opacity: 0 }} ref={(node) => (countDownRef = node)}>
            <Countdown className="countDown">{days}</Countdown>
            <Time className="time">d</Time>
            <Countdown className="countDown">{hours}</Countdown>
            <Time className="time">h</Time>{" "}
            <Countdown className="countDown">{minutes}</Countdown>
            <Time className="time">m</Time>{" "}
            <Countdown className="countDown">{seconds}</Countdown>
            <Time className="time">s</Time>
          </div>
        </TextContent>
        <Cover src={data.primary.cover.url} />
      </Overlay>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
`;

const BgImage = styled.img`
  width: 100%;
  min-height: 100vh;
  object-fit: cover;
  filter: brightness(0.5);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: calc(var(--main-width) - 200px);
  margin: 0 auto;
  color: white;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const Quote = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 5rem;
  @media screen and (max-width: 768px){
    display: none;
  }
`;

const Cover = styled.img`
  max-width: 400px;
  height: auto;
  object-fit: contain;
`;

const Time = styled.span`
  font-weight: 500;
  color: white;
  margin-right: 0.5rem;
`;

const Countdown = styled.span`
  color: white;
  font-size: 2rem;
  font-weight: 800;
`;

const TextContent = styled.div``;
