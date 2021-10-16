import Prismic from "@prismicio/client";
import SliceResolver from './../utils/SliceResolver';

export default function Home() {
  return (
    <>
      {/* {data.body.map((elm) => (
        <SliceResolver slice={elm.slice_type} data={elm} key={elm.slice_type} />
      ))} */}
    </>
  );
}

export const getStaticProps = async (req, ctx) => {
  const client = Prismic.client(process.env.PRISMIC_API_URL, {
    accessToken: PRISMIC_API_ACCESS_TOKEN,
  });

  const response = await client.query(
    Prismic.Predicates.at("document.type", "homepage")
  );

  return {
    props: {
      data: response.results[0].data,
    },
  };
};
