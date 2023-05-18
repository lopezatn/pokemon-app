import React, { useState, useEffect } from "react";
import "./Pokemon.css";

const Pokemon = () => {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=5");
      const { results } = await response.json();

      const arr = results.map(async (pokemon) => {
        const fetchResponse = await fetch(pokemon.url);
        const pokemonResult = await fetchResponse.json();
        return pokemonResult;
      });

      const pokemonList = await Promise.all(arr);
      setPokemons(pokemonList);
    };

    fetchData();
  }, []);

  const getStatsBase = (pokemon) => {
    return (
      <>
          {pokemon.stats.map((BaseStat) => {
            return <td>{BaseStat.base_stat}</td>;
          })}
      </>
    );
  };

  const getTypesString = (pokemon) => {
    const pokemonTypes = pokemon.types.map((type) => {
      return type.type.name;
    });

    return pokemonTypes.join(", ");
  };

  const renderPokemons = () => {
    return pokemons.map((pokemon) => {
      const pokeImgUrl =
        pokemon?.sprites?.versions["generation-v"]["black-white"].animated[
          "front_default"
        ];

      return (
        <tr key={pokemon.id}>
          <td>{pokemon.name}</td>
          {getStatsBase(pokemon)}
          <td>{getTypesString(pokemon)}</td>
          <td>{pokemon.weight}</td>
          <td>
            <img src={pokeImgUrl} alt="pokeImgUrl" />
          </td>
        </tr>
      );
    });
  };

  return (
    <div>
      <table className="table-container">
        <thead>
          <tr>
            <th rowspan={2}>Name</th>
            <th colSpan={6}>Stats</th>
            <th rowspan={2}>Types</th>
            <th rowspan={2}>Weight</th>
            <th rowspan={2}>Image</th>
          </tr>
          <tr>
            <th>HP</th>
            <th>AP</th>
            <th>DEF</th>
            <th>SA</th>
            <th>SD</th>
            <th>VEL</th>
          </tr>
        </thead>
        <tbody>{renderPokemons()}</tbody>
      </table>
    </div>
  );
};

export default Pokemon;