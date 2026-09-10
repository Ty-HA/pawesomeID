"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

/**
 * Langue de la landing (FR/EN) — légère et 100 % client :
 * - défaut : langue du navigateur (fr* -> fr, sinon en)
 * - choix persisté dans localStorage ("pawesomeid-lang")
 * - hook useLang() -> { lang, setLang, t } où t(dict) sélectionne dict[lang]
 *
 * Réutilisable tel quel sur la version web3 (mêmes fichiers, merge simple).
 */

export type Lang = "en" | "fr";

const STORAGE_KEY = "pawesomeid-lang";

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // "en" au 1er rendu (SSR-safe), puis on applique préférence stockée / navigateur.
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "fr" || stored === "en") {
        setLangState(stored);
        return;
      }
      if (navigator.language?.toLowerCase().startsWith("fr")) setLangState("fr");
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {}
  };

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

/** t({ en: "...", fr: "..." }) -> texte dans la langue courante. */
export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  const t = <T,>(dict: { en: T; fr: T }): T => dict[lang];
  return { lang, setLang, t };
}

/** Petit sélecteur EN/FR (pill) à poser dans la navbar. */
export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center rounded-full border border-[#35C4E5]/60 overflow-hidden text-sm font-semibold">
      {(["en", "fr"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-3 py-1 uppercase transition-colors ${
            lang === l ? "bg-[#35C4E5] text-[#0d1230]" : "text-[#35C4E5] hover:bg-[#35C4E5]/10"
          }`}
          aria-pressed={lang === l}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
