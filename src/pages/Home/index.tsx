import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import Pagination from "@material-ui/lab/Pagination";

import { PokemonCard } from "../../components/PokemonCard";
import { PokemonList } from "../../components/PokemonList";

import { api } from "../../services/api";

import { useStyles } from "./styles";
import {
  AppBar,
  Drawer,
  FormControl,
  Grid,
  Hidden,
  IconButton,
  Input,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Menu as MenuIcon, Search as SearchIcon } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { errorMessage } from "../../components/Messages";
import { onlyNumbers } from "../../utils";

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

export const Home = () => {
  const classes = useStyles();
  const theme = useTheme();
  const location = useLocation();
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
    // console.log(page);
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

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: "red" }}>
        <Typography variant='h6' noWrap style={{ color: "#FFF" }}>
          Pokedex App
        </Typography>
      </Toolbar>
      <List>
        <ListItem to='/' component={Link} selected={location.pathname === "/"}>
          <ListItemText
            style={{
              color: location.pathname === "/" ? "red" : "black",
            }}
          >
            Home
          </ListItemText>
        </ListItem>
        <ListItem
          to='/pokemon-list'
          component={Link}
          selected={location.pathname === "/pokemons"}
        >
          <ListItemText
            style={{
              color: location.pathname === "/pokemons" ? "red" : "black",
            }}
          >
            All Pokemons
          </ListItemText>
        </ListItem>
      </List>
    </div>
  );

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
    <div className={classes.root}>
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap>
            Pokedex App
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            style={{ flexShrink: 0 }}
            variant='temporary'
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container spacing={3}>
          <Grid container>
            <Grid
              item
              xs={4}
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
              xs={4}
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
                  style={{ width: 200 }}
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
                xs={12}
                sm={12}
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
            <Grid item xs={12} className={classes.pokemonPaginationContainer}>
              <Pagination
                count={numberPokedex}
                page={page}
                onChange={handleChangePage}
              />
            </Grid>
          )}
        </Grid>
      </main>
    </div>
  );
};
