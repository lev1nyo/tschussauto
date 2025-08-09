// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Canonical (базовый для домена) */}
        <link rel="canonical" href="https://tschussauto.de" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
