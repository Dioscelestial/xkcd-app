import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { Header } from "../components/Header";

function MyApp({ Component }) {
  return (
    <NextUIProvider>
      <Component />
    </NextUIProvider>
  );
}

export default MyApp;
