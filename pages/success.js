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
        <link rel="canonical" href="https://tschussauto.de/success" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animate">
        {/* ...остальной JSX страницы без изменений... */}
      </main>
    </>
  );
}
