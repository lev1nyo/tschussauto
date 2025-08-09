import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Каноникал убрали, теперь он только в конкретных страницах */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
