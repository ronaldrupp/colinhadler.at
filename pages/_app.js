import "../styles/globals.css";
import Head from "next/head";
import NextApp from "next/app";
import Prismic from '@prismicio/client';
import Layout from "../components/layout";

const client = Prismic.client(process.env.PRISMIC_API_URL, {
  accessToken: process.env.PRISMIC_API_ACCESS_TOKEN,
});

export default class MyApp extends NextApp {
  static async getInitialProps(appCtx) {
    const navigation = await client.query(
      Prismic.Predicates.at("document.type", "navigation")
    );
    const footer = await client.query(
      Prismic.Predicates.at("document.type", "footer")
    );
    return {
      props: {
        navigation: navigation.results[0],
        footer: footer.results[0],
      },
    };
  }
  render() {
    const { Component, pageProps, props } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
      <meta name="robots" content="noindex" />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="var(--bg-color)" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Layout footer={props.footer} navigation={props.navigation}>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}
