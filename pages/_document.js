import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Подключение шрифта */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Здесь мы убрали глобальный canonical, так как он теперь на каждой странице индивидуально */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
