import "../styles/globals.css";
import Head from "next/head";
import NextApp from "next/app";
import Prismic from "@prismicio/client";
import Layout from "../components/layout";
import { motion, AnimatedPresence, AnimatePresence } from "framer-motion";
import { PrismicLink } from "apollo-link-prismic";
import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { withRouter } from "next/router";
const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://colinhadler.cdn.prismic.io/graphql",
    accessToken: process.env.PRISMIC_API_ACCESS_TOKEN,
  }),
  cache: new InMemoryCache(),
});

class MyApp extends NextApp {
  static async getInitialProps(appCtx) {
    const response = await client.query({
      query: gql`
        {
          allNavigations {
            edges {
              node {
                interne_seiten {
                  seitennamen
                  interne_seite {
                    ... on Pages {
                      _meta {
                        uid
                      }
                    }
                  }
                }
              }
            }
          }
          allFooters {
            edges {
              node {
                sitemap {
                  seitennamen
                  interne_seite {
                    ... on Pages {
                      _meta {
                        uid
                      }
                    }
                  }
                }
                legal_notice {
                  seitennamen
                  interne_seiten {
                    ... on Pages {
                      _meta {
                        uid
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
    return {
      props: {
        navigation: response.data.allNavigations.edges[0],
        footer: response.data.allFooters.edges[0],
      },
    };
  }
  render() {
    const { Component, pageProps, props, router } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta charSet="utf-8" />
          <meta name="theme-color" content="#000" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400&display=swap"
            rel="stylesheet"
          />
        </Head>

        <Layout footer={props.footer} navigation={props.navigation}>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              key={router.asPath}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </Layout>
      </>
    );
  }
}

export default withRouter(MyApp);
