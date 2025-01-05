import React, { useContext } from "react"
import { themeContext, themes } from "../../contexts/theme.contexts"

export const ThemeTogglerButton = () => {
    const { theme, setTheme } = useContext(themeContext)

    return (
        <div className="start">
            <label className="switch">
                <input type="checkbox" checked={theme === themes.light} onChange={() => setTheme(theme === themes.light ? themes.dark : themes.light)} />
                <span className="slider"></span>
            </label>
        </div>
    )
}

