import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "../components/Header";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
