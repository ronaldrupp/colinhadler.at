import SliceResolver from "./../utils/SliceResolver";
import Head from "next/head";
import { PrismicLink } from "apollo-link-prismic";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import fragmentTypes from "./../utils/fragmentTypes.json";

import { impressumSlices } from "../prismic-graphql-querries";
export default function Page({ data }) {
  return (
    <>
      <Head>
        <title> | Colin Hadler</title>
      </Head>
      {data.allPagess.edges[0].node.body.map((elm) => (
        <SliceResolver slice={elm.slice_type} data={elm} key={elm.slice_type} />
      ))}
    </>
  );
}

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: fragmentTypes,
});
const client = new ApolloClient({
  link: PrismicLink({
    uri: "https://colinhadler.cdn.prismic.io/graphql",
    accessToken: process.env.PRISMIC_API_ACCESS_TOKEN,
  }),
  cache: new InMemoryCache({ fragmentMatcher }),
});

export const getStaticProps = async (ctx) => {
  const response = await client.query({
    query: gql`
      query{
        allPagess(uid: "${ctx.params.uid}") {
          edges {
            node {
              _meta {
                uid
              }
              body {
                __typename
                ... on PagesBodyBuch_detail{
            primary{
              buch{
               ... on Bucher {
                  cover
                  beschreibung
                  isnew
                  erscheinungsdatum
                  titel
                  rezensionen{
                    bild
                    text
                    name
                  }
                  listoflinks {
                    link {
                      ... on _ExternalLink{
                        url
                        target
                      }
                    }
                    merchant{
                      ... on Merchants{
                        logo_of_merchant
                      }
                    }
                  }
                }
              }
            }
          }
                ... on PagesBodyHero_2 {
                  primary {
                    big_background_text
                    image
                  }
                }
                ... on PagesBodyCentered_text {
                  primary {
                    text
                  }
                }
                ... on PagesBodyFreier_text {
                  primary {
                    text
                  }
                }
                ... on PagesBodyGallerie {
                  fields {
                    bild
                    beschreibung
                  }
                }
                ... on PagesBodyHeader {
                  primary {
                    headertitle
                  }
                }
                ... on PagesBodyAll_books {
                  fields {
                    buch {
                      ... on Bucher {
                        _meta {
                          uid
                        }
                        erscheinungsdatum
                        beschreibung
                        isnew
                        titel
                        cover
                      }
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
  // console.log(response.data.allPagess.edges);
  return {
    props: {
      data: response.data,
    },
  };
};

export const getStaticPaths = async () => {
  const response = await client.query({
    query: gql`
      {
        allPagess {
          edges {
            node {
              _meta {
                uid
              }
            }
          }
        }
      }
    `,
  });
  const paths = response.data.allPagess.edges.map((page) => {
    return {
      params: { uid: page.node._meta.uid },
    };
  });

  return {
    paths,
    fallback: false,
  };
};
