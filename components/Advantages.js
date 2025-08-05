import { useState } from "react";

export default function Advantages() {
  const [showPopup, setShowPopup] = useState(false);

  const items = [
    "Bis zu 20 % mehr als bei WKDA",
    "Auszahlung noch am selben Tag",
    "Kostenlose Begutachtung vor Ort",
    "Preisermittlung in nur 15 Minuten",
    "100 € Bonus, wenn Sie Ihr Auto zur Bewertung zu uns bringen",
  ];

  return (
    <section className="bg-white py-10 px-4 relative">
      <h2 className="text-2xl font-bold text-center mb-6">
        Ihre Vorteile mit TschüssAuto.de
      </h2>
      <ul className="max-w-md mx-auto space-y-3 relative">
        {items.map((item, i) => (
          <li key={i} className="flex items-start space-x-2 relative">
            <span className="text-accent mt-1">✔</span>
            <span className="flex-1 relative">
              {item}
              {item.includes("100 € Bonus") && (
                <span className="ml-2 relative inline-block">
                  <button
                    type="button"
                    className="text-gray-500 text-sm"
                    onMouseEnter={() => setShowPopup(true)}
                    onMouseLeave={() => setShowPopup(false)}
                    onClick={() => setShowPopup(!showPopup)} // для мобильных
                  >
                    ℹ️
                  </button>
                  {showPopup && (
                    <div className="absolute left-6 top-0 bg-gray-800 text-white text-sm rounded p-2 w-64 shadow-lg z-10">
                      Sie erhalten den Bonus sofort bei der Auszahlung. Nur gültig bei persönlicher Fahrzeugvorführung in unserer Filiale.
                    </div>
                  )}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
