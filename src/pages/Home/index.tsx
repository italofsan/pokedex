import React, { useState, useEffect } from "react";
import { Button, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

import api from "../../services/api";

interface IPokemon {
  name: string;
  url: string;
}

const Home: React.FC = () => {
  const [numberPages, setNumberPages] = useState<number>(0);
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [nextPage, setNextPage] = useState<string | null>("");
  const [previousPage, setPreviousPage] = useState<string | null>("");
  const [page, setPage] = useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    if (value > page) {
      console.log("Avançou");
    }
    if (value < page) {
      console.log("Retrocedeu");
    }
  };

  const getNextPage = async () => {
    try {
      const { data } = await api.get(nextPage ? nextPage : "");
      setPokemonList(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      console.log(error);
    }
  };

  const getPreviousPage = async () => {
    try {
      const { data } = await api.get(previousPage ? previousPage : "");
      setPokemonList(data.results);
      setNextPage(data.next);
      setPreviousPage(data.previous);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function getAllPokemons() {
      try {
        const { data } = await api.get("pokemon");
        setNumberPages(Math.floor(data.count / 20) + 1);
        setPokemonList(data.results);
        setNextPage(data.next);
        setPreviousPage(data.previous);
      } catch (error) {
        console.log(error);
      }
    }
    getAllPokemons();
  }, []);

  useEffect(() => {
    console.log(page);
  }, [page]);
  useEffect(() => {
    console.log(numberPages);
  }, [numberPages]);
  useEffect(() => {
    console.log(pokemonList.map((pokemon) => pokemon.name));
  }, [pokemonList]);
  useEffect(() => {
    console.log(nextPage);
  }, [nextPage]);

  return (
    <div>
      <Typography>Home</Typography>
      <Button onClick={() => getPreviousPage()}>Voltar</Button>
      <Button onClick={() => getNextPage()}>Avançar</Button>
      <Pagination count={numberPages} page={page} onChange={handleChange} />
    </div>
  );
};

export default Home;
