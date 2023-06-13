import { Fragment, ReactNode } from "react"
import { RouterProvider } from "react-router-dom"
import router from "@/router"
import { store } from "@/store"
import { Provider } from "react-redux"
import { IsAutoTheme, Theme, ThemeProvider, useThemeContext } from "@/components/ThemeProvider"
import { parseCookies } from "nookies"

function App() {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const theme = parseCookies().theme || (media.matches ? "dark" : "light")
    const themeIsAuto = parseCookies().isAutoTheme as IsAutoTheme
    return (
        <Fragment>
            <ThemeProvider initialTheme={theme as Theme} initialIsAuto={themeIsAuto}>
                <MyApp>
                    <Provider store={store}>
                        <RouterProvider router={router}></RouterProvider>
                    </Provider>
                </MyApp>
            </ThemeProvider>
        </Fragment>
    )
}

function MyApp({ children }: { children: ReactNode }) {
    const { theme } = useThemeContext()
    return <main className={theme}>{children}</main>
}

export default App
