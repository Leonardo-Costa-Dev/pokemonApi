
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { themeContext } from "../contexts/theme.contexts";
import { ThemeTogglerButton } from "./buttonInputs/temeTogglerButton";
import pokemonName from '../componentes/img/pokemon-2048.png';
import { FcHome } from "react-icons/fc";

const CardDetails = () => {
    const { theme } = useContext(themeContext);

    const [pokemon, setPokemon] = useState(null);
    const [attributeType, setAttributeType] = useState(''); // 'moves' ou 'abilities'
    const { name } = useParams();

    const MAX_STAT = 255; // Valor máximo para os status de um Pokémon

    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
            .then(item => setPokemon(item.data))
            .catch(error => console.error("Erro ao carregar Pokémon:", error));
    }, [name]);

    if (!pokemon) {
        return <p>Carregando...</p>; // Exibe um estado de carregamento
    }

    const tipoCor = {
        grass: 'lightgreen',
        fire: 'red',
        water: 'DeepSkyBlue',
        plant: 'green',
        electric: 'Gold',
        ice: 'lightblue',
        fairy: 'pink',
        psychic: 'DarkSlateBlue',
        dragon: 'indigo',
        normal: 'RosyBrown',
        poison: 'purple',
        ground: 'brown',
        rock: 'SlateGray',
        fighting: 'DarkGoldenrod',
        ghost: 'PowderBlue'
        // Adicione mais tipos conforme necessário
      };

      const getCorPorStatus = (status) => {
        return tipoCor[status] || 'gray'; // Cor padrão é cinza se o tipo não for encontrado
      };

      const status = pokemon.types[0]?.type.name; // Obtendo o tipo do Pokémon
      const cor = getCorPorStatus(status); // Aplicando a cor baseada no tipo
      console.log(pokemon)
    return (
        <div
            style={{
                color: theme.color,
                backgroundImage: theme.backgroundImage,
                backgroundSize: theme.backgroundSize,
                backgroundPosition: theme.backgroundPosition,
                backgroundRepeat: theme.backgroundRepeat,
            }}
        >
            <header className="cabecalhoCard">
                <Link to={`/`}>
                    <button className="btnHeader">{<FcHome style={{fontSize:'30px'}} />}</button> 
                </Link>
                <img src={pokemonName} alt="Pokemon" className="cabecalho" />
                <ThemeTogglerButton />
            </header>
            <main>
                <section className="sectionCard">
                    <div className="CardPokemon" style={{backgroundColor: cor}}>
                        <div className="pokemon">
                            <img
                                src={pokemon.sprites.other.dream_world.front_default}
                                alt={pokemon.name}
                            />
                            <h2>{pokemon.name}</h2>
                            <h4 style={{background: cor, padding: '8px', borderRadius: '5px'}}>{pokemon.types.map(item => item.type.name).join(' | ')}</h4>
                            <div className="status">
                                {pokemon.stats.map((stat, index) => (
                                    <div key={index} className="stat-bar">
                                        <p>{stat.stat.name.toUpperCase()}: {stat.base_stat}</p>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-bar-inner"
                                                style={{ width: `${(stat.base_stat / MAX_STAT) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="attribute">
                            <div className="attBtn">
                                <button className="attributeBtn" style={{backgroundColor: cor}} onClick={() => setAttributeType('moves')}>Move List</button>
                                <button className="attributeBtn" style={{backgroundColor: cor}} onClick={() => setAttributeType('abilities')}>Ability List</button>
                            </div>
                         
                        </div>
                        <div className="listAttribute">
                                {attributeType === 'moves' && <MoveList moves={pokemon.moves} />}
                                {attributeType === 'abilities' && <AbilityList abilities={pokemon.abilities} />}
                            </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

const MoveList = ({ moves }) => (
    <ul>
        {moves.map((item, index) => (
            <li key={index}>{item.move.name}</li>
        ))}
    </ul>
);

const AbilityList = ({ abilities }) => (
    <ul>
        {abilities.map((item, index) => (
            <li key={index}>
                <h2>{item.ability.name}</h2>
                <AbilityDetails url={item.ability.url} />
            </li>
        ))}
    </ul>
);

const AbilityDetails = ({ url }) => {
    const [ability, setAbility] = useState(null);

    useEffect(() => {
        axios.get(url)
            .then(res => setAbility(res.data))
            .catch(error => console.error("Erro ao carregar habilidades:", error));
    }, [url]);

    if (!ability) {
        return <p>Carregando detalhes da habilidade...</p>;
    }

    return (
        <p>{ability.effect_entries.map((entry, index) => (
            <span key={index}>{entry.effect}</span>
        ))}</p>
    );
};

export default CardDetails;
