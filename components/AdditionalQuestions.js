import { useState } from "react";

export default function AdditionalQuestions() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  const totalSteps = 4;

  const handleSelect = (name, value) => {
    setAnswers({ ...answers, [name]: value });
  };

  const sendAdditionalToTelegram = async (data) => {
    const token = "7528436112:AAE6ZQAndIQ6fnSh8We8ve6pm5UT5c6GXCY";
    const chatId = "-4899799914";

    const text = `
🔎 Zusätzliche Angaben:

Schlüssel: ${data.keys}
2. Radsatz: ${data.zweite_raeder}
Serviceheft: ${data.serviceheft}
TÜV: ${data.tuv}
Verkäufer: ${data.verkaufer}
Import: ${data.import}
Finanzierung: ${data.finanzierung}

Halter: ${data.halter}
Außenfarbe: ${data.karosserie_farbe}
Innenfarbe: ${data.sitze_farbe}
Material: ${data.sitze_material}

Fahrbereit: ${data.fahrbereit}
Unfall: ${data.unfall}
Innenzustand: ${data.interieur}
Außenzustand: ${data.exterieur}
Fehleranzeigen: ${data.fehleranzeige}
Schäden: ${data.schaeden}
Technik: ${data.technik}

VIN: ${data.vin}
Erstzulassung: ${data.erstzulassung_monat || ""}/${data.erstzulassung_jahr || ""}
PLZ: ${data.plz}
Telefon: ${data.telefon_final || "nicht angegeben"}
Preisvorstellung: ${data.preis || "nicht angegeben"}
`;

    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  };

  const handleNext = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      await sendAdditionalToTelegram(answers);
      window.location.href = "/success";
    }
  };

  const isSelected = (name, value) => answers[name] === value;

  const buttonStyle = (name, value) =>
    `px-4 py-3 rounded-lg text-sm font-medium transition-all transform ${
      isSelected(name, value)
        ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 text-white shadow-neon"
        : "bg-white/10 text-gray-200 hover:bg-white/20"
    }`;

  const isStepValid = () => {
    if (step === 1) {
      return (
        answers.keys &&
        answers.zweite_raeder &&
        answers.serviceheft &&
        answers.tuv &&
        answers.verkaufer &&
        answers.import &&
        answers.finanzierung
      );
    }
    if (step === 2) {
      return (
        answers.halter &&
        answers.karosserie_farbe &&
        answers.sitze_farbe &&
        answers.sitze_material
      );
    }
    if (step === 3) {
      return (
        answers.fahrbereit &&
        answers.unfall &&
        answers.interieur &&
        answers.exterieur &&
        answers.fehleranzeige &&
        answers.schaeden &&
        answers.technik
      );
    }
    if (step === 4) {
      return (
        answers.vin &&
        answers.vin.length === 17 &&
        answers.erstzulassung_monat &&
        answers.erstzulassung_jahr &&
        answers.plz &&
        answers.plz.length >= 5
      );
    }
    return false;
  };

  return (
    <div className="relative z-20 w-full max-w-2xl bg-white/5 backdrop-blur-md rounded-2xl p-8 shadow-neon text-white animate-fadeInUp">
      {/* Прогресс-бар */}
      <div className="w-full bg-white/10 rounded-full h-3 mb-8 overflow-hidden">
        <div
          className="bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 h-3 transition-all duration-500 ease-in-out"
          style={{ width: `${(step / totalSteps) * 100}%` }}
        ></div>
      </div>

      {/* Шаг 1 */}
      {step === 1 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold drop-shadow-neon">
            Zusätzliche Informationen
          </h2>

          <div>
            <p className="mb-2">Wie viele Autoschlüssel haben Sie?</p>
            <div className="flex gap-3">
              {["1", "2+"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("keys", val)}
                  onClick={() => handleSelect("keys", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Haben Sie einen zweiten Radsatz?</p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("zweite_raeder", val)}
                  onClick={() => handleSelect("zweite_raeder", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Serviceheft vorhanden?</p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("serviceheft", val)}
                  onClick={() => handleSelect("serviceheft", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Wurde der TÜV in den letzten 6 Monaten erneuert?</p>
            <div className="flex gap-3 flex-wrap">
              {["Ja", "Nein", "Abgelaufen"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("tuv", val)}
                  onClick={() => handleSelect("tuv", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Sind Sie Privatperson oder Gewerbe?</p>
            <div className="flex gap-3">
              {["Privatperson", "Gewerbe"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("verkaufer", val)}
                  onClick={() => handleSelect("verkaufer", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Wurde das Fahrzeug importiert?</p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("import", val)}
                  onClick={() => handleSelect("import", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">
              Besteht eine laufende Finanzierung oder ein Leasing?
            </p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("finanzierung", val)}
                  onClick={() => handleSelect("finanzierung", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`relative group px-8 py-3 rounded-lg font-semibold shadow-neon w-full mt-6 ${
              isStepValid()
                ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 hover:scale-105"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Weiter
          </button>
        </div>
      )}

      {/* Шаг 2 */}
      {step === 2 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold drop-shadow-neon">
            Halter & Ausstattung
          </h2>

          <div>
            <p className="mb-2">Wie viele Halter hatte das Fahrzeug?</p>
            <div className="flex gap-3">
              {["1", "2", "3", "4+"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("halter", val)}
                  onClick={() => handleSelect("halter", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Außenfarbe</p>
            <div className="flex gap-3 flex-wrap">
              {["Schwarz", "Grau", "Silber", "Weiß", "Blau", "Andere"].map(
                (val) => (
                  <button
                    key={val}
                    type="button"
                    className={buttonStyle("karosserie_farbe", val)}
                    onClick={() => handleSelect("karosserie_farbe", val)}
                  >
                    {val}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <p className="mb-2">Innenfarbe (Sitze)</p>
            <div className="flex gap-3 flex-wrap">
              {["Schwarz", "Grau", "Beige", "Braun", "Blau", "Andere"].map(
                (val) => (
                  <button
                    key={val}
                    type="button"
                    className={buttonStyle("sitze_farbe", val)}
                    onClick={() => handleSelect("sitze_farbe", val)}
                  >
                    {val}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <p className="mb-2">Material der Sitze</p>
            <div className="flex gap-3 flex-wrap">
              {[
                "Stoff",
                "Leder",
                "Kunststoff",
                "Teilleder",
                "Alcantara",
                "Andere",
              ].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("sitze_material", val)}
                  onClick={() => handleSelect("sitze_material", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`relative group px-8 py-3 rounded-lg font-semibold shadow-neon w-full mt-6 ${
              isStepValid()
                ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 hover:scale-105"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Weiter
          </button>
        </div>
      )}

      {/* Шаг 3 */}
      {step === 3 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold drop-shadow-neon">Zustand</h2>

          <div>
            <p className="mb-2">Ist das Fahrzeug fahrbereit?</p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("fahrbereit", val)}
                  onClick={() => handleSelect("fahrbereit", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Gab es Unfallschäden?</p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("unfall", val)}
                  onClick={() => handleSelect("unfall", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Innenzustand</p>
            <div className="flex gap-3 flex-wrap">
              {["Perfekt", "Leicht gebraucht", "Stark gebraucht"].map(
                (val) => (
                  <button
                    key={val}
                    type="button"
                    className={buttonStyle("interieur", val)}
                    onClick={() => handleSelect("interieur", val)}
                  >
                    {val}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <p className="mb-2">Außenzustand</p>
            <div className="flex gap-3 flex-wrap">
              {["Perfekt", "Leicht gebraucht", "Stark gebraucht"].map(
                (val) => (
                  <button
                    key={val}
                    type="button"
                    className={buttonStyle("exterieur", val)}
                    onClick={() => handleSelect("exterieur", val)}
                  >
                    {val}
                  </button>
                )
              )}
            </div>
          </div>

          <div>
            <p className="mb-2">Fehleranzeigen im Armaturenbrett?</p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("fehleranzeige", val)}
                  onClick={() => handleSelect("fehleranzeige", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">Schäden oder Gebrauchsspuren?</p>
            <div className="flex gap-3">
              {["Ja", "Nein"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("schaeden", val)}
                  onClick={() => handleSelect("schaeden", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2">
              Motor, Getriebe, Lenkung, Federung, Bremsen, Klimaanlage in Ordnung?
            </p>
            <div className="flex gap-3 flex-wrap">
              {["Ja", "Nein", "Nicht vorhanden (Klimaanlage)"].map((val) => (
                <button
                  key={val}
                  type="button"
                  className={buttonStyle("technik", val)}
                  onClick={() => handleSelect("technik", val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`relative group px-8 py-3 rounded-lg font-semibold shadow-neon w-full mt-6 ${
              isStepValid()
                ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 hover:scale-105"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Weiter
          </button>
        </div>
      )}

      {/* Шаг 4 */}
      {step === 4 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold drop-shadow-neon">Letzte Angaben</h2>

{/* VIN */}
<div>
  <p className="mb-2">
    Fahrgestellnummer (VIN) <span className="text-red-500">*</span>
  </p>
  <input
    type="text"
    minLength={17}
    maxLength={17}
    value={answers.vin || ""}
    onChange={(e) => {
      // всегда записываем в верхнем регистре
      handleSelect("vin", e.target.value.toUpperCase());
    }}
    className={`w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 ${
      answers.vin &&
      (answers.vin.length !== 17 || /[IOQ]/i.test(answers.vin))
        ? "border border-red-500"
        : ""
    }`}
    placeholder="17-stellige VIN eingeben"
    required
  />

  {/* Ошибка: длина ≠ 17 */}
  {answers.vin && answers.vin.length !== 17 && (
    <p className="text-sm text-red-400 mt-1">
      Die VIN muss genau 17 Zeichen enthalten.
    </p>
  )}

  {/* Ошибка: запрещённые символы */}
  {answers.vin && /[IOQ]/i.test(answers.vin) && (
    <p className="text-sm text-red-400 mt-1">
      Die Zeichen <strong>I</strong>, <strong>O</strong> und <strong>Q</strong> sind im VIN-Code nicht erlaubt,
      um Verwechslungen mit den Ziffern <strong>1</strong> und <strong>0</strong> zu vermeiden.
    </p>
  )}
</div>


          {/* Erstzulassung */}
          <div>
            <p className="mb-2">Datum der Erstzulassung</p>
            <div className="flex gap-3">
              <select
                value={answers.erstzulassung_monat || ""}
                onChange={(e) =>
                  handleSelect("erstzulassung_monat", e.target.value)
                }
                className="w-1/2 bg-white/10 text-white rounded p-3"
                required
              >
                <option value="">Monat</option>
                {[
                  "01",
                  "02",
                  "03",
                  "04",
                  "05",
                  "06",
                  "07",
                  "08",
                  "09",
                  "10",
                  "11",
                  "12",
                ].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <select
                value={answers.erstzulassung_jahr || ""}
                onChange={(e) =>
                  handleSelect("erstzulassung_jahr", e.target.value)
                }
                className="w-1/2 bg-white/10 text-white rounded p-3"
                required
              >
                <option value="">Jahr</option>
                {Array.from({ length: new Date().getFullYear() - 1979 }, (_, i) =>
                  new Date().getFullYear() - i
                ).map((y) => (
                  <option key={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          {/* PLZ */}
          <div>
            <p className="mb-2">
              Postleitzahl <span className="text-red-500">*</span>
            </p>
            <input
              type="text"
              minLength={5}
              value={answers.plz || ""}
              onChange={(e) => handleSelect("plz", e.target.value)}
              className={`w-full bg-white/10 text-white rounded p-3 focus:outline-none focus:ring-2 focus:ring-fuchsia-400 ${
                answers.plz && answers.plz.length < 5
                  ? "border border-red-500"
                  : ""
              }`}
              placeholder="z.B. 86150"
              required
            />
            {answers.plz && answers.plz.length < 5 && (
              <p className="text-sm text-red-400 mt-1">
                Die Postleitzahl muss mindestens 5 Zeichen enthalten.
              </p>
            )}
          </div>

          {/* Telefon */}
          <div>
            <p className="mb-2">Telefon (optional)</p>
            <input
              type="tel"
              value={answers.telefon_final || ""}
              onChange={(e) => handleSelect("telefon_final", e.target.value)}
              className="w-full bg-white/10 text-white rounded p-3"
            />
          </div>

          {/* Preis */}
          <div>
            <p className="mb-2">Preisvorstellung (€)</p>
            <input
              type="number"
              value={answers.preis || ""}
              onChange={(e) => handleSelect("preis", e.target.value)}
              className="w-full bg-white/10 text-white rounded p-3"
            />
          </div>

          {/* Кнопка */}
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className={`relative group px-8 py-3 rounded-lg font-semibold shadow-neon w-full mt-6 ${
              isStepValid()
                ? "bg-gradient-to-r from-fuchsia-500 via-purple-500 to-cyan-400 hover:scale-105"
                : "bg-gray-500 text-gray-300 cursor-not-allowed"
            }`}
          >
            Senden
          </button>
        </div>
      )}
    </div>
  );
}
