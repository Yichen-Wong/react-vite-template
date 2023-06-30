import {Fragment} from "react"
import {RouterProvider} from "react-router-dom"
import router from "@/router"
import {store} from "@/store"
import {Provider} from "react-redux"
import {IsAutoTheme, Theme, ThemeProvider} from "@/components/ThemeProvider"
import {parseCookies} from "nookies"

function App() {
    const media = window.matchMedia("(prefers-color-scheme: dark)")
    const theme = parseCookies().theme || (media.matches ? "dark" : "light")
    const themeIsAuto = parseCookies().isAutoTheme as IsAutoTheme
    return (
        <Fragment>
            <ThemeProvider initialTheme={theme as Theme} initialIsAuto={themeIsAuto}>
                <Provider store={store}>
                    <RouterProvider router={router}></RouterProvider>
                </Provider>
            </ThemeProvider>
        </Fragment>
    )
}

export default App
