import Head from "next/head";
import { Container, Card, Row, Text, Link, Image } from "@nextui-org/react";
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
        <h2>Lastest Comics</h2>
        {lastestComics.map((comic) => {
          return (
            <Link href={`/comic/${comic.id}`} key={comic.id}>
              <a>
                <Image
                  width={550}
                  height={400}
                  layout="intrinsic"
                  objectFit="none"
                  src={comic.link}
                  alt={comic.alt}
                />
              </a>
            </Link>
          );
        })}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
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
