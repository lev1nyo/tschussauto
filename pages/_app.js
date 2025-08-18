// pages/_app.js
import '../styles/globals.css'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-X57G2DK9T6'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  // счётчик просмотров при клиентских переходах
  useEffect(() => {
    const handleRouteChange = (url) => {
      if (typeof window.gtag === 'function') {
        window.gtag('config', GA_ID, { page_path: url })
      }
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <>
      {/* GA4 загрузка */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      {/* Инициализация GA4 */}
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}', { page_path: window.location.pathname });
        `}
      </Script>

      <Component {...pageProps} />
    </>
  )
}
