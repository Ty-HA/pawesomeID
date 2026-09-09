"use client";

/**
 * Aperçu FICTIF du dashboard vétérinaire — maquette 100 % JSX/Tailwind
 * (aucune donnée réelle) pour montrer concrètement le produit côté praticien.
 */
const ROWS = [
  {
    pet: "Bunny",
    species: "🐶 Dog · Finnish Lapphund",
    did: "did:xrpl:1:rDm3…hYn3h",
    vaccines: "Up to date",
    vaccinesOk: true,
    lastVisit: "2025-06-12",
  },
  {
    pet: "Widget",
    species: "🐶 Dog · Chihuahua",
    did: "did:xrpl:1:rp5v…pnaZ2",
    vaccines: "Booster due",
    vaccinesOk: false,
    lastVisit: "2025-03-02",
  },
  {
    pet: "Charlie",
    species: "🐱 Cat · Siamese",
    did: "did:xrpl:1:rBvP…f9ViFe",
    vaccines: "Up to date",
    vaccinesOk: true,
    lastVisit: "2025-05-28",
  },
];

const Chip = ({ ok, children }: { ok: boolean; children: React.ReactNode }) => (
  <span
    className={`px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${
      ok ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
    }`}
  >
    {children}
  </span>
);

export default function VetDashboardPreview() {
  return (
    <section className="w-full py-20 bg-white" id="vet-preview">
      <h2 className="text-[#00bb5f] font-bold text-center xl:text-5xl lg:text-4xl text-3xl px-4">
        Built for veterinarians too
      </h2>
      <p className="text-gray-500 text-center mt-4 xl:text-2xl text-lg px-6 max-w-3xl mx-auto">
        Issue credentials, check vaccine status and sign your patients&apos;
        identity — here is a preview of the vet dashboard.
      </p>

      {/* Fenêtre navigateur factice */}
      <div className="mt-12 mx-auto max-w-5xl px-4">
        <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 text-left">
          {/* Barre de fenêtre */}
          <div className="bg-gray-100 flex items-center gap-2 px-4 py-3">
            <span className="w-3 h-3 rounded-full bg-red-400" />
            <span className="w-3 h-3 rounded-full bg-amber-400" />
            <span className="w-3 h-3 rounded-full bg-green-400" />
            <span className="ml-4 bg-white text-gray-400 text-xs rounded-md px-3 py-1 flex-1 truncate">
              app.pawesomeid.xyz/vet — Dr. Martin · Clinique des Lilas
            </span>
          </div>

          <div className="flex bg-[#0d1230]">
            {/* Sidebar */}
            <aside className="hidden sm:flex flex-col gap-1 w-44 shrink-0 p-4 text-sm text-gray-300">
              <span className="text-[#ECAA00] font-bold mb-3">🐾 Pawesome ID</span>
              <span className="bg-white/10 text-white rounded-lg px-3 py-2 font-medium">
                Patients
              </span>
              <span className="px-3 py-2 hover:text-white">Credentials</span>
              <span className="px-3 py-2 hover:text-white">Appointments</span>
              <span className="px-3 py-2 hover:text-white">Settings</span>
            </aside>

            {/* Contenu */}
            <div className="flex-1 bg-gray-50 p-4 sm:p-6 overflow-x-auto">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h3 className="font-bold text-gray-800 text-lg">My patients</h3>
                <span className="bg-[#ECAA00] text-white text-sm font-semibold rounded-full px-4 py-1.5">
                  + Issue a credential
                </span>
              </div>

              <div className="mt-4 rounded-xl border border-gray-200 bg-white overflow-hidden min-w-[520px]">
                <div className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr] gap-2 px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-100">
                  <span>Patient</span>
                  <span>Pet DID</span>
                  <span>Vaccines</span>
                  <span>Last visit</span>
                </div>
                {ROWS.map((r) => (
                  <div
                    key={r.pet}
                    className="grid grid-cols-[1.2fr_1.6fr_1fr_1fr] gap-2 px-4 py-3 border-t border-gray-100 items-center text-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-800">{r.pet}</p>
                      <p className="text-gray-400 text-xs">{r.species}</p>
                    </div>
                    <span className="font-mono text-xs text-indigo-600 truncate">
                      {r.did}{" "}
                      <span className="text-emerald-600 font-sans font-semibold">
                        ✓ on-chain
                      </span>
                    </span>
                    <span>
                      <Chip ok={r.vaccinesOk}>{r.vaccines}</Chip>
                    </span>
                    <span className="text-gray-500">{r.lastVisit}</span>
                  </div>
                ))}
              </div>

              <p className="text-gray-400 text-xs mt-3">
                Signatures anchored on the XRP Ledger · nothing stored without
                the owner&apos;s consent
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-400 text-sm mt-4 italic">
          Preview with fictional data — the vet dashboard ships with the pilot
          program.
        </p>
      </div>
    </section>
  );
}
