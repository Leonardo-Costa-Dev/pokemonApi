import { createContext, useState } from "react"
import paisagemDia from "../componentes/img/paisagemDia.jpg"
import paisagemNoite from "../componentes/img/paisagemNoite.jpg"


export const themes = {
    light: {
        Color: '#000',
        backgroundImage: `url(${paisagemDia})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
    },
    dark: {
        Color: '#000',
        backgroundImage: `url(${paisagemNoite})`,
        backgroundSize: 'cover', 
        backgroundPosition: 'center', 
        backgroundRepeat: 'no-repeat'
    }
}

export const themeContext = createContext({})

export const ThemeProvider = (props) => {
    const [theme, setTheme] = useState(themes.light)

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
                {props.children}
        </themeContext.Provider>
    )
}

