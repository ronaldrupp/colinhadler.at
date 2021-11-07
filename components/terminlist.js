import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import dayjs from "dayjs";

export default function TerminList({ data }) {
  console.log(data);
  return (
    <Container>
      {data.fields.map((event) => (
        <EventItem>
          <EventTitle>{event.titel_des_events}</EventTitle>
          <EventDetails>
            <EventDate>
              {dayjs(event.datum___uhrzeit).format("DD. MMM YYYY")}
            </EventDate>
            <EventLocation>{RichText.render(event.ort)}</EventLocation>
          </EventDetails>
        </EventItem>
      ))}
    </Container>
  );
}

const EventDetails = styled.div`
  margin-top: 1rem;
`;
const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: var(--main-width);
  padding: 1rem;
  margin: 0 auto;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
const EventLocation = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  &:before {
    display: inline-block;
    content: "";
    background: url("map-pin.svg") no-repeat top right;
    background-size: contain;
    margin-right: 5px;
    width: 15px;
    height: 15px;
  }
  p {
    margin: 0;
  }
`;
const EventDate = styled.div`
  &:before {
    display: inline-block;
    content: "";
    background: url("calendar.svg") no-repeat top right;
    background-size: contain;
    margin-right: 5px;
    width: 15px;
    height: 15px;
  }
`;
const EventTitle = styled.p`
  font-weight: 800;
  font-size: 1.5rem;
  margin: 0;
`;
const EventItem = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0.25rem;
  border: 1px solid gray;
  width: 100%;
  padding: 1rem;
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
