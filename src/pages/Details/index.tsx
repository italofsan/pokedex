import React, { useState, useEffect } from "react";
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { errorMessage } from "../../components/Messages";

import { pokemonTypeColors } from "../../styles/colors";
import { formatId } from "../../utils";

import pikachuLoading from "../../assets/loading.gif";

import { api } from "../../services/api";

import { useStyles } from "./styles";

interface ParamTypes {
  id: string;
}

interface Pokemon {
  id: number;
  name?: string;
  abilities?: string[];
  types?: string[];
  moves?: string[];
  stats: {
    name: string;
    value: number;
  }[];
}

export const Details = () => {
  const { id } = useParams<ParamTypes>();
  const classes = useStyles();

  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [loading, setLoading] = useState(false);

  const getPokemon = async (id: string) => {
    setLoading(true);
    try {
      const { data } = await api.get(`pokemon/${id}`);
      const returnedPokemon = {
        id: data.id,
        name: data.name,
        abilities: data.abilities.map((ability: any) => ability.ability.name),
        moves: data.moves.map((move: any) => move.move.name),
        types: data.types.map((type: any) => type.type.name),
        stats: data.stats.map((stats: any) => {
          return {
            name: stats.stat.name,
            value: stats.base_stat,
          };
        }),
      };
      setPokemon(returnedPokemon);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      errorMessage("Pokemon not found!");
    }
  };

  useEffect(() => {
    getPokemon(id);
  }, [id]);

  if (loading) {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "93%" }}
      >
        <img src={pikachuLoading} alt="Loading" />
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className={classes.title}>
          <Typography className={classes.titleText}>{pokemon.name}</Typography>
          <Typography className={classes.titleId}>
            #{formatId(String(id))}
          </Typography>
        </div>
      </Grid>
      <Grid container style={{ display: "flex", alignItems: "center" }}>
        <Grid item xs={12} sm={6} md={6} lg={4}>
          <div>
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
                id
              )}.png`}
              alt="Pokemon"
              className={classes.image}
            />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={8} style={{ paddingBottom: 16 }}>
          {pokemon.stats?.map((stat) => (
            <React.Fragment key={stat.name}>
              <Typography
                style={{ fontSize: 24, textTransform: "capitalize" }}
              >{`${stat.name}: ${stat.value}`}</Typography>
              <LinearProgress
                variant="determinate"
                value={(stat.value * 100) / 255}
                style={{ height: 16, borderRadius: 10 }}
              />
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography className={classes.titleSection}>Types</Typography>
          {pokemon?.types?.map((type) => {
            const currentType = type;
            const colorType = Object.entries(pokemonTypeColors).find((item) => {
              if (item[0] === currentType) {
                return item[1];
              }
              return null;
            });

            return (
              <Typography
                key={type}
                className={classes.textType}
                style={{
                  backgroundColor: colorType ? colorType[1] : "#FFF",
                  fontSize: 24,
                  textTransform: "capitalize",
                }}
              >
                {type}
              </Typography>
            );
          })}
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography className={classes.titleSection}>Abilities</Typography>
          <Typography
            style={{ marginTop: 16, fontSize: 24, textTransform: "capitalize" }}
          >
            {pokemon?.abilities?.join(", ")}
          </Typography>
        </Grid>
        <Grid item lg={12} style={{ marginTop: 36 }}>
          <Typography className={classes.titleSection}>Moves</Typography>
          {pokemon.moves?.length !== 0 ? (
            <Typography className={classes.textMove}>
              {pokemon?.moves?.join(", ")}
            </Typography>
          ) : (
            <Typography className={classes.textNoMove}>
              No registers found!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
