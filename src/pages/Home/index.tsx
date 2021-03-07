import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

import api from "../../services/api";
import { formatId } from "../../utils";
import PokemonCard from "../../components/PokemonCard";

interface IPokemon {
  name: string;
  url: string;
}

const Home: React.FC = () => {
  const classes = useStyles();
  const [numberPages, setNumberPages] = useState<number>(0);
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const numeroPokemons = Math.floor(898 / 20) + 1;

  const getPokemons = async (value: number) => {
    try {
      const { data } = await api.get(`pokemon?offset=${value * 20}&limit=20`);
      console.log(data.results.map((pokemon: any) => pokemon.name));
      setPokemonList(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getAllPokemons() {
      try {
        const { data } = await api.get("pokemon");
        setNumberPages(Math.floor(data.count / 20) + 1);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPokemons();
  }, []);

  useEffect(() => {
    console.log(page);
    getPokemons(page - 1);
  }, [page]);
  // useEffect(() => {
  //   console.log(numberPages);
  // }, [numberPages]);
  // useEffect(() => {
  //   console.log(pokemonList.map((pokemon) => pokemon.name));
  // }, [pokemonList]);
  // useEffect(() => {
  //   console.log(nextPage);
  // }, [nextPage]);

  const getPokemon = async (name: string) => {
    try {
      const { data } = await api.get(`pokemon/${name}`);
      console.log(data);
      // console.log(data.results.map((pokemon: any) => pokemon.name));
      // setPokemonList(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        {pokemonList?.map((pokemon, id) => {
          let pokemonId = id + (page - 1) * 20 + 1;
          if (pokemonId > 898) {
            return;
          }
          return (
            <PokemonCard
              id={pokemonId.toString()}
              name={pokemon.name}
              url={pokemon.url}
            />
          );
        })}
      </div>
      <Pagination count={numeroPokemons} page={page} onChange={handleChange} />
    </div>
  );
};

export default Home;

const useStyles = makeStyles({
  pokemonName: {
    cursor: "pointer",
    backgroundColor: "#CCC",
    borderRadius: 2,
    marginBottom: 5,
  },
});
