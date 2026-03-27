"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);

const THEME_STORAGE_KEY = "advaya_theme";
const THEMES = {
  light: "light",
  cyberpunk: "cyberpunk",
};

function getSystemTheme() {
  if (typeof window === "undefined") return THEMES.cyberpunk;
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? THEMES.cyberpunk : THEMES.light;
}

function readStoredTheme() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (!raw) return null;
    if (raw === THEMES.light || raw === THEMES.cyberpunk) return raw;
  } catch {
    // Ignore storage errors and fall back to system theme.
  }
  return null;
}

export default function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(THEMES.cyberpunk);

  const applyThemeToDocument = useCallback((nextTheme) => {
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  useEffect(() => {
    const stored = readStoredTheme();
    const nextTheme = stored ?? getSystemTheme();
    setThemeState(nextTheme);
    applyThemeToDocument(nextTheme);
  }, [applyThemeToDocument]);

  const setTheme = useCallback(
    (nextTheme) => {
      setThemeState(nextTheme);
      applyThemeToDocument(nextTheme);
      try {
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      } catch {
        // Ignore storage errors; theme still applies to the current session.
      }
    },
    [applyThemeToDocument]
  );

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useThemeMode() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    // ThemeProvider is required for correct styling.
    return { theme: THEMES.cyberpunk, setTheme: () => {} };
  }
  return ctx;
}

