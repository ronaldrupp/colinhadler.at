import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import PrimaryBtn from "./PrimaryBtn";
import { useEffect, useRef } from "react";
import PrismicLinkResolver from "./PrismicLinkResolver";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import Link from "next/link";

const BuchHero = ({ slice }) => {
  const backgroundImageRef = useRef();
  const descriptionContainerRef = useRef();
  useEffect(() => {
    gsap.to(descriptionContainerRef.current, {
      scrollTrigger: {
        trigger: descriptionContainerRef.current,
        start: "top",
        end: "bottom",
        scrub: 1,
      },
      scale: 0.5,
      autoAlpha: 0,
      duration: 1,
    });
    gsap.from(backgroundImageRef.current, {
      scrollTrigger: {
        trigger: descriptionContainerRef.current,
        start: "top",
        end: "bottom",
        scrub: 1,
      },
      autoAlpha: 0,
      duration: 1,
    });
  });
  console.log(slice);
  return (
    <section className="needsTransparentNav">
      <div className="background-image">
        <div className="desc-layer" ref={descriptionContainerRef}>
          <span className="description">
            {slice.primary.kurzbeschreibung ? (
              <PrismicRichText field={slice.primary.kurzbeschreibung} />
            ) : (
              <h2>Template slice, update me!</h2>
            )}
          </span>
        </div>
        <div className="backgroundImage" ref={backgroundImageRef}>
          <Image
            layout="fill"
            objectFit="cover"
            src={slice.primary.hintergrundbild?.url}
            alt={slice.primary.hintergrundbild?.alt}
          />
        </div>
      </div>
      <div className="overlay">
        {slice.primary.cover ? (
          <Image
            src={slice.primary.cover.url}
            width={450}
            height={500}
            objectFit="contain"
            alt={slice.primary.cover.alt}
          />
        ) : (
          <h2>Template slice, update me!</h2>
        )}
        {slice.primary.link ? (
          //   <PrismicLinkResolver
          //     link={slice.primary.link}
          //     style={{ marginTop: "2rem" }}
          //   >
          <Link href={`/${slice.primary.link._meta.uid}`}>
            <a>
              <PrimaryBtn whiteBg>
                {slice.primary.linklabel ? slice.primary.linklabel : ""}
              </PrimaryBtn>
            </a>
          </Link>
        ) : (
          //   </PrismicLinkResolver>
          <h2>Template slice, update me!</h2>
        )}
      </div>

      <style jsx>{`
        section {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: flex-start;
          position: relative;
          background-color: black;
        }
        .description {
          color: white;
          position: absolute;
          max-width: 20ch;
          text-align: center;
          font-weight: 700;
          font-size: 1.5rem;
        }
        .background-image {
          width: 100%;
          height: 100vh;
          position: sticky;
          top: 0;
        }
        .background-image > image {
          filter: brightness(0.5);
        }
        .desc-layer {
          position: absolute;
          top: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100vh;
          z-index: 2;
          text-align: center;
        }
        .overlay {
          z-index: 2;
          position: sticky;
          top: 0;
          margin-top: 0;
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .backgroundImage {
          width: 100%;
          height: 100%;
          filter: brightness(0.6);
        }
      `}</style>
    </section>
  );
};

export default BuchHero;
