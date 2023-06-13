import { createBrowserRouter } from "react-router-dom"
import { lazy, Suspense } from "react"
import NotFound from "@/components/NotFound"
import GlobalLoading from "@/components/GlobalLoading"
import IndexPage from "@/pages/index"

const LoginPage = lazy(() => import("@/pages/login"))

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <Suspense fallback={<GlobalLoading disableAnimation={true} transparent={false} />}>
                <IndexPage />
            </Suspense>
        ),
    },
    {
        path: "/login",
        element: (
            <Suspense fallback={<GlobalLoading disableAnimation={true} transparent={false} />}>
                <LoginPage />
            </Suspense>
        ),
    },
    {
        path: "*",
        element: <NotFound />,
    },
])

export default router
