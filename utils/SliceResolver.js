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
import PressImageGallery from "../components/pressImageGallery";
import PressVideoGallery from "../components/PressVideoGallery";
import TerminList from "../components/terminlist";
import PotraitImageWithText from "../components/PotraitImageWithText";
import LandscapeImageWithText from "../components/LandscapeImageWithText";
import ContactSection from "../components/contact_section";
import ExternalLinksGrid from "../components/ExternalLinksGrid";

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
    case "PagesBodyPresse_medien__bilder":
      return <PressImageGallery data={data} />;
    case "PagesBodyPresse_medien__videos":
      return <PressVideoGallery data={data} />;
    case "PagesBodyTerminliste":
      return <TerminList data={data} />;
    case "PagesBodyUber_mich__image__2":
      return <PotraitImageWithText data={data} />;
    case "PagesBodyUber_mich__image_landscape":
      return <LandscapeImageWithText data={data} />;
    case "PagesBodyKontaktSection":
      return <ContactSection data={data} />;
    case "PagesBodyExternal_link_section":
      return <ExternalLinksGrid data={data} />;
    default:
      return (
        <Container>
          {console.log(data)}
          <code>component not found</code>
        </Container>
      );
  }
}

const Container = styled.div`
  margin: 0 auto;
  padding: 2rem;
  margin: 2rem;
  background-color: black;
  color: white;
  text-align: center;
  border: 1px solid white;
  @keyframes mymove {
    from {
      transform: scaleX(0);
    }
    to {
      tranform: scale(1);
    }
  }
  code {
    position: relative;
    &:after {
      content: "";
      position: absolute;
      bottom: -5px;
      width: 100%;
      height: 1px;
      transform-origin: center center;

      transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1),
        -webkit-transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
      opacity: 1;
      background-color: white;
      left: 0;
      animation: mymove 2s infinite alternate-reverse;
    }
  }
`;
