import { css, SerializedStyles } from "@emotion/react"
import { useState } from "react"
import { Theme, useThemeContext } from "@/components/ThemeProvider"

function Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const themeMap = {
    light: "dark",
    dark: "auto",
    auto: "light",
} as {
    [key: string]: string
}

type ThemeToggleProps = {
    isTransparent?: boolean
    css?: SerializedStyles
}

function ThemeToggle(props: ThemeToggleProps) {
    const { isAuto, theme, toggleTheme, setAuto } = useThemeContext()
    const [currentTheme, setCurrentTheme] = useState<string>(isAuto ? "auto" : theme)

    function handleChangeThemeTap() {
        const nextTheme = themeMap[currentTheme]
        setCurrentTheme(nextTheme)
        if (nextTheme === "auto") {
            setAuto(true)
        } else {
            setAuto(false)
            toggleTheme(nextTheme as Theme)
        }
    }

    const { isTransparent, ...restProps } = props
    return (
        <div
            css={css`
                user-select: none;
                cursor: pointer;
                color: ${theme === "dark" ? "#fff" : isTransparent ? "#fff" : "#000"};
            `}
            onClick={handleChangeThemeTap}
            {...restProps}
        >
            {Capitalize(currentTheme)}
            <span
                css={css`
                    width: 16px;
                    flex-shrink: 0;
                    height: 16px;
                    mask-image: ${`url("/icon/theme-${currentTheme}.svg")`};
                    vertical-align: middle;
                    box-sizing: border-box;
                    mask-repeat: no-repeat;
                    background-color: ${theme === "dark" ? "#fff" : isTransparent ? "#fff" : "#000"};
                    display: inline-block;
                    margin-left: 6px;
                `}
            ></span>
        </div>
    )
}

export default ThemeToggle
