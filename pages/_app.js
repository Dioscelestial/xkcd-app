import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import Head from "next/head";
import { I18NProvider, useI18N } from "context/i18n";

const DefaultHeadApp = () => {
  const { t } = useI18N();
  return (
    <Head>
      <title>{t("SEO_DEFAULT_TITLE")}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  return (
    <I18NProvider>
      <NextUIProvider>
        <DefaultHeadApp />
        <Component {...pageProps} />
      </NextUIProvider>
    </I18NProvider>
  );
}

export default MyApp;
