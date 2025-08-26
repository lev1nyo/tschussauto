import Head from "next/head";

export default function Datenschutz() {
  return (
    <>
      <Head>
        <title>Datenschutzerklärung | LGH Auto GmbH</title>
        <meta name="robots" content="index,follow" />
        <link rel="canonical" href="https://tschussauto.de/datenschutz" />
      </Head>

      <main className="max-w-3xl mx-auto px-4 py-12 text-gray-100">
        <h1 className="text-3xl font-bold mb-6">Datenschutzerklärung</h1>

        <section className="space-y-3 mb-8">
          <p>Wir informieren Sie nach Art. 12 ff. DSGVO über die Verarbeitung personenbezogener Daten auf dieser Website.</p>
        </section>

        <section className="space-y-1 mb-6">
          <h2 className="text-xl font-semibold">Verantwortlicher</h2>
          <p>LGH Auto GmbH, Musterstraße 1, 86150 Augsburg</p>
          <p>E-Mail: privacy@tschussauto.de</p>
        </section>

        <section className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Zwecke der Verarbeitung</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bereitstellung der Website</li>
            <li>Abwicklung von Fahrzeuganfragen (Formulare)</li>
            <li>Kommunikation per E-Mail/Telefon</li>
            <li>Statistiken/Analytics (sofern eingesetzt)</li>
          </ul>
        </section>

        <section className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Rechtsgrundlagen</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Art. 6 Abs. 1 lit. b DSGVO (Vertrag/Anbahnung)</li>
            <li>Art. 6 Abs. 1 lit. a DSGVO (Einwilligung, z. B. Newsletter/Marketing)</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse, z. B. Sicherheit, Reichweitenmessung)</li>
          </ul>
        </section>

        <section className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Empfänger / Dritte</h3>
          <p>Hosting, IT-Dienstleister, ggf. Analysedienste, Kommunikationsdienste (z. B. E-Mail, Telegram-Bot).</p>
        </section>

        <section className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Speicherdauer</h3>
          <p>Daten werden gelöscht, sobald der Zweck entfällt und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>
        </section>

        <section className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Ihre Rechte</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit</li>
            <li>Widerspruch gegen Verarbeitungen</li>
            <li>Widerruf erteilter Einwilligungen</li>
            <li>Beschwerde bei einer Aufsichtsbehörde</li>
          </ul>
        </section>

        <section className="space-y-2 mb-6">
          <h3 className="text-lg font-semibold">Cookies & Tracking</h3>
          <p>Sofern wir Cookies/Tracking einsetzen, informieren wir im Consent-Banner. Sie können Ihre Auswahl jederzeit anpassen.</p>
        </section>

        <section className="space-y-2 text-sm opacity-80">
          <h3 className="text-lg font-semibold">Änderungen</h3>
          <p>Wir passen diese Datenschutzerklärung bei Bedarf an. Stand: {new Date().toLocaleDateString("de-DE")}</p>
        </section>
      </main>
    </>
  );
}
