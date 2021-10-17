import Hero__1 from "../components/hero__1";
import UberMichSection from "../components/uber-mich-section";
import KontaktBanner from "../components/kontakt_banner";
import MeineBucherSection from "../components/meine-bucher_section";
import TermineSection from "../components/termine_section";
import Hero__2 from "../components/hero__2";
import Centered_Text from "../components/centered_text";
import Freier_Text from "../components/freier_text";
import Gallerie from "../components/gallerie";
import HeaderTitle from "../components/header-title";

import styled from "styled-components";

export default function SliceResolver({ slice, data }) {
  console.log(data);
  switch (data.slice_type) {
    case "hero__1":
      return <Hero__1 data={data} />;
    case "uber-mich_section":
      return <UberMichSection data={data} />;
    case "meine-bucher_section":
      return <MeineBucherSection data={data} />;
    case "termine_section":
      return <TermineSection data={data}></TermineSection>;
    case "kontakt_banner":
      return <KontaktBanner data={data} />;
    case "hero_2":
      return <Hero__2 data={data} />;
    case "centered_text":
      return <Centered_Text data={data} />;
    case "freier_text":
      return <Freier_Text data={data} />;
    case "gallerie":
      return <Gallerie data={data} />;
    case "header":
      return <HeaderTitle data={data} />;
    default:
      return <Container>component not found</Container>;
  }
}

const Container = styled.div`
  margin: 0 auto;
  padding: 1rem;
  background-color: black;
  color: white;
  text-align: center;
`;
