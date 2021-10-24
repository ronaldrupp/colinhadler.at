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
import All_Books from "../components/all_books";
import Buch_Detail from "../components/buch_detail";

export default function SliceResolver({ slice, data }) {
  switch (data.__typename) {
    case "HomepageBodyHero__1":
      return <Hero__1 data={data} />;
    case "HomepageBodyUberMich_section":
      return <UberMichSection data={data} />;
    case "HomepageBodyMeineBucher_section":
      return <MeineBucherSection data={data} />;
    case "HomepageBodyTermine_section":
      return <TermineSection data={data}></TermineSection>;
    case "HomepageBodyKontakt_banner":
      return <KontaktBanner data={data} />;
    case "PagesBodyHero_2":
      return <Hero__2 data={data} />;
    case "PagesBodyCentered_text":
      return <Centered_Text data={data} />;
    case "PagesBodyFreier_text":
      return <Freier_Text data={data} />;
    case "PagesBodyGallerie":
      return <Gallerie data={data} />;
    case "PagesBodyHeader":
      return <HeaderTitle data={data} />;
    case "PagesBodyAll_books":
      return <All_Books data={data} />;
    case "PagesBodyBuch_detail":
      return <Buch_Detail data={data} />;
    default:
      return <Container>{console.log(data)}component not found</Container>;
  }
}

const Container = styled.div`
  margin: 0 auto;
  padding: 1rem;
  background-color: black;
  color: white;
  text-align: center;
`;
