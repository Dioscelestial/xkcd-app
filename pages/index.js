import Head from "next/head";
import {
  Container,
  Card,
  Row,
  Text,
  Link,
  Image,
  Spacer,
  Grid,
} from "@nextui-org/react";
import { readdir, readFile } from "fs/promises";
import { Layout } from "components/Layout";

export default function Home({ lastestComics }) {
  return (
    <>
      <Head>
        <title>xkcd - App</title>
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
          Lastest Comics
        </Text>

        <Grid.Container justify="center" gap={3}>
          {lastestComics.map((comic) => {
            return (
              <Link key={comic.id} href={`/comic/${comic.id}`}>
                <Card isHoverable isPressable variant="bordered" css={{ m: "$sm", padding: "$2" }}>
                  <a>
                    <Grid xs md lg xl>
                      <Row justify="center">
                        <Text h3 weight="bold">
                          {comic.title}
                        </Text>
                      </Row>
                      <Image
                        width={comic.width}
                        height={comic.height}
                        layout="intrinsic"
                        objectFit="contain"
                        src={comic.img}
                        alt={comic.alt}
                      />
                    </Grid>
                  </a>
                </Card>
              </Link>
            );
          })}
        </Grid.Container>
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
