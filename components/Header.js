import { Text, Navbar, Input, Dropdown } from "@nextui-org/react";
import Link from "next/link";
import { SearchIcon } from "./SearchIcon";
import { useState, useRef } from "react";
import { useI18N } from "context/i18n";
import { useRouter } from "next/router";

export function Header() {
  const { t } = useI18N();
  const [result, setResult] = useState([]);
  const searchRef = useRef();
  const { locale, locales } = useRouter();

  const getValue = () => searchRef.current?.value;

  const handleChange = () => {
    const q = getValue();
    if (!q) return;

    fetch(`/api/search?q=${q}`)
      .then((res) => res.json())
      .then((searchResults) => {
        setResult(searchResults);
      });
  };

  const restOflocales = locales.filter((l) => l !== locale);

  return (
    <Navbar
      css={{
        maxW: "100%",
      }}
      shouldHideOnScroll
    >
      <Navbar.Brand>
        <Text b hideIn="xs">
          Next
        </Text>
        <Text>xkcd</Text>
      </Navbar.Brand>

      <Navbar.Content enableCursorHighlight hideIn="xs">
        <Navbar.Link href="/">Home</Navbar.Link>
        <Navbar.Link href={`/${restOflocales[0]}`}>
          {restOflocales[0]}
        </Navbar.Link>
      </Navbar.Content>
      
      <Navbar.Content >
        <Navbar.Item >
          <Dropdown aria-label="Dynamic Action">
            <Input
              clearable
              type="search"
              ref={searchRef}
              contentLeft={
                <Dropdown.Button light rounded>
                  <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
                </Dropdown.Button>
              }
              css={{
                w: "100%",
                "@xsMax": { mw: "300px" },
                "& .nextui-input-content--left": {
                  h: "100%",
                  ml: "$4",
                  dflex: "center",
                },
              }}
              placeholder="Search..."
              onChange={handleChange}
            />
            <Dropdown.Menu aria-label="Dynamic Action" color="primary">
              {Boolean(result.length) &&
                result.map((result) => {
                  return (
                    <Dropdown.Item key={result.id}>
                      <Link href={`/comic/${result.id}`}>
                        <a>
                          <Text b>{result.title}</Text>
                        </a>
                      </Link>
                    </Dropdown.Item>
                  );
                })}
              <Dropdown.Item key="all-results">
                <Link href={`/search?q=${getValue()}`}>
                  <a>
                    <Text weight>{t("SEARCH_RESULT", result.length)}</Text>
                  </a>
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}
