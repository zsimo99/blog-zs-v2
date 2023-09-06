"use client"
import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext()

export function useDarkMode() {
    return useContext(ThemeContext)
}

export function DarkModeProvider({ children }) {
    const [isDark, setIsDark] = useState(true);


    // Check if window is defined (client-side) before using localStorage
    useEffect(() => {
        if (typeof window !== "undefined") {
            const savedDarkMode = localStorage.getItem("dark");
            setIsDark(savedDarkMode ? JSON.parse(savedDarkMode) : window.matchMedia("(prefers-color-scheme: dark").matches);
        }
    }, []);
    const toggleDarkMode = () => {
        localStorage.setItem("dark", !isDark)
        setIsDark(prev => !prev)
    }
    return (
        <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    )
}