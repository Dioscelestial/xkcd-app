import Head from "next/head";
import { Card, Row, Text, Link, Image, Container } from "@nextui-org/react";
import { readdir, readFile } from "fs/promises";
import { Layout } from "components/Layout";
import { useI18N } from "context/i18n";
import * as React from "react";
import Masonry from "@mui/lab/Masonry";

export default function Home({ lastestComics }) {
  const { t } = useI18N();
  return (
    <>
      <Head>
        <title>{t("SEO_DEFAULT_TITLE")}</title>
        <meta name="description" content="xkcd - Comics" />
      </Head>

      <Layout>
        <Text
          h2
          css={{
            m: "$sm",
            padding: "$2",
            textAlign: "center",
            textGradient: "45deg, #000000 -20%, #6F6F6F 80%",
          }}
          weight="bold"
        >
          {t("LATEST_COMICS")}
        </Text>
        <Masonry columns={{ xs: 2, sm: 4, md: 5, lg: 6, xl: 7 }}>
          {/* <Grid.Container justify="center" css={{maxW: "100%"}}> */}
          {lastestComics.map((comic) => {
            return (
              <Link key={comic.id} href={`/comic/${comic.id}`}>
                <Card
                  isHoverable
                  isPressable
                  css={{
                    height: "comic.height",
                    width: "comic.width",
                    m: "xs",
                    padding: "$1",
                  }}
                >
                  <a>
                    <Container>
                      <Row justify="center">
                        <Text h3 weight="bold">
                          {comic.title}
                        </Text>
                      </Row>
                      <Card.Image
                        width="100%"
                        height="100%"
                        objectFit="cover"
                        src={comic.img}
                        alt={comic.alt}
                      />
                    </Container>
                  </a>
                </Card>
              </Link>
            );
          })}
        </Masonry>
        {/* </Grid.Container> */}
      </Layout>
    </>
  );
}
export async function getStaticProps() {
  const files = await readdir("./comics");
  const lastestComicsFiles = files.slice(-100, files.length);

  const promisesReadFiles = lastestComicsFiles.map(async (file) => {
    const content = await readFile(`./comics/${file}`, "utf8");
    return JSON.parse(content);
  });
  const lastestComics = await Promise.all(promisesReadFiles);

  return {
    props: {
      lastestComics,
    },
  };
}
