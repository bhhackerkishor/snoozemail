import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState("system");

  const getSystemTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const applyTheme = (selectedTheme: string) => {
    const resolvedTheme = selectedTheme === "system" ? getSystemTheme() : selectedTheme;
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme") || "system";
    setTheme(stored);
    applyTheme(stored);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (stored === "system") applyTheme("system");
    };

    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  const updateTheme = (value: string) => {
    localStorage.setItem("theme", value);
    setTheme(value);
    applyTheme(value);
  };

  // Optional toggle only between light & dark
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    updateTheme(newTheme);
  };

  return { theme, setTheme: updateTheme, toggleTheme };
}
