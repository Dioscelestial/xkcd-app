import Image from "next/image";
import {
  Text,
  Grid,
  Row,
  Container,
  Spacer,
  Card,
  Button,
} from "@nextui-org/react";
import Head from "next/head";

import { readdir, readFile, stat } from "fs/promises";
import Link from "next/link";
import { basename } from "path";

import { Layout } from "components/Layout";

export default function ComicSelect({
  id,
  img,
  alt,
  title,
  width,
  height,
  hasNext,
  hasPrev,
  prevId,
  nextId,
}) {
  return (
    <>
      <Head>
        <title>xkcd - Comic {id}</title>
        <meta name="description" content="xkcd - Comics" />
      </Head>

      <Layout>
        <Container>
          <Spacer y={1} />
          <Card>
            <Card.Body>
              <Row justify="center" align="center">
                <Text h1>{title}</Text>
              </Row>
            </Card.Body>
            <Grid.Container justify="center">
              <Grid xs md lg xl>
                <Row justify="center" align="center">
                  <Image
                    src={img}
                    width={width}
                    height={height}
                    alt={alt}
                  ></Image>
                </Row>
              </Grid>
            </Grid.Container>
            <Spacer y={1} />
            <Row justify="center" align="center">
              <Text>{alt}</Text>
            </Row>
            <Spacer y={1} />
            <Row justify="space-evenly">
              {hasPrev && (
                <Text b>
                  <Link href={`/comic/${prevId}`}>
                    {/* <Button shadow color="primary"> */}
                    ⬅️Previous
                    {/* </Button> */}
                  </Link>
                </Text>
              )}

              {hasNext && (
                <Text b>
                  <Link href={`/comic/${nextId}`}>
                    {/* <Button shadow color="warning"> */}
                    Next➡️
                    {/* </Button> */}
                  </Link>
                </Text>
              )}
            </Row>
            <Spacer y={1} />
          </Card>
        </Container>
      </Layout>
    </>
  );
}
export async function getStaticPaths() {
  const files = await readdir("./comics");
  const paths = files.map((file) => {
    const id = basename(file, ".json");
    return { params: { id } };
  });

  return {
    paths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { id } = params;
  const content = await readFile(`./comics/${id}.json`, "utf8");
  const comic = JSON.parse(content);
  const idNum = +id;
  const prevId = idNum - 1;
  const nextId = idNum + 1;

  const [prevResult, nextResult] = await Promise.allSettled([
    stat(`./comics/${prevId}.json`),
    stat(`./comics/${nextId}.json`),
  ]);

  const hasPrev = prevResult.status === "fulfilled";
  const hasNext = nextResult.status === "fulfilled";

  return {
    props: { ...comic, hasNext, hasPrev, nextId, prevId },
  };
}
