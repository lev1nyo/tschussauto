import Head from 'next/head'
import Link from "next/link";
import { useEffect } from "react";

export default function Success() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      const layers = document.querySelectorAll("[data-parallax]");
      layers.forEach((layer) => {
        const speed = layer.getAttribute("data-parallax");
        const x = (window.innerWidth - e.pageX * speed) / 150;
        const y = (window.innerHeight - e.pageY * speed) / 150;
        layer.style.transform = `translate(${x}px, ${y}px)`;
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <Head>
        <title>Vielen Dank – Wir melden uns schnellstmöglich</title>
        <meta
          name="description"
          content="Ihre Auto-Bewertung wurde erfolgreich übermittelt. Unser Team wird sich umgehend mit Ihnen in Verbindung setzen."
        />
      </Head>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animate">
        {/* Частицы */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="particle"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 5}s`
              }}
            ></span>
          ))}
        </div>

        {/* Контент */}
        <div className="relative z-20 text-center max-w-lg px-6 animate-fadeInUp">
          <h1 className="text-3xl font-bold text-white mb-6 drop-shadow-neon">
            Vielen Dank für Ihre Angaben! 🎉
          </h1>
          <p className="text-lg text-gray-300 mb-8">
            Wir haben Ihre Daten erhalten und werden uns schnellstmöglich mit Ihnen in Verbindung setzen.
          </p>
          <Link href="/">
            <button className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white px-10 py-4 rounded-xl font-semibold text-xl transition-all transform hover:scale-105 hover:shadow-neon">
              Zurück zur Startseite
            </button>
          </Link>
        </div>

        {/* Слои фона */}
        <div
          className="absolute w-[130%] h-[130%] top-0 left-0 bg-gradient-to-tr from-[#0f172a] via-[#312e81] to-[#0f172a] animate-gradient-flow"
          data-parallax="2"
        ></div>
        <div
          className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]"
          data-parallax="4"
        ></div>
        <div
          className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_70%)]"
          data-parallax="6"
        ></div>
      </main>
    </>
  );
}
