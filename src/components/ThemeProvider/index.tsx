import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { setCookie } from "nookies"

export type Theme = "light" | "dark"

export type IsAutoTheme = "yes" | "no" | undefined

export interface AppTheme {
    theme: Theme
    isAuto: boolean
    toggleTheme: (v?: Theme) => void
    setAuto: (v: boolean) => void
}

const ThemeContext = createContext<AppTheme>({
    isAuto: false,
    theme: "light",
    toggleTheme: (v?: Theme) => {
        console.log(v)
    },
    setAuto: (v: boolean) => {
        console.log(v)
    },
})

export const useThemeContext = () => {
    return useContext(ThemeContext)
}

export const ThemeProvider = ({
    children,
    initialTheme,
    initialIsAuto,
}: {
    children: ReactNode
    initialTheme: Theme
    initialIsAuto: IsAutoTheme
}) => {
    const [theme, setTheme] = useState<Theme>(initialTheme || "light")

    const [isAuto, setIsAuto] = useState<boolean>(getInitialIsAuto())

    function getInitialIsAuto() {
        if (initialIsAuto === "yes") {
            return true
        } else return initialIsAuto !== "no"
    }

    const toggleTheme = (newTheme?: Theme) => {
        if (newTheme) {
            setTheme(newTheme)
            setCookieTheme(newTheme)
        } else {
            const newTheme = theme === "dark" ? "light" : "dark"
            setTheme(newTheme)
            setCookieTheme(newTheme)
        }
    }

    function setAuto(v: boolean) {
        setIsAuto(v)
        setCookie(null, "isAutoTheme", v ? "yes" : "no", {
            maxAge: 60 * 60 * 24 * 365,
        }) // 将主题存储到 cookie，有效期 365 天
    }

    function setCookieTheme(theme: Theme) {
        setCookie(null, "theme", theme, { maxAge: 60 * 60 * 24 * 365 }) // 将主题存储到 cookie，有效期 365 天
    }

    useEffect(() => {
        // 1.获取当前系统主题
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isAuto) {
            const newTheme = isDark ? "dark" : "light"
            setTheme(newTheme)
            setCookieTheme(newTheme)
        }
        // 2.监听系统主题变化
        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        const listener = (e: MediaQueryListEvent) => {
            if (isAuto) {
                const newTheme = e.matches ? "dark" : "light"
                setTheme(newTheme)
                setCookieTheme(newTheme)
            }
        }
        mql.addEventListener("change", listener)
        return () => {
            mql.removeEventListener("change", listener)
        }
    }, [isAuto])
    return <ThemeContext.Provider value={{ theme, isAuto, toggleTheme, setAuto }}>{children}</ThemeContext.Provider>
}
