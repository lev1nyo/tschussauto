import Head from "next/head";

export default function Impressum() {
  return (
    <>
      <Head>
        <title>Impressum | LGH Auto GmbH</title>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://tschussauto.de/impressum" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Impressum</h1>

        <section className="space-y-1 mb-6">
          <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
          <p>LGH Auto GmbH</p>
          <p>Weißkopfstr 11</p>
          <p>86343 Königsbrunn</p>
        </section>

        <section className="space-y-1 mb-6">
          <h3 className="text-lg font-semibold">Vertreten durch</h3>
          <p>Geschäftsführer: Andrii Levitan, Oleksandr Gurov</p>
        </section>

        <section className="space-y-1 mb-6">
          <h3 className="text-lg font-semibold">Kontakt</h3>
          <p>Telefon: +49 171 1012349</p>
          <p>E-Mail: info@lgh-auto.de</p>
        </section>

        <section className="space-y-1 mb-6">
          <h3 className="text-lg font-semibold">Registereintrag</h3>
          <p>Handelsregister: Amtsgericht Augsburg</p>
          <p>HRB 40644</p>
        </section>

        <section className="space-y-1 mb-6">
          <h3 className="text-lg font-semibold">Umsatzsteuer-ID</h3>
          <p>USt-IdNr.: DE450890896</p>
        </section>

        <section className="space-y-1 mb-6">
          <h3 className="text-lg font-semibold">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
          <p>Andrii Levitan, Anschrift wie oben</p>
        </section>

        <section className="space-y-2 text-sm opacity-80">
          <h3 className="text-lg font-semibold">Haftungsausschluss</h3>
          <p>Inhalte wurden mit größter Sorgfalt erstellt, jedoch ohne Gewähr für Richtigkeit, Vollständigkeit und Aktualität.</p>
        </section>
      </main>
    </>
  );
}
