import { Card, Container, Row, Text } from "@nextui-org/react";
import Head from "next/head";
import { search } from "services/search.js";
import { Layout } from "components/Layout";
import Link from "next/link";
import Image from "next/image";

export default function Component({ query, result }) {
  return (
    <>
      <Head>
        <title>xkcd - Result for {query}</title>
        <meta name="description" content={`Search result for ${query}`} />
      </Head>

      <Layout>
        <Text
          h1
          css={{
            m: "$sm",
            padding: "$2",
            textAlign: "center",
            textGradient: "45deg, #000000 -20%, #6F6F6F 80%",
          }}
          weight="bold"
        >
          Resultados para: {query}
        </Text>
        <Container
          display="flex"
          direction="row"
          justify="center"
          alignItems="center"
        >
          {result.map((result) => {
            return (
              <Link href={`/comic/${result.id}`} key={result.id}>
                <Card
                  isHoverable
                  isPressable
                  variant="bordered"
                  css={{ mw: "400px", m: "$sm", padding: "$3" }}
                >
                  <Card.Body>
                    <a>
                      <Row justify="space-between" align="center">
                        <Image
                          width="150"
                          height="150"
                          layout="fixed" //fill,fixed,intrinsic,responsive,undefined.
                          src={result.img}
                          alt={result.alt}
                        />
                        <Text css={{ textAlign: "right" }} h3>
                          {result.title}
                        </Text>
                      </Row>
                    </a>
                  </Card.Body>
                </Card>
              </Link>
            );
          })}
        </Container>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query } = context;
  const { q = "" } = query;

  const { result } = await search(q, { query: q });

  return {
    props: {
      query: q,
      result,
    },
  };
}
