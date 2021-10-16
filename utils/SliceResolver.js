import Hero__1 from "../components/hero__1";
import UberMichSection from "../components/uber-mich-section";
import KontaktBanner from "../components/kontakt_banner";
import MeineBucherSection from "../components/meine-bucher_section";
import TermineSection from "../components/termine_section";

export default function SliceResolver({ slice, data }) {
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
    default:
      return <div>component not found</div>;
  }
}
