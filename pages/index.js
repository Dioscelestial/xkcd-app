// import Comics from "./comics";
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
import { Header } from "../components/Header";
import { readdir, readFile } from "fs/promises";

export default function Home({ lastestComics }) {
  return (
    <div>
      <Head>
        <title>xkcd - App</title>
        <meta name="description" content="xkcd - Comics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container xl gap={0}>
          <Spacer y={1} />
          <Card>
            <Card.Body>
              <Row justify="center" align="center">
                <Text
                  h2
                  css={{
                    textGradient: "45deg, #000000 -20%, #6F6F6F 80%",
                  }}
                  weight="bold"
                >
                  Lastest Comics
                </Text>
              </Row>
            </Card.Body>

            <Grid.Container justify="center">
              {lastestComics.map((comic) => {
                return (
                  <Link key={comic.id} href={`/comic/${comic.id}`}>
                    <a>
                      <Grid xs md lg xl>
                        <Row justify="center" align="center">
                          <Text h3 weight="bold">
                            {comic.title}
                          </Text>
                        </Row>
                        <Image
                          width={550}
                          height={400}
                          layout="intrinsic"
                          objectFit="contain"
                          src={comic.img}
                          alt={comic.alt}
                        />
                      </Grid>
                    </a>
                  </Link>
                );
              })}
            </Grid.Container>
          </Card>
        </Container>
      </main>
    </div>
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
