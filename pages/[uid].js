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
import { NextSeo, SocialProfileJsonLd } from "next-seo";
import * as ga from "../lib/ga";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

export default function Page({ data }) {
  const router = useRouter();
  const {
    page_title,
    page_description,
    page_images,
    ist_ein_buch_,
    book_tags,
    book_release_date,
    book_isbn,
  } = data.allPagess.edges[0].node;

  return (
    <>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <NextSeo
            title={page_title}
            titleTemplate="%s | Colin Hadler"
            defaultTitle="Colin Hadler"
            description={page_description}
            openGraph={{
              type: ist_ein_buch_ ? "book" : "website",
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
              book: {
                releaseDate: book_release_date,
                isbn: book_isbn,
                authors: ["https://colinhadler.at"],
                tags:
                  book_tags &&
                  book_tags.map((tag) => {
                    return tag.tag;
                  }),
              },
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
          {data.allPagess.edges[0].node.body.map((elm, idx) => (
            <SliceResolver slice={elm.slice_type} data={elm} key={idx} />
          ))}
        </motion.div>
      </AnimatePresence>
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
              page_title
        page_description
        page_images{
          image
        }
        ist_ein_buch_
        book_isbn
        book_tags{
          tag
        }
        book_release_date
              body {
                __typename
                ... on PagesBodyUber_mich__image__2{
                  primary{
                    bild,
                    beschreibung,
                    links_oder_rechts
                  }
                }
                ... on PagesBodyUber_mich__image_landscape{
                  primary{
                    bild,
                    beschreibung,
                    links_oder_rechts
                  }
                }
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
          ... on PagesBodyExternal_link_section {
            primary {
              titel1
              beschreibung
            }
            fields {
              label,
              external_link {
                ...on _FileLink{
                  url
                }
                ... on _ExternalLink {
                  url
                  target
                }
              }
            }
          }
          ... on PagesBodyKontaktSection {
            primary{
              text,
              titel1
            }
            fields{
              icon_fur_button,
              name_des_buttons,
              externer_link{
                ... on _ExternalLink{
                  url,
                  target
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
                ... on PagesBodyPresse_medien__bilder{
                  primary{
                    titel_des_containers1,
                    beschreibung_des_containers
                  }
            fields{
              bild
              titel_vom_bild
              untertitel_vom_bild
            }
          }
          ... on PagesBodyPresse_medien__videos {
            primary {
              titel_des_containers1
              beschreibung_des_containers
            }
            fields {
              externer_videolink {
                ... on _ExternalLink {
                  url
                }
              }
              image
              titel1
              untertitel
            }
          }
          ... on PagesBodyTerminliste{
                  fields{
                    titel_des_events,
                    ort,
                    datum___uhrzeit
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
