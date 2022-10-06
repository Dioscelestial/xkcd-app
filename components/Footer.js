import { Card, Container, Row, Spacer, Text } from "@nextui-org/react";
import { useI18N } from "context/i18n";
import Link from "next/link";

export function Footer() {
  const {t} = useI18N()
  return (
    <footer>
      <Spacer></Spacer>
      <Container>
        <Card
          css={{
            width: `100%`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Card.Footer>
            <Row justify="center">
              <Text b color='#000'>
                <Link
                  href="https://xkcd.com"
                  target="_blank"
                  rel="noop noreferrer"
                >
                  {t("FOOTER_PAGE")}
                </Link>
              </Text>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
    </footer>
  );
}
