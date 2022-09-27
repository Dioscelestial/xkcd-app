import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "../components/Header";

function MyApp({ Component, pageProps  }) {
  return (
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider>
  );
}

export default MyApp;
