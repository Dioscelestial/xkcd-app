import { Card, Container, Row, Spacer, Text } from "@nextui-org/react";
import Link from "next/link";

export function Footer() {
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
                  Todos los derechos reservador por su creador en ©️xkcd.com
                </Link>
              </Text>
            </Row>
          </Card.Footer>
        </Card>
      </Container>
    </footer>
  );
}
