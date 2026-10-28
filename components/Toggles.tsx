"use client";

import { useEffect, useState } from "react";

type Lang = "en" | "es";
type Mode = "dark" | "light";

function read<K extends string>(key: string, fallback: K): K {
  try { return (localStorage.getItem(key) as K) || fallback; } catch { return fallback; }
}
function save(key: string, v: string) {
  try { localStorage.setItem(key, v); } catch { /* private mode: keep it for this visit only */ }
}

export default function Toggles() {
  const [lang, setLang] = useState<Lang>("en");
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    const root = document.documentElement;
    setLang((root.dataset.lang as Lang) || "en");
    setMode((root.dataset.mode as Mode) || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));
  }, []);

  const flipLang = () => {
    const next: Lang = lang === "en" ? "es" : "en";
    document.documentElement.dataset.lang = next;
    document.documentElement.lang = next;
    save("lang", next);
    setLang(next);
  };
  const flipMode = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    document.documentElement.dataset.mode = next;
    save("mode", next);
    setMode(next);
  };

  return (
    <div className="toggles">
      <button type="button" className="toggle" onClick={flipLang} aria-label={lang === "en" ? "Ver en español" : "View in English"}>
        {lang === "en" ? "es" : "en"}
      </button>
      <button type="button" className="toggle" onClick={flipMode} aria-pressed={mode === "light"} aria-label={lang === "en" ? "Light mode" : "Modo claro"}>
        {mode === "dark" ? (lang === "en" ? "light" : "claro") : (lang === "en" ? "dark" : "oscuro")}
      </button>
    </div>
  );
}
