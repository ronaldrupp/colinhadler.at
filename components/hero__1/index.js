import { RichText } from "prismic-reactjs";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
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

    setDays(days);
    setHours(hours);
    setMinutes(minutes);
    setSeconds(seconds);
  }

  useEffect(() => {
    let countDownInterval = setInterval(() => countDown(), 1000);

    return () => {
      clearInterval(countDownInterval);
    };
  }, []);

  const firstUpdate = useRef(true);

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    gsap.to(countDownRef, { opacity: 1, duration: 1 });
  });

  return (
    <Container>
      <Image
        className="bgBackground"
        layout="fill"
        objectFit="cover"
        src={data.primary.hintergrundbild.url}
        alt={data.primary.hintergrundbild.alt}
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
        <Link href="/ancora">
          <a>
            <Image
              src={data.primary.cover.url}
              width={500}
              height={600}
              objectFit="contain"
              alt={data.primary.cover.alt}
            />
            {/* <Cover src={data.primary.cover.url} /> */}
          </a>
        </Link>
      </Overlay>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 850px;
  position: relative;
  .bgBackground {
    filter: brightness(0.3);
  }
`;

const BgImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  min-height: 600px;
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: calc(var(--main-width) - 200px);
  margin: 0 auto;
  color: white;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }
`;

const Quote = styled.div`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 5rem;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Cover = styled.img`
  max-width: 400px;
  max-height: 70%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  :hover {
    transform: scale(1.1);
  }
  @media screen and (max-width: 768px) {
    width: 300px;
  }
`;

const Time = styled.span`
  font-weight: 300;
  color: white;
  margin-right: 0.5rem;
`;

const Countdown = styled.span`
  color: white;
  font-size: 2rem;
  font-weight: 600;
`;

const TextContent = styled.div`
  padding: 1rem;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
  }
`;
