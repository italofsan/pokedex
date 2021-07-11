import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useTheme,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";
import { useLocation } from "react-router-dom";

import { PokemonCard } from "../../components/PokemonCard";
import { errorMessage } from "../../components/Messages";

import { onlyNumbers } from "../../utils";
import { api } from "../../services/api";

import { useStyles } from "./styles";

interface IPokemon {
  name: string;
  id: string;
}

const pokemonTypeList = [
  "bug",
  "dragon",
  "fairy",
  "fire",
  "ghost",
  "ground",
  "normal",
  "psychic",
  "steel",
  "dark",
  "electric",
  "fighting",
  "flying",
  "grass",
  "ice",
  "poison",
  "rock",
  "water",
];

export function List() {
  const classes = useStyles();

  // Pokedex has 898 Pokemons. Above 898, pokemons have no images
  const numberPokedex = Math.floor(898 / 20) + 1;
  const [pokemonList, setPokemonList] = useState<IPokemon[]>([]);
  const [page, setPage] = useState(1);
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const getPokemons = async (value: number) => {
    try {
      const { data } = await api.get(`pokemon?offset=${value * 20}&limit=20`);
      console.log(
        data.results.map((pokemon: any) => ({
          name: pokemon.name,
          id: onlyNumbers(pokemon.url),
        }))
      );
      setPokemonList(
        data.results.map((pokemon: any) => ({
          name: pokemon.name,
          id: onlyNumbers(pokemon.url),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemons(0);
  }, []);

  useEffect(() => {
    getPokemons(page - 1);
  }, [page]);

  const getPokemon = async (name: string) => {
    if (!name) {
      return errorMessage("É necessário inserir ID ou nome do pokemon");
    }
    try {
      const { data } = await api.get(`pokemon/${name}`);
      console.log(data);
      // console.log(data.results.map((pokemon: any) => pokemon.name));
      setPokemonList([
        {
          id: String(data.id),
          name: data.name,
        },
      ]);
    } catch (error) {
      console.log(error);
      return errorMessage("Unable to search pokemon!");
    }
  };

  const [searchPokemon, setSearchPokemon] = useState("");
  const [selectedPokemonType, setSelectedPokemonType] = useState("");
  const fetchPokemonsByType = async (type: string) => {
    try {
      const { data } = await api.get(`/type/${type}/`);
      setPokemonList(
        data.pokemon.map((pokemon: any) => ({
          name: pokemon.pokemon.name,
          id: onlyNumbers(pokemon.pokemon.url),
        }))
      );
    } catch (error) {
      console.log(error);
      return errorMessage("Unable to search pokemons by type!");
    }
  };

  const handleChangeSelectPokemonType = (
    event: ChangeEvent<{ value: unknown }>
  ) => {
    console.log(event.target.value);
    setSelectedPokemonType(event.target.value as string);
  };

  useEffect(() => {
    if (selectedPokemonType) {
      fetchPokemonsByType(selectedPokemonType);
    } else {
      getPokemons(0);
    }
  }, [searchPokemon, selectedPokemonType]);

  return (
    <Grid container spacing={3}>
      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form
            className={classes.formControl}
            onSubmit={(e: FormEvent) => {
              e.preventDefault();
              getPokemon(searchPokemon);
              console.log("haha");
            }}
          >
            <TextField
              label='Search by ID or Name'
              value={searchPokemon}
              fullWidth
              onChange={(e) => setSearchPokemon(e.target.value)}
              InputProps={{
                endAdornment: (
                  <IconButton
                    size='small'
                    onClick={() => getPokemon(searchPokemon)}
                  >
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </form>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FormControl className={classes.formControl}>
            <InputLabel id='pokemonTypeLabel'>Search by type</InputLabel>
            <Select
              labelId='pokemonTypeLabel'
              value={selectedPokemonType}
              onChange={handleChangeSelectPokemonType}
              // style={{ width: 200 }}
              fullWidth
            >
              <MenuItem value=''>Search by type</MenuItem>
              {pokemonTypeList.map((pokemonType) => (
                <MenuItem value={pokemonType} key={pokemonType}>
                  {pokemonType.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {pokemonList.map((pokemon: IPokemon) => {
        let pokemonId = pokemon.id;
        if (Number(pokemonId) > 898) {
          return;
        }
        return (
          <Grid
            item
            xs={6}
            sm={6}
            md={6}
            lg={3}
            key={pokemon.name}
            className={classes.pokemonCardContainer}
          >
            <PokemonCard pokemonData={pokemon} />
          </Grid>
        );
      })}
      {(!selectedPokemonType || !searchPokemon) && (
        <Grid container className={classes.pokemonPaginationContainer}>
          <Pagination
            count={numberPokedex}
            page={page}
            onChange={handleChangePage}
          />
        </Grid>
      )}
    </Grid>
  );
}
