import Head from 'next/head'
import { useState, useEffect, useRef } from "react";
import AdditionalQuestions from "../components/AdditionalQuestions";

export default function Quiz() {
  const [carData, setCarData] = useState({});
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [fuel, setFuel] = useState("");
  const [getriebe, setGetriebe] = useState("");
  const [bodyType, setBodyType] = useState("");   // ✅ кузов
  const [doors, setDoors] = useState("");         // ✅ двери
  const [km, setKm] = useState("");
  const [unfall, setUnfall] = useState("");
  const [zustand, setZustand] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const [showEmailNudge, setShowEmailNudge] = useState(false);
  const hydratedRef = useRef(false);

  // прогресс части 3 (0..1)
  const [additionalFraction, setAdditionalFraction] = useState(0);

  // refs для авто-скролла
  const brandRef = useRef(null);
  const modelRef = useRef(null);
  const yearRef = useRef(null);
  const fuelRef = useRef(null);
  const getriebeRef = useRef(null);
  const bodyTypeRef = useRef(null);   // ✅
  const doorsRef = useRef(null);      // ✅
  const kmRef = useRef(null);
  const unfallRef = useRef(null);
  const zustandRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const consentRef = useRef(null);

  // якорь для доп. вопросов
  const additionalTopRef = useRef(null);

  const TOTAL_SECTIONS = 3;
  const fadeIn = "animate-fadeInUp";

  useEffect(() => {
    fetch("/data/carData.json")
      .then((res) => res.json())
      .then((data) => setCarData(data))
      .catch((err) => console.error("Ошибка загрузки базы:", err));
  }, []);

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem('quizProgress') ?? localStorage.getItem('quizProgress');
      if (saved) {
        const p = JSON.parse(saved);
        setBrand(p.brand ?? "");
        setModel(p.model ?? "");
        setYear(p.year ?? "");
        setFuel(p.fuel ?? "");
        setGetriebe(p.getriebe ?? "");
        setBodyType(p.bodyType ?? "");   // ✅
        setDoors(p.doors ?? "");         // ✅
        setKm(p.km ?? "");
        setUnfall(p.unfall ?? "");
        setZustand(p.zustand ?? "");
        setEmail(p.email ?? "");
        setPhone(p.phone ?? "");
        setAgreement(Boolean(p.agreement));
      }
      hydratedRef.current = true;
    } catch {
      hydratedRef.current = true;
    }
  }, []);

  useEffect(() => {
    if (!hydratedRef.current) return;
    const payload = {
      brand, model, year, fuel, getriebe, bodyType, doors, km, unfall, zustand, email, phone, agreement
    }; // ✅ сохраняем новые поля
    try {
      const json = JSON.stringify(payload);
      sessionStorage.setItem('quizProgress', json);
      localStorage.setItem('quizProgress', json);
    } catch {}
  }, [brand, model, year, fuel, getriebe, bodyType, doors, km, unfall, zustand, email, phone, agreement]);

  const isValidEmail = (v) => {
    if (!v) return false;
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    return re.test(v);
  };

  useEffect(() => {
    const hasEmail = isValidEmail(email);
    if (hasEmail && !showAdditional) {
      setShowEmailNudge(true);
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'quiz_email_entered', { section: 2 });
      }
    } else {
      setShowEmailNudge(false);
    }
  }, [email, showAdditional]);

  const acknowledgeEmailNudge = () => {
    setShowEmailNudge(false);
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'quiz_email_nudge_ack', { section: 2 });
    }
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
Getriebe: ${data.getriebe}
Karosserie: ${data.bodyType}
Türen: ${data.doors}
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

  const scrollToRef = (ref) => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    ref.current.classList.add('ring-2', 'ring-cyan-300/60', 'rounded-lg');
    setTimeout(() => ref.current?.classList.remove('ring-2', 'ring-cyan-300/60', 'rounded-lg'), 900);
  };

  // При открытии части 3 — прокрутка к верху и к якорю
  useEffect(() => {
    if (!showAdditional) return;
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        additionalTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    });
  }, [showAdditional]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreement) return;
    await sendToTelegram({ brand, model, year, fuel, getriebe, bodyType, doors, km, unfall, zustand, email, phone });
    try {
      sessionStorage.removeItem('quizProgress');
      localStorage.removeItem('quizProgress');
    } catch {}
    setShowAdditional(true);
    setAdditionalFraction(0); // начинаем третью часть с 0%
  };

  // прогресс
  const part1Fields = [
    Boolean(brand),
    Boolean(model),
    Boolean(year),
    Boolean(fuel),
    Boolean(getriebe),
    Boolean(bodyType), // ✅
    Boolean(doors),    // ✅
    Boolean(km),
    Boolean(unfall),
    Boolean(zustand),
  ];
  const part1DoneCount = part1Fields.filter(Boolean).length;
  const part1Total = 10; // ✅ было 8 → стало 10
  const part1Done = part1DoneCount === part1Total;

  const part2Fields = [ isValidEmail(email), Boolean(agreement) ];
  const part2DoneCount = part2Fields.filter(Boolean).length;
  const part2Total = 2;

  // равные веса по секциям: 33 / 33 / 34
  const WEIGHT1 = 33;
  const WEIGHT2 = 33;
  const WEIGHT3 = 34;

  const progressPercent = (() => {
    // Часть 1: 0..33%
    if (!part1Done) {
      return Math.round((part1DoneCount / part1Total) * WEIGHT1);
    }
    // Часть 2: 33..66%
    if (!showAdditional) {
      return Math.round(WEIGHT1 + (part2DoneCount / part2Total) * WEIGHT2);
    }
    // Часть 3: 66..100%, но растём постепенно по additionalFraction (0..1)
    const p = WEIGHT1 + WEIGHT2 + (Math.max(0, Math.min(1, additionalFraction)) * WEIGHT3);
    // Не позволяем перескакивать на 100%, пока не конец
    return Math.min(99, Math.round(p));
  })();

  // Текущий номер секции: 1..3
  const currentSection = showAdditional ? 3 : (part1Done ? 2 : 1);

  return (
    <>
      <Head>
        <title>Autoankauf Quiz – Jetzt Fahrzeugbewertung starten</title>
        <meta name="description" content="Beantworte ein paar Fragen zu deinem Auto und erhalte sofort ein Angebot. Schnell, einfach und transparent." />
        <link rel="canonical" href="https://tschussauto.de/quiz" />
      </Head>

      {/* Липкая панель прогресса */}
      <div
        className="fixed top-2 left-1/2 -translate-x-1/2 z-40 w-[94%] sm:w-[520px] bg-white/10 backdrop-blur-md border border-white/15 rounded-xl shadow-lg"
        role="status"
        aria-label={`Fortschritt ${progressPercent}% – Abschnitt ${currentSection} von ${TOTAL_SECTIONS}`}
      >
        <div className="px-4 pt-3 pb-2 flex items-center justify-between text-xs text-gray-200">
          <span className="font-semibold">Abschnitt {currentSection} / {TOTAL_SECTIONS}</span>
          <span className="opacity-80">{progressPercent}%</span>
        </div>
        <div className="mx-4 mb-3 h-2 rounded-full bg-white/10 overflow-hidden">
          <div
            className="h-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-animate px-4 py-14 sm:py-16">
        {/* SPACER под фикс-бар */}
        <div aria-hidden className="h-16 w-full absolute top-0 left-0" />

        {/* Декор */}
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
            />
          ))}
        </div>

        {!showAdditional ? (
          <div className="relative z-20 w-full max-w-xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-neon animate-fadeInUp">
            {/* Внутренний бар прогресса */}
            <div className="w-full bg-white/10 rounded-full h-3 mb-6 overflow-hidden">
              <div
                className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 h-3 transition-all duration-500 ease-in-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col space-y-6 text-white">
              {/* Marke */}
              <div ref={brandRef} className={fadeIn}>
                <label className="block mb-2 font-semibold drop-shadow-neon">Marke</label>
                <select
                  value={brand}
                  onChange={(e) => { setBrand(e.target.value); setModel(""); setTimeout(() => scrollToRef(modelRef), 100); }}
                  className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  required
                >
                  <option value="">Bitte wählen</option>
                  {Object.keys(carData).map((b) => <option key={b}>{b}</option>)}
                </select>
              </div>

              {/* Modell */}
              {brand && carData[brand] && (
                <div ref={modelRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Modell</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    onBlur={() => setTimeout(() => scrollToRef(yearRef), 80)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    {carData[brand].map((m) => <option key={m}>{m}</option>)}
                  </select>
                </div>
              )}

              {/* Erstzulassung */}
              {model && (
                <div ref={yearRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Erstzulassung (Jahr)</label>
                  <select
                    required
                    value={year}
                    onChange={(e) => { setYear(e.target.value); setTimeout(() => scrollToRef(fuelRef), 100); }}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  >
                    <option value="">Bitte wählen</option>
                    {Array.from({ length: new Date().getFullYear() - 1979 }, (_, i) => new Date().getFullYear() - i)
                      .map((y) => <option key={y} value={y}>{y}</option>)}
                  </select>
                </div>
              )}

              {/* Kraftstoff */}
              {year && (
                <div ref={fuelRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Kraftstoff</label>
                  <select
                    value={fuel}
                    onChange={(e) => { setFuel(e.target.value); setTimeout(() => scrollToRef(getriebeRef), 100); }}
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

              {/* Getriebe */}
              {fuel && (
                <div ref={getriebeRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Getriebe</label>
                  <select
                    value={getriebe}
                    onChange={(e) => { setGetriebe(e.target.value); setTimeout(() => scrollToRef(bodyTypeRef), 100); }}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option>Manuell</option>
                    <option>Automatik</option>
                    <option>DSG</option>
                    <option>Andere</option>
                  </select>
                </div>
              )}

              {/* Karosserieform */}
              {getriebe && (
                <div ref={bodyTypeRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Karosserieform</label>
                  <select
                    value={bodyType}
                    onChange={(e) => { setBodyType(e.target.value); setTimeout(() => scrollToRef(doorsRef), 100); }}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option>Kleinwagen</option>
                    <option>Kombi</option>
                    <option>Limousine</option>
                    <option>SUV</option>
                    <option>Cabrio</option>
                    <option>Van</option>
                    <option>Pickup</option>
                  </select>
                </div>
              )}

              {/* Türen */}
              {bodyType && (
                <div ref={doorsRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Anzahl der Türen</label>
                  <select
                    value={doors}
                    onChange={(e) => { setDoors(e.target.value); setTimeout(() => scrollToRef(kmRef), 100); }}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              )}

              {/* Kilometerstand */}
              {doors && (
                <div ref={kmRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Kilometerstand</label>
                  <input
                    type="number"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                    onBlur={() => setTimeout(() => scrollToRef(unfallRef), 60)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  />
                </div>
              )}

              {/* Unfallfrei */}
              {km && (
                <div ref={unfallRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Unfallfrei?</label>
                  <select
                    value={unfall}
                    onChange={(e) => { setUnfall(e.target.value); setTimeout(() => scrollToRef(zustandRef), 100); }}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  >
                    <option value="">Bitte wählen</option>
                    <option>Ja</option>
                    <option>Nein</option>
                  </select>
                </div>
              )}

              {/* Zustand */}
              {unfall && (
                <div ref={zustandRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Zustand</label>
                  <select
                    value={zustand}
                    onChange={(e) => { setZustand(e.target.value); setTimeout(() => scrollToRef(emailRef), 100); }}
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

              {/* E-Mail */}
              {zustand && (
                <div ref={emailRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">E-Mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setTimeout(() => scrollToRef(phoneRef), 50)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                    required
                  />
                </div>
              )}

              {/* Telefon */}
              {email && (
                <div ref={phoneRef} className={fadeIn}>
                  <label className="block mb-2 font-semibold drop-shadow-neon">Telefon (optional)</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setTimeout(() => scrollToRef(consentRef), 50)}
                    className="w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
                  />
                </div>
              )}

              {/* Нудж */}
              {email && showEmailNudge && (
                <div className="rounded-xl border border-amber-400/40 bg-amber-400/10 p-4 text-amber-100">
                  <div className="font-semibold mb-1">Fast geschafft!</div>
                  <p className="text-sm">
                    Bitte schließen Sie die Anfrage ab, um eine
                    <strong> genaue Bewertung Ihres Fahrzeugs</strong> zu erhalten.
                    Es dauert weniger als 1&nbsp;Minute.
                  </p>
                  <div className="mt-3 flex gap-3">
                    <button type="button" onClick={acknowledgeEmailNudge} className="px-3 py-2 rounded bg-amber-400/20 hover:bg-amber-400/30 transition">
                      Verstanden
                    </button>
                    <button type="button" onClick={acknowledgeEmailNudge} className="px-3 py-2 rounded bg-white/10 hover:bg-white/20 transition">
                      Weiter ausfüllen
                    </button>
                  </div>
                </div>
              )}

              {/* Согласие */}
              {email && (
                <div ref={consentRef} className="flex items-start space-x-2 text-sm">
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

              {/* Отправка */}
              {email && (
                <button
                  type="submit"
                  disabled={!agreement}
                  className={`relative group py-3 px-4 rounded w-full mt-2 font-semibold transition-all transform shadow-neon ${
                    !agreement ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                               : "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white hover:scale-105"
                  }`}
                >
                  <span className="relative z-10">Absenden</span>
                  {agreement && (
                    <span className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
                  )}
                </button>
              )}
            </form>
          </div>
        ) : (
          // Часть 3
          <div ref={additionalTopRef} className="relative z-20 w-full max-w-xl pt-20 animate-fadeInUp">
            <AdditionalQuestions
              onProgress={(fraction) => {
                // fraction в диапазоне 0..1
                if (typeof fraction === 'number' && isFinite(fraction)) {
                  setAdditionalFraction(Math.max(0, Math.min(1, fraction)));
                }
              }}
              onComplete={() => setAdditionalFraction(1)}
            />
          </div>
        )}

        {/* Фоновые слои */}
        <div className="absolute w-[130%] h-[130%] top-0 left-0 bg-gradient-to-tr from-[#0f172a] via-[#312e81] to-[#0f172a] animate-gradient-flow" data-parallax="2" />
        <div className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_70%)]" data-parallax="4" />
        <div className="absolute w-full h-full top-0 left-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_70%)]" data-parallax="6" />
      </main>
    </>
  );
}
