import SliceResolver from "./../utils/SliceResolver";
import { PrismicLink } from "apollo-link-prismic";
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import fragmentTypes from "./../utils/fragmentTypes.json";
import { NextSeo, SocialProfileJsonLd } from "next-seo";
import HeroScroll from "./../components/HeroScroll";

export default function Home({ data }) {
  const { page_title, page_description, page_images } = data;
  return (
    <>
      <NextSeo
        title={page_title}
        description={page_description}
        openGraph={{
          type: "website",
          titel: page_title,
          description: page_description,
          images:
            page_images &&
            page_images.map(({ image }) => {
              return {
                url: image.url,
                width: image.dimensions.width,
                height: image.dimensions.height,
                alt: image.alt,
              };
            }),
        }}
      />
      <SocialProfileJsonLd
        type="Person"
        name="Colin Hadler"
        url="http://colinhadler.at"
        sameAs={[
          "https://www.facebook.com/ColinHadler/",
          "https://www.instagram.com/colinhadler/",
        ]}
      />
      <HeroScroll />
      {data.body.map((elm) => (
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

export const getStaticProps = async (req, ctx) => {
  const response = await client.query({
    query: gql`
      {
        allHomepages(uid: "index") {
          edges {
            node {
              page_title
              page_description
              page_images {
                image
              }
              body {
                __typename
                ... on HomepageBodyHero__1 {
                  primary {
                    releasedatum
                    hintergrundbild
                    kurzbeschreibung
                    cover
                  }
                }
                ... on HomepageBodyUberMich_section {
                  primary {
                    bild
                    hintergrundnamen
                    hintergrundfarbe
                    button_label
                    kurze_beschreibung
                    link_zur_internen_seite {
                      ... on _Document {
                        _meta {
                          uid
                        }
                      }
                    }
                  }
                }
                ... on HomepageBodyMeineBucher_section {
                  fields {
                    buch {
                      ... on Bucher {
                        cover
                        _meta {
                          uid
                        }
                      }
                    }
                  }
                }
                ... on HomepageBodyTermine_section {
                  primary {
                    kurzbeschreibung
                    titel
                    hintergrundbild
                    link_zur_internen_seite {
                      ... on _Document {
                        _meta {
                          uid
                        }
                      }
                    }
                  }
                }
                ... on HomepageBodyKontakt_banner {
                  primary {
                    titel
                  }
                  fields {
                    icon
                    link {
                      ... on _ExternalLink {
                        url
                        target
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
  return {
    props: {
      data: response.data.allHomepages.edges[0].node,
    },
  };
};
