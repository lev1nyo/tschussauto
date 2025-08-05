export default function Hero() {
  return (
    <section className="bg-brand text-white text-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">
        Sag Tschüss zu deinem Auto – und Hallo zu deinem Geld.
      </h1>
      <p className="text-lg mb-6">
        Verkaufen Sie Ihr Auto bis zu 20 % teurer als bei WKDA – schnell und fair!
      </p>
      <a
        href="/quiz"
        className="bg-accent text-white font-semibold py-3 px-6 rounded-lg shadow hover:bg-green-600 transition"
      >
        Jetzt starten
      </a>
    </section>
  )
}