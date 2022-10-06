import { Card, Container, Row, Text } from "@nextui-org/react";
import Head from "next/head";
import { search } from "services/search.js";
import { Layout } from "components/Layout";
import Link from "next/link";
import Image from "next/image";
import { useI18N } from "context/i18n";

export default function Component({ query, results }) {
  const { t } = useI18N();
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
          {t("SEARCH_RESULT_TITLE", results.length, query)}
        </Text>
        <Container
          display="flex"
          direction="row"
          justify="center"
          alignItems="center"
        >
          {results.map((result) => {
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
                          layout="fixed"
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

  const { results } = await search({ query: q });

  return {
    props: {
      query: q,
      results,
    },
  };
}
