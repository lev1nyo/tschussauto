import Head from 'next/head';
import Image from 'next/image';

export default function Home() {
  const siteUrl = 'https://tschussauto.de';
  const ogImage = `${siteUrl}/og-image.jpg`; // картинка 1200x630

  // JSON-LD: AutoDealer
  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    '@id': `${siteUrl}#autodealer`,
    name: 'TschüssAuto',
    url: siteUrl,
    areaServed: 'Augsburg und Bayern (Umkreis 80 km)',
    potentialAction: {
      '@type': 'ContactAction',
      target: `${siteUrl}/quiz`,
      name: 'Kostenlose Online-Bewertung starten'
    }
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Kostet die Fahrzeugbewertung etwas?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Nein. Die Online-Bewertung ist kostenlos und unverbindlich.'
        }
      },
      {
        '@type': 'Question',
        name: 'Wie schnell erhalte ich mein Geld?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'In der Regel innerhalb von 24 Stunden nach Abschluss des Verkaufs.'
        }
      },
      {
        '@type': 'Question',
        name: 'Kaufen Sie auch Unfallwagen?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, wir prüfen jedes Fahrzeug individuell. Reichen Sie die Details in der Bewertung ein.'
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>Autoankauf in Augsburg & Bayern | TschüssAuto – Schnell & fair verkaufen</title>
        <meta
          name="description"
          content="Auto verkaufen in Augsburg & Bayern mit Sofortzahlung. Kostenlose Online-Bewertung, fairer Preis, Geld in 24h. Jetzt Formular ausfüllen!"
        />
        <meta name="robots" content="index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1" />
        <link rel="canonical" href={siteUrl} />
        <link rel="alternate" hrefLang="de-DE" href={siteUrl} />

        {/* Open Graph / Twitter */}
        <meta property="og:title" content="Autoankauf in Augsburg & Bayern | TschüssAuto" />
        <meta property="og:description" content="Schnell, fair & sicher verkaufen. Kostenlose Online-Bewertung mit Geld in 24h." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Autoankauf in Augsburg & Bayern | TschüssAuto" />
        <meta name="twitter:description" content="Auto jetzt online bewerten – schnell, fair & sicher. Geld in 24h." />
        <meta name="twitter:image" content={ogImage} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </Head>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animate">
        <div className="absolute inset-0 z-0 pointer-events-none"></div>

        <div className="relative text-center max-w-2xl px-6 z-20 animate-fadeInUp">
          <div className="mx-auto w-44 mb-10 drop-shadow-neon animate-scaleIn">
            <Image
              src="/logo.png"
              alt="TschüssAuto.de Logo"
              width={176}
              height={60}
              priority
            />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-snug animate-fadeInUp delay-200">
            Autoankauf in Augsburg &amp; Bayern –{' '}
            <span className="text-cyan-300">schnell</span>,{' '}
            <span className="text-amber-300">fair</span> &amp;{' '}
            <span className="text-cyan-300">sicher</span>
          </h1>

          <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed animate-fadeInUp delay-300">
            Verkaufe dein Auto online in wenigen Minuten. Kostenlose Bewertung, transparente Abwicklung und Auszahlung in 24&nbsp;Stunden.
          </p>

          <a href="/quiz" aria-label="Jetzt Auto kostenlos online bewerten">
            <button className="relative group bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white px-12 py-4 rounded-xl font-semibold text-xl transition-all transform hover:scale-105 shadow-neon animate-fadeInUp delay-500 overflow-hidden">
              <span className="relative z-10">Jetzt Auto bewerten</span>
              <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
            </button>
          </a>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14 text-left text-white animate-fadeInUp delay-700">
            <div className="flex items-center gap-3">
              <span className="text-cyan-300 text-3xl drop-shadow-neon">⚡</span>
              <span className="font-medium leading-tight">
                Kostenlose Bewertung <br /> in wenigen Minuten
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-fuchsia-400 text-3xl drop-shadow-neon">💶</span>
              <span className="font-medium leading-tight">
                Auszahlung innerhalb von <br /> 24 Stunden
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-300 text-3xl drop-shadow-neon">🎁</span>
              <span className="font-medium leading-tight">
                100&nbsp;€ Bonus bei persönlicher <br /> Fahrzeugvorführung
              </span>
            </div>
          </div>

          <section className="mt-16 text-gray-300 text-sm leading-6 max-w-2xl mx-auto">
            <h2 className="sr-only">Autoankauf in Augsburg & Bayern</h2>
            <p>
              TschüssAuto kauft Fahrzeuge in <strong>Augsburg</strong> und ganz <strong>Bayern</strong> (Umkreis 80&nbsp;km).
              Faire Angebote, schnelle Abwicklung und sichere Zahlung. Starte jetzt die{' '}
              <a className="underline decoration-dotted" href="/quiz">kostenlose Online-Bewertung</a>.
            </p>
          </section>

          <section className="mt-10 text-left max-w-2xl mx-auto">
            <details className="mb-3 rounded-lg bg-white/5 p-4 text-gray-100">
              <summary className="cursor-pointer font-semibold">Kostet die Fahrzeugbewertung etwas?</summary>
              <p className="mt-2 text-sm text-gray-300">
                Nein, die Online-Bewertung ist kostenlos und unverbindlich.
              </p>
            </details>
            <details className="mb-3 rounded-lg bg-white/5 p-4 text-gray-100">
              <summary className="cursor-pointer font-semibold">Wie schnell erhalte ich mein Geld?</summary>
              <p className="mt-2 text-sm text-gray-300">
                In der Regel innerhalb von 24&nbsp;Stunden nach Abschluss des Verkaufs.
              </p>
            </details>
            <details className="mb-3 rounded-lg bg-white/5 p-4 text-gray-100">
              <summary className="cursor-pointer font-semibold">Kaufen Sie auch Unfallwagen?</summary>
              <p className="mt-2 text-sm text-gray-300">
                Ja, wir prüfen jedes Fahrzeug individuell. Reiche die Details im Formular ein.
              </p>
            </details>
          </section>
        </div>
      </main>
    </>
  );
}
