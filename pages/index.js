import Prismic from "@prismicio/client";
import SliceResolver from "./../utils/SliceResolver";
import Head from "next/head";

export default function Home({ data }) {
  return (
    <>
      <Head>
        <title>Colin Hadler</title>
      </Head>
      {data.body.map((elm) => (
        <SliceResolver slice={elm.slice_type} data={elm} key={elm.slice_type} />
      ))}
    </>
  );
}

export const getStaticProps = async (req, ctx) => {
  const client = Prismic.client(process.env.PRISMIC_API_URL, {
    accessToken: process.env.PRISMIC_API_ACCESS_TOKEN,
  });

  const response = await client.query(
    Prismic.Predicates.at("document.type", "homepage", {
      fetchLinks: "bucher.cover",
    })
  );

  return {
    props: {
      data: response.results[0].data,
    },
  };
};
