import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";
import Image from "next/image";
import { useState, useLayoutEffect, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import ChevronDown from "./../public/chevron-down.svg";
import "dayjs/locale/de";

const currentDate = dayjs();

export default function TerminList({ data }) {
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const router = useRouter();
  if (data.fields.length <= 0)
    return (
      <NoEventsContainer>
        <span>Momentan keine öffentlichen Lesungen geplant.</span>
      </NoEventsContainer>
    );
  return (
    <Container>
      <AnimatePresence>
        {showModal ? (
          <Overlay event={modalData} closeModal={() => setShowModal(false)} />
        ) : null}
      </AnimatePresence>
      {data.fields
        .filter((event) => dayjs(event.datum___uhrzeit).isAfter(currentDate))
        .map((event) => (
          <EventItem
            onClick={() => {
              setModalData(event);
              setShowModal(true);
              document.body.style.overflowY = "hidden";
              // router.query.event = event.titel_des_events;
              // router.push(router);
            }}
          >
            <div>
              <Image
                src={
                  event.cover.url
                    ? event.cover.url
                    : "https://images.prismic.io/colinhadler/ea91e83e-7dea-43ba-a355-b1fdd45f387c_colin_9.jpg?auto=compress,format"
                }
                width={500}
                height={450}
                objectFit="cover"
              ></Image>
            </div>
            <EventDetails>
              <EventTitle>{event.titel_des_events}</EventTitle>
              <EventDate>
                {dayjs(event.datum___uhrzeit)
                  .locale("de")
                  .format("DD. MMM YYYY, HH:mm")}{" "}
                Uhr
              </EventDate>
              <EventLocation>{RichText.render(event.ort)}</EventLocation>
            </EventDetails>
          </EventItem>
        ))}
    </Container>
  );
}

function Overlay({ event, closeModal }) {
  return (
    <OverlayContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => {
        document.body.style.overflowY = null;
        closeModal();
      }}
    >
      <OverlayInnerContainer
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={event.cover.url}
          width={768}
          height={650}
          objectFit="cover"
        />
        <DateCircle>
          <span>{dayjs(event.datum___uhrzeit).locale("de").format("MMM")}</span>
          <span>{dayjs(event.datum___uhrzeit).format("DD")}</span>
        </DateCircle>
        <CloseBtn
          onClick={() => {
            document.body.style.overflowY = null;
            closeModal();
          }}
        >
          <ChevronDown></ChevronDown>
        </CloseBtn>
        <OverlayDetails>
          <h1>{event.titel_des_events}</h1>
          <EventDate>
            {dayjs(event.datum___uhrzeit)
              .locale("de")
              .format("DD. MMM YYYY, HH:mm")}{" "}
            Uhr
          </EventDate>
          <EventLocation>{RichText.render(event.ort)}</EventLocation>
          <OverlayDescription>
            {RichText.render(event.beschreibung)}
          </OverlayDescription>
        </OverlayDetails>
      </OverlayInnerContainer>
    </OverlayContainer>
  );
}

const DateCircle = styled.div`
  background-color: black;
  top: 1rem;
  left: 1rem;
  position: absolute;
  color: white;
  border-radius: 999px;
  padding: 0.5rem;
  width: 75px;
  height: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    font-size: 0.75rem;
    text-transform: uppercase;
    &:nth-child(2) {
      font-weight: bold;
      font-size: 1.5rem;
    }
  }
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 9999;
  border: none;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  color: white;
  cursor: pointer;
  background-color: transparent;
  &:hover {
  }
`;
const OverlayContainer = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: rgba(0, 0, 0, 0.8);
  overflow-y: auto;
  padding: 2rem;
  @media screen and (max-width: 768px) {
    padding: 0;
  }
`;

const OverlayInnerContainer = styled(motion.div)`
  background-color: white;
  width: 590px;
  border-radius: var(--border-radius);
  position: relative;
  @media screen and (max-width: 768px) {
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    min-height: 100vh;
  }
`;

const OverlayDetails = styled.div`
  padding: 1rem;
  h1 {
    margin-top: 0;
    line-height: 1.15;
    text-align: start;
  }
  text-align: justify;
`;

const OverlayDescription = styled.div`
  text-align: left;
  a {
    font-weight: 600;
    position: relative;
    &:after {
      content: "";
      height: 2.5px;
      width: 100%;
      background-color: black;
      position: absolute;
      bottom: 0;
      left: 0;
      transform: scaleX(0);
      transform-origin: right center;
      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
        -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    }
    &:hover {
      &:after {
        width: 100%;
        transform: scaleX(1);
        transform-origin: left center;
      }
    }
  }
`;
const Cover = styled.img`
  width: 100%;
`;
const NoEventsContainer = styled.div`
  display: grid;
  place-items: center;
  padding: 4em 1em;
  margin: 0 auto;
  max-width: var(--main-width);
  span {
    font-weight: 100;
    color: rgb(150, 150, 150);
    text-align: center;
  }
`;
const EventDetails = styled.div`
  padding: 0.75em 1em;
`;
const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: var(--main-width);
  padding: 4rem 1rem;
  margin: 0 auto;
  gap: 1rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;
const EventLocation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: gray;
  /* &:before {
    display: inline-block;
    content: "";
    background: url("map-pin.svg") no-repeat top right;
    background-size: contain;
    margin-right: 5px;
    width: 15px;
    height: 15px;
  } */
  p {
    margin: 0;
  }
`;
const EventDate = styled.div`
  /* &:before {
    display: inline-block;
    content: "";
    background: url("calendar.svg") no-repeat top right;
    background-size: contain;
    margin-right: 5px;
    width: 15px;
    height: 15px;
    svg {
      color: white;
    } */
  /* } */
  color: gray;
  margin-top: 1em;
`;
const EventTitle = styled.p`
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0;
  line-height: 1.15;
`;
const EventItem = styled.article`
  display: flex;
  border-radius: var(--border-radius);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.25rem;
  width: 100%;
  background-color: black;
  color: white;
  cursor: pointer;
  transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
    -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  &:hover {
    transform: translateY(-10px);
  }
  a {
    position: relative;
    &:before {
      content: "";
      bottom: 0;
      left: 0;
      position: absolute;
      width: 100%;
      height: 1.5px;
      background-color: black;
      transition: all 0.2s ease-in-out;
      transition-duration: 0.75s;
      width: 0px;
    }

    &:hover {
      &:before {
        width: 100%;
      }
    }
    &:after {
      content: "";
      display: inline-block;
      background: url("external-link.svg") no-repeat top right;
      background-size: contain;
      margin-left: 1px;
      width: 15px;
      height: 15px;
    }
  }
`;
