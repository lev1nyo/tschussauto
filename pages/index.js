import Head from 'next/head'
import Link from "next/link";
import { useEffect } from "react";

export default function Home() {
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
        <title>Autoankauf Bayern – Verkaufen Sie Ihr Auto schnell & sicher</title>
        <meta
          name="description"
          content="Autoankauf in Bayern mit Sofortzahlung. Verkaufen Sie Ihr Auto schnell und unkompliziert. Jetzt kostenlose Online-Bewertung starten!"
        />
      </Head>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animate">
        {/* Частицы */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {Array.from({ length: 35 }).map((_, i) => (
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
        <div className="relative text-center max-w-2xl px-6 z-20 animate-fadeInUp">
          <img
            src="/logo.png"
            alt="TschüssAuto.de Logo"
            className="mx-auto w-44 mb-10 drop-shadow-neon animate-scaleIn"
          />

          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-8 leading-snug animate-fadeInUp delay-200">
            Sag <span className="text-cyan-300">Tschüss</span> zu deinem Auto –<br />
            und <span className="text-amber-300">Hallo</span> zu deinem Geld!
          </h1>

          <p className="text-lg text-gray-200 mb-10 max-w-xl mx-auto leading-relaxed animate-fadeInUp delay-300">
            Verkaufe dein Auto schnell, einfach und zu einem fairen Preis.
            <br /> 100% digital. 100% transparent.
          </p>

          <Link href="/quiz">
            <button className="relative group bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white px-12 py-4 rounded-xl font-semibold text-xl transition-all transform hover:scale-105 shadow-neon animate-fadeInUp delay-500 overflow-hidden">
              <span className="relative z-10">Jetzt Auto bewerten</span>
              {/* Блик */}
              <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
            </button>
          </Link>

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
                Zahlung innerhalb von <br /> 24 Stunden
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-amber-300 text-3xl drop-shadow-neon">🎁</span>
              <span className="font-medium leading-tight">
                100 € Bonus bei persönlicher <br /> Fahrzeugvorführung
              </span>
            </div>
          </div>
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
