import Head from 'next/head';
import { useState, useEffect } from "react";
import AdditionalQuestions from "../components/AdditionalQuestions";

export default function Quiz() {
  const [carData, setCarData] = useState({});
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [km, setKm] = useState("");
  const [unfall, setUnfall] = useState("");
  const [zustand, setZustand] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreement, setAgreement] = useState(false);

  const [showAdditional, setShowAdditional] = useState(false);
  const stepsCount = 9;

  useEffect(() => {
    fetch("/data/carData.json")
      .then((res) => res.json())
      .then((data) => setCarData(data))
      .catch((err) => console.error("Ошибка загрузки базы:", err));
  }, []);

  const fadeIn = "animate-fadeInUp";

  const currentStep = () => {
    if (!brand) return 1;
    if (!model) return 2;
    if (!year) return 3;
    if (!fuel) return 4;
    if (!km) return 5;
    if (!unfall) return 6;
    if (!zustand) return 7;
    if (!email) return 8;
    return 9;
  };

  const sendToTelegram = async (data) => {
    const token = "7528436112:AAE6ZQAndIQ6fnSh8We8ve6pm5UT5c6GXCY";
    const chatId = "-4899799914";

    const text = `
🚗 Neue Auto-Bewertung:

Marke: ${data.brand}
Modell: ${data.model}
Erstzulassung: ${data.year}
Kraftstoff: ${data.fuel}
Kilometerstand: ${data.km}
Unfallfrei: ${data.unfall}
Zustand: ${data.zustand}

📧 E-Mail: ${data.email}
📞 Telefon: ${data.phone || "nicht angegeben"}
`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreement) return;

    await sendToTelegram({
      brand,
      model,
      year,
      fuel,
      km,
      unfall,
      zustand,
      email,
      phone,
    });

    setShowAdditional(true);
  };

  return (
    <>
      {/* Каноникал для /quiz */}
      <Head>
        <link rel="canonical" href="https://tschussauto.de/quiz" />
      </Head>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animate px-4 py-10">
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

        {!showAdditional ? (
          <div className="relative z-20 w-full max-w-xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-neon animate-fadeInUp">
            {/* Прогресс-бар */}
            <div className="w-full bg-white/10 rounded-full h-3 mb-8 overflow-hidden">
              <div
                className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 h-3 transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep() / stepsCount) * 100}%` }}
              ></div>
            </div>

            {/* Форма */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-6 text-white"
            >
              {/* Марка */}
              <div className={fadeIn}>
                <label className="block mb-2 font-semibold drop-shadow-neon">
                  Marke
                </label>
                <select
                  value={brand}
                  onChange={(e) => {
                    setBrand(e.target.value);
                    setModel("");
                  }}
                  className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  required
                >
                  <option value="">Bitte wählen</option>
                  {Object.keys(carData).map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Модель */}
              {brand && carData[brand] && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    Modell
                  </label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    {carData[brand].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Год */}
              {model && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    Erstzulassung (Jahr)
                  </label>
                  <select
                    required
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  >
                    <option value="">Bitte wählen</option>
                    {Array.from(
                      { length: new Date().getFullYear() - 1979 },
                      (_, i) => new Date().getFullYear() - i
                    ).map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Топливо */}
              {year && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    Kraftstoff
                  </label>
                  <select
                    value={fuel}
                    onChange={(e) => setFuel(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option>Benzin</option>
                    <option>Diesel</option>
                    <option>Hybrid</option>
                    <option>Elektro</option>
                  </select>
                </div>
              )}

              {/* Пробег */}
              {fuel && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    Kilometerstand
                  </label>
                  <input
                    type="number"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  />
                </div>
              )}

              {/* Unfallfrei */}
              {km && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    Unfallfrei?
                  </label>
                  <select
                    value={unfall}
                    onChange={(e) => setUnfall(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option>Ja</option>
                    <option>Nein</option>
                    <option>Ich weiß es nicht</option>
                  </select>
                </div>
              )}

              {/* Zustand */}
              {unfall && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    Zustand
                  </label>
                  <select
                    value={zustand}
                    onChange={(e) => setZustand(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option>Perfekt</option>
                    <option>Gut</option>
                    <option>Befriedigend</option>
                  </select>
                </div>
              )}

              {/* Email */}
              {zustand && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    E-Mail
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  />
                </div>
              )}

              {/* Телефон */}
              {email && (
                <div className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">
                    Telefon (optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  />
                </div>
              )}

              {/* Дисклеймер */}
              {email && (
                <div className="flex items-start space-x-2 text-sm">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreement}
                    onChange={() => setAgreement(!agreement)}
                    className="mt-1"
                    required
                  />
                  <label htmlFor="agreement" className="text-gray-300">
                    Ich stimme zu, dass ich meine Bewertung per E-Mail erhalte und
                    dass mir LGH Auto GmbH gelegentlich relevante
                    Service-Informationen zusendet (keine Sorge, du kannst dich
                    jederzeit abmelden).
                  </label>
                </div>
              )}

              {/* Кнопка */}
              {email && (
                <button
                  type="submit"
                  disabled={!agreement}
                  className={`relative group py-3 px-4 rounded w-full mt-4 font-semibold transition-all transform shadow-neon ${
                    !agreement
                      ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white hover:scale-105"
                  }`}
                >
                  <span className="relative z-10">Absenden</span>
                  {agreement && (
                    <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></span>
                  )}
                </button>
              )}
            </form>
          </div>
        ) : (
          <AdditionalQuestions />
        )}

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
