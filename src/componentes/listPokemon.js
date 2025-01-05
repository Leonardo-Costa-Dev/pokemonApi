import { useEffect, useState, useContext } from "react";
import Button from "./buttonInputs/button";
import { themeContext } from "../contexts/theme.contexts";
import '../App.css';
import axios from "axios";
import Navbar from "./buttonInputs/navbar";
import { Link } from "react-router-dom";


const ListPokemon = () => {
  const { theme } = useContext(themeContext);

  const [limit, setLimit] = useState(10);
  const [pokemon, setPokemon] = useState([]);
  const [card, setCard] = useState([]);

  // Mapeamento de tipos para cores
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

  // Função para obter a cor com base no tipo do Pokémon
  const getCorPorTipo = (tipo) => {
    return tipoCor[tipo] || 'gray'; // Cor padrão é cinza se o tipo não for encontrado
  };

  const getPokemons = async (limit) => {
    let results = [];
    for (let i = 1; i <= limit; i++) {
      results.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
    return axios.all(results.map((results) => axios.get(results))).then((dados) => setPokemon(dados));
  };

  const i_pokemon = async () => {
    let results = [];
    for (let i = 1; i < 200; i++) {
      results.push(`https://pokeapi.co/api/v2/pokemon/${i}`);
    }
    return axios.all(results.map((results) => axios.get(results))).then((dados) => setCard(dados));
  };

  const pokemonFilter = (name) => {
    let FilterPokemons = [];
    if (name === '') {
      return getPokemons(limit);
    }
    for (let i in card) {
      if (card[i].data.name.includes(name)) {
        FilterPokemons.push(card[i]);
      }
    }
    setPokemon(FilterPokemons);
  };

  useEffect(() => {
    getPokemons(limit);
    i_pokemon();
  }, [limit]);

  return (
    <div className="root"
      style={{
        color: theme.color,
        backgroundImage: theme.backgroundImage,
        backgroundSize: theme.backgroundSize,
        backgroundPosition: theme.backgroundPosition,
        backgroundRepeat: theme.backgroundRepeat,
        transition: '0.8s'
      }}
    >
      <header>
        <Navbar pokemonFilter={pokemonFilter} />
      </header>
      <section className="sectionPokemon">
        <div className="listPokemon">
          <ul className="conteiner-list">
            {pokemon.map((pokemon, index) => {
              
              const tipo = pokemon.data.types[0]?.type.name; // Obtendo o tipo do Pokémon
              const cor = getCorPorTipo(tipo); // Aplicando a cor baseada no tipo

              return (
                <Link key={index} to={`/${pokemon.data.name}`}>
                  <li key={index}
                    style={{ backgroundColor: cor, padding: '20px', borderRadius: '10px', color: 'white' }}>
                    <img src={pokemon.data.sprites.front_default} alt="imagem pokemon" />
                    <h3>{pokemon.data.name}</h3>
                    <h4 className="tipo">{tipo}</h4>
                  </li>
                </Link>
              );
            })}
          </ul>
          <Button limit={limit} setLimit={setLimit} />
        </div>
      </section>
    </div>
  );
};

export default ListPokemon;

