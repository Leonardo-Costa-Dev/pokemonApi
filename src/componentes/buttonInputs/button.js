import React from "react"
import "../../App.css"
import { FcTodoList } from "react-icons/fc";
import { FcDeleteDatabase } from "react-icons/fc";

const Button = (props) => {
  const pokemon = 10

  const loadPokemon = () => {
    return props.setLimit(pokemon + props.limit)
  }

  const removePokemon = () => {
    if (props.limit > 10) {
      props.setLimit(props.limit - pokemon)
    } else {
      alert('Adicione mais pokemons')
      props.setLimit(pokemon)
    }
  }

  return (
    <div className="btn">
      <button onClick={() => loadPokemon()}>{<FcTodoList style={{fontSize:"30px"}} />}</button>
      <button onClick={() => removePokemon() }>{<FcDeleteDatabase style={{fontSize:"30px"}} />}</button>
    </div>
  )
}

export default Button