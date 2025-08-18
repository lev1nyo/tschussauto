// pages/success.js
import Head from 'next/head'
import Link from 'next/link'
import { useEffect } from 'react'

export default function Success() {
  useEffect(() => {
    // GA4: фиксируем конверсию (если gtag подключён в _app.js)
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          value: 1,
          currency: 'EUR',
          event_label: 'success_page'
        })
      }
    } catch {}

    // Небольшой параллакс (как на главной)
    const handleMouseMove = (e) => {
      const layers = document.querySelectorAll('[data-parallax]')
      layers.forEach((layer) => {
        const speed = layer.getAttribute('data-parallax')
        const x = (window.innerWidth - e.pageX * speed) / 150
        const y = (window.innerHeight - e.pageY * speed) / 150
        layer.style.transform = `translate(${x}px, ${y}px)`
      })
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <Head>
        <title>Vielen Dank – Wir melden uns schnellstmöglich</title>
        <meta
          name="description"
          content="Ihre Auto-Bewertung wurde erfolgreich übermittelt. Unser Team wird sich umgehend mit Ihnen in Verbindung setzen."
        />
        <link rel="canonical" href="https://tschussauto.de/success" />
        {/* спасибо-страницу закрываем от индексации */}
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animate">
        {/* фоны */}
        <div
          className="absolute w-[130%] h-[130%] top-0 left-0 bg-gradient-to-tr from-[#0f172a] via-[#312e81] to-[#0f172a]"
          data-parallax="2"
          aria-hidden="true"
        />
        <div
          className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"
          data-parallax="4"
          aria-hidden="true"
        />
        <div
          className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_70%)]"
          data-parallax="6"
          aria-hidden="true"
        />

        {/* контент поверх фона */}
        <div className="relative z-20 text-center px-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Danke! Ihre Anfrage ist eingegangen.
          </h1>
          <p className="text-gray-200 text-lg mb-10">
            Wir melden uns schnellstmöglich mit einem Angebot. <br />
            Ihre Referenz: <span className="font-semibold">Online-Bewertung</span>
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/quiz" className="underline text-cyan-300">
              Weitere Bewertung starten
            </Link>
            <Link
              href="/"
              className="relative group bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white px-8 py-3 rounded-xl font-semibold transition-transform hover:scale-105 shadow-neon overflow-hidden"
            >
              <span className="relative z-10">Zur Startseite</span>
              <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}
