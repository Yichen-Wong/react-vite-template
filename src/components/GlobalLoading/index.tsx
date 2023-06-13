import { css } from "@emotion/react"

function GlobalLoading({ disableAnimation = false, transparent = true }) {
    return (
        <div
            css={css`
                position: fixed;
                top: 0;
                left: 0;
                z-index: 700;
                width: 100%;
                height: min(100vh, 100%);
                background-color: ${transparent ? "rgba(0, 0, 0, 0.07)" : "#f4f4f4"};
                display: flex;
                justify-content: center;
                align-items: center;
                user-select: none;
                // 淡入
                animation: ${disableAnimation ? "none" : "fadeIn 0.3s ease-in-out"};
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}
            className="my-loading "
        >
            <img src="/Spin-1s-200px.svg" className={"w-[80px] h-[80px]"} alt="spin" />
        </div>
    )
}

export default GlobalLoading
