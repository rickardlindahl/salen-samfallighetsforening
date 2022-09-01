import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="sv" data-theme="lemonade">
      <Head />
      <body className="bg-slate-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
