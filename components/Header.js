import { Container, Text, Navbar, useTheme } from "@nextui-org/react";
import Link from "next/link";

export function Header() {
  const { isDark } = useTheme();

  return (
    <Navbar
      isBordered={isDark}
      responsive
      display="flex"
      justify="space-between"
    >
      <Navbar.Brand>
        <Text b color="inherit" hideIn="xs">
          Next xkcd
        </Text>
      </Navbar.Brand>
      {/* <div>
        <Text small>
          Next<Text>xkcd</Text>
        </Text>
      </div> */}
      <Navbar.Content hideIn="xs">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href="/Features">Features</Navbar.Link>
        <Navbar.Link href="/About">About</Navbar.Link>
        <Navbar.Link href="/Search">Search</Navbar.Link>
      </Navbar.Content>
    </Navbar>
  );
}
