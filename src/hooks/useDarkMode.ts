import { useState } from 'react';

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = () => {
    const root = document.documentElement;
    const nextDark = !isDark;
    if (nextDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setIsDark(nextDark);
  };

  return { isDark, toggleTheme };
}