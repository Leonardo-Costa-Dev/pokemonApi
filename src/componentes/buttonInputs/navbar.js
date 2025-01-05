import { ThemeTogglerButton } from "./temeTogglerButton"
import Logo from '../img/pokemon-2048.png'

const Navbar = ({pokemonFilter}) => {
    return(
        <div className="cabecalho">
            <form onChange={e => pokemonFilter(e.target.value)} >
                <input 
                type="text" 
                className="input" 
                placeholder="Search Here"
                />
            </form>
            <img src={Logo} alt="logo pokemon"/>
            <ThemeTogglerButton />
        </div>
    )
}

export default Navbar