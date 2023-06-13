import { css } from "@emotion/react"
import { useAppSelector } from "@/hooks"

function Login() {
    const user = useAppSelector(state => state.user)
    return (
        <div className={"w-full dark:bg-[#333] dark:text-white min-h-screen"}>
            <h1
                className={"font-bold text-2xl p-[20px]"}
                css={css`
                    background-color: bisque;
                `}
            >
                Login
            </h1>
            <div className={"p-[20px]"}>User Name: {user.name}</div>
        </div>
    )
}

export default Login
