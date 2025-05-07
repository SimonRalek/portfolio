import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export function useTheme() {
  // Initialize theme state with user's preference or system preference
  const [theme, setTheme] = useState<Theme>(() => {
    // Check if theme was previously saved in localStorage
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    
    if (savedTheme) {
      return savedTheme;
    }
    
    // Check if user has dark mode preference in their OS
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    
    // Default to light theme
    return "light";
  });

  // Effect to apply theme class to document and save preference
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove both theme classes first
    root.classList.remove("light", "dark");
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Save theme preference to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle between light and dark mode
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return { theme, toggleTheme };
}
