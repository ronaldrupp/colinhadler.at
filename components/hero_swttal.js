import { useEffect, useRef, useState, useLayoutEffect } from "react";
import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";
import Image from "next/image";
import PrimaryBtn from "./PrimaryBtn";

export default function Hero__1({ data }) {
    let textContainerRef = useRef();

    const [days, setDays] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [countdownEnded, setCountdownEnded] = useState(false);

    let countDownRef = useRef();
    function countDown() {
        const total =
            Date.parse("2025-02-25") - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
        if (total < 0) setCountdownEnded(true);
    }

    useLayoutEffect(() => {
        let countDownInterval = setInterval(() => countDown(), 1000);
        return () => {
            clearInterval(countDownInterval);
        };
    }, []);

    useEffect(() => {
        if (!countdownEnded) gsap.to(countDownRef, { opacity: 1, duration: 1 });
        // gsap.to(".quote-line-swattl", { opacity: 1 });
        // let tl = gsap.timeline({
        // });
        // tl.from(".quote-line-swattl", {
        //     yPercent: 150,
        //     ease: "power3.out",
        //     stagger: 0.25,
        //     delay: 0.2,
        //     duration: 2,
        // });
    }, []);

    return (
        <Container>
            <Image
                className="bgBackground"
                layout="fill"
                objectFit="cover"
                src="/DSC02186.jpg"
                alt="Cover"
            />
            <Overlay>
                <TextContent>
                    <Quote ref={textContainerRef} className="hero1-text-container">
                        <WrapParagraph>Jeder hat Angst vor dem Verborgenen.<br/>
                            Aber was, wenn das Gefährlichste das ist, was du bereits siehst?</WrapParagraph>
                        {/* <PrismicRichText
  field={data.primary.kurzbeschreibung}
  components={{
    paragraph: ({ children }) => <WrapParagraph>{children}</WrapParagraph>,
  }}
/> */}
                        {/* <RichText
              richText={data.primary.kurzbeschreibung}
              paragraph={WrapParagraph}
            ></RichText> */}
                        {/* {RichText.render(data.primary.kurzbeschreibung)} */}
                    </Quote>
                    {countdownEnded ? (
                        <Link href="/ancora">
                            <a>
                                <PrimaryBtn whiteBg>Jetzt erhältlich</PrimaryBtn>
                            </a>
                        </Link>
                    ) : (
                        <CountdownContainer ref={(node) => (countDownRef = node)}>
                            <div>Release in</div>
                            <div>
                                <Countdown className="countDown">{days}</Countdown>
                                <Time className="time">d</Time>
                                <Countdown className="countDown">{hours}</Countdown>
                                <Time className="time">h</Time>{" "}
                                <Countdown className="countDown">{minutes}</Countdown>
                                <Time className="time">m</Time>{" "}
                                <Countdown className="countDown">{seconds}</Countdown>
                                <Time className="time">s</Time>
                            </div>
                        </CountdownContainer>
                    )}
                </TextContent>
                <Link href="/seven-ways-to-tell-a-lie">
                    <a>
                        <Image
                            src="/swattal-3d.png"
                            alt="Seven Ways To Tell A Lie Cover"
                            width={500}
                            height={600}
                            objectFit="contain"
                        />
                    </a>
                </Link>
            </Overlay>
        </Container>
    );
}

function WrapParagraph({ children }) {
    return (
        <WrapParagraphContainer>
            <p className="quote-line-swattl">{children}</p>
        </WrapParagraphContainer>
    );
}

const WrapParagraphContainer = styled.div`
  overflow: hidden;
  p {
    margin: 0.5em 0;
    opacity: 1;
  }
`;
const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 850px;
  position: relative;
  .bgBackground {
    filter: brightness(0.6);
  }
  background-color: rgb(20, 20, 20);
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
  max-width: calc(var(--main-width));
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
  p {
    overflow: hidden;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    text-align: center;
    order: 2;
  }
`;

const CountdownContainer = styled.div`
  opacity: 0;
`;

const BuyNowLink = styled.a`
  padding: 1rem;
  background-color: rgb(40, 40, 40);
  color: white;
  cursor: pointer;
`;
