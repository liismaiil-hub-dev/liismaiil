import { useState } from "react";


export default function useDarkMode(defaultTheme = 'dark') {
  const [theme, setTheme] = useState(defaultTheme);

  const setAndSaveTheme = (theme: string) => {
    setTheme(theme)
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)

  }
  const toggleTheme = (theme: string) => {
    setAndSaveTheme(theme === "dark" ? 'light' : 'dark')
  }


  return {
    theme, toggleTheme
  }

} 