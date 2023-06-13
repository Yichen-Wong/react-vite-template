import { css } from "@emotion/react"
import { useAppDispatch, useAppSelector } from "@/hooks"
import { useNavigate } from "react-router-dom"
import ThemeToggle from "@/components/themeToggle"

function Index() {
    const user = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    return (
        <div className={"dark:bg-[#333] min-h-screen dark:text-white"}>
            <h1
                className={"font-bold  text-2xl p-[20px]"}
                css={css`
                    background-color: aquamarine;
                `}
            >
                Index
            </h1>

            <div className={"p-[20px]"}>
                <div>
                    <div>User Name: {user.name}</div>
                </div>
                <div>
                    <input
                        css={css`
                            margin-top: 10px;
                            border: 1px solid #ccc;
                            padding: 5px 10px;
                            background-color: transparent;
                        `}
                        value={user.name}
                        type="text"
                        placeholder="input user name"
                        onChange={e => {
                            dispatch({
                                type: "user/setName",
                                payload: e.target.value,
                            })
                        }}
                    />
                </div>
                <button
                    css={css`
                        margin-top: 14px;
                        border: 1px solid #ccc;
                        padding: 5px 10px;
                    `}
                    onClick={() => {
                        navigate("/login")
                    }}
                >
                    Go to Login
                </button>

                <ThemeToggle
                    css={css`
                        margin-top: 14px;
                    `}
                ></ThemeToggle>
            </div>
        </div>
    )
}

export default Index
