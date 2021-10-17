import Prismic from "@prismicio/client";
import SliceResolver from "./../utils/SliceResolver";
import Head from "next/head";

export default function Page({ data }) {
  return (
    <>
      <Head>
        <title>{data.data.titel[0].text} | Colin Hadler</title>
      </Head>
      {data.data.body.map((elm) => (
        <SliceResolver slice={elm.slice_type} data={elm} key={elm.slice_type} />
      ))}
    </>
  );
}

const client = Prismic.client(process.env.PRISMIC_API_URL, {
  accessToken: process.env.PRISMIC_API_ACCESS_TOKEN,
});

export const getStaticProps = async (ctx) => {
  const response = await client.getByUID("pages", ctx.params.uid);
  return {
    props: {
      data: response,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.query(
    Prismic.Predicates.at("document.type", "pages")
  );
  const paths = response.results.map((page) => {
    return {
      params: { uid: page.uid },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
