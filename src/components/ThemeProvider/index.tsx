import { createContext, ReactNode, useContext, useEffect, useLayoutEffect, useState } from "react"
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

/*
 * 设置 body 标签的 class Theme 属性
 * @description 用于在 body 标签上设置主题 class，以便在不同主题下，页面元素的样式不同
 * @param {Theme} theme
 * @returns {void}
 */
function setBodyTagThemeClass(theme: Theme) {
    document.body.classList.remove("light", "dark")
    document.body.classList.add(theme)
}

function setCookieTheme(theme: Theme) {
    setCookie(null, "theme", theme, { maxAge: 60 * 60 * 24 * 365 }) // 将主题存储到 cookie，有效期 365 天
}

function getInitialIsAuto(initialIsAuto?: string) {
    if (initialIsAuto === "yes") {
        return true
    } else return initialIsAuto !== "no"
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

    const [isAuto, setIsAuto] = useState<boolean>(getInitialIsAuto(initialIsAuto))

    const updateTheme = (newTheme: Theme) => {
        setTheme(newTheme)
        setCookieTheme(newTheme)
    }

    useLayoutEffect(() => {
        setBodyTagThemeClass(theme)
    }, [theme])

    const toggleTheme = (newTheme?: Theme) => {
        if (newTheme) {
            updateTheme(newTheme)
        } else {
            const newTheme = theme === "dark" ? "light" : "dark"
            updateTheme(newTheme)
        }
    }

    function setAuto(v: boolean) {
        setIsAuto(v)
        setCookie(null, "isAutoTheme", v ? "yes" : "no", {
            maxAge: 60 * 60 * 24 * 365,
        }) // 将主题存储到 cookie，有效期 365 天
    }

    useEffect(() => {
        // 1.获取当前系统主题
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches
        if (isAuto) {
            const newTheme = isDark ? "dark" : "light"
            updateTheme(newTheme)
        }
        // 2.监听系统主题变化
        const mql = window.matchMedia("(prefers-color-scheme: dark)")
        const listener = (e: MediaQueryListEvent) => {
            if (isAuto) {
                const newTheme = e.matches ? "dark" : "light"
                updateTheme(newTheme)
            }
        }
        mql.addEventListener("change", listener)
        return () => {
            mql.removeEventListener("change", listener)
        }
    }, [isAuto])
    return <ThemeContext.Provider value={{ theme, isAuto, toggleTheme, setAuto }}>{children}</ThemeContext.Provider>
}
