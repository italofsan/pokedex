import { useState, useEffect, ChangeEvent, Fragment } from "react";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Search as SearchIcon } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";

import { PokemonCard } from "../../components/PokemonCard";
import { errorMessage } from "../../components/Messages";

import { onlyNumbers } from "../../utils";
import { api } from "../../services/api";

import { pokemonTypeList } from "../../constants";
import { Pokemon } from "../../type";

import { useStyles } from "./styles";

export const ListPokemon = () => {
  const classes = useStyles();

  // Pokedex has 898 Pokemons. Above 898, pokemons have no images
  const numberPokedex = Math.floor(898 / 20) + 1;
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const handleChangePage = (event: ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const [searchPokemon, setSearchPokemon] = useState("");
  const [selectedPokemonType, setSelectedPokemonType] = useState("");

  const getPokemons = async (value: number) => {
    try {
      const { data } = await api.get(`pokemon?offset=${value * 20}&limit=20`);
      const returnedPokemonList = data.results.map((pokemon: any) => ({
        name: pokemon.name,
        id: onlyNumbers(pokemon.url),
      }));
      setPokemonList(returnedPokemonList);
    } catch (error) {
      return errorMessage("Pokemon not found");
    }
  };

  const getPokemon = async (name: string) => {
    if (!name) {
      return errorMessage("É necessário inserir ID ou nome do pokemon");
    }
    try {
      const { data } = await api.get(`pokemon/${name}`);
      const returnedPokemon = [
        {
          id: String(data.id),
          name: data.name,
        },
      ];
      setPokemonList(returnedPokemon);
    } catch (error) {
      // console.log(error);
      return errorMessage("Unable to search pokemon!");
    }
  };

  const getPokemonsByType = async (type: string) => {
    try {
      const { data } = await api.get(`/type/${type}/`);
      const returnedPokemonList = data.pokemon.map((pokemon: any) => ({
        name: pokemon.pokemon.name,
        id: onlyNumbers(pokemon.pokemon.url),
      }));
      setPokemonList(returnedPokemonList);
    } catch (error) {
      // console.log(error);
      return errorMessage("Unable to search pokemons by type!");
    }
  };

  const handleChangeSelectPokemonType = (
    event: ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedPokemonType(event.target.value as string);
  };

  useEffect(() => {
    getPokemons(0);
  }, []);

  useEffect(() => {
    getPokemons(page - 1);
  }, [page]);

  useEffect(() => {
    if (selectedPokemonType) {
      getPokemonsByType(selectedPokemonType);
    } else {
      getPokemons(0);
    }
  }, [searchPokemon, selectedPokemonType]);

  return (
    <Grid container spacing={3} style={{ height: "90%" }}>
      <Grid container>
        <Grid item xs={12} lg={3} className={classes.inputContainer}>
          <TextField
            label="Search by ID or Name"
            value={searchPokemon}
            fullWidth
            onChange={(e) => setSearchPokemon(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                getPokemon(searchPokemon);
              }
            }}
            InputProps={{
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={() => getPokemon(searchPokemon)}
                >
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} lg={3} className={classes.inputContainer}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel id="pokemonTypeLabel">Search by type</InputLabel>
            <Select
              id="pokemonTypeLabel"
              labelId="pokemonTypeLabel"
              value={selectedPokemonType}
              onChange={handleChangeSelectPokemonType}
              placeholder="Search by type"
              fullWidth
            >
              <MenuItem value="">
                <em>Search by type</em>
              </MenuItem>
              {pokemonTypeList.map((pokemonType) => (
                <MenuItem value={pokemonType} key={pokemonType}>
                  {pokemonType.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {pokemonList.length !== 1
        ? pokemonList.map((pokemon: Pokemon) => {
            const pokemonId = pokemon.id;
            if (Number(pokemonId) <= 898) {
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
            }
            return null;
          })
        : pokemonList.map((pokemon: Pokemon) => {
            const pokemonId = pokemon.id;
            if (Number(pokemonId) <= 898) {
              return (
                <Grid container>
                  <Grid item xs={3} lg={4} />
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    lg={4}
                    className={classes.pokemonCardContainer}
                  >
                    <PokemonCard pokemonData={pokemon} />
                  </Grid>
                  <Grid item xs={4} lg={4} />
                </Grid>
              );
            }
            return null;
          })}

      <Grid
        container
        className={classes.pokemonPaginationContainer}
        style={{
          display:
            pokemonList.length === 1 || selectedPokemonType ? "none" : "flex",
        }}
      >
        <Pagination
          count={numberPokedex}
          page={page}
          onChange={handleChangePage}
        />
      </Grid>
    </Grid>
  );
};
