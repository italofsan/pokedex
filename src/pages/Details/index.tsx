import React, { useState, useEffect } from "react";
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import { useParams } from "react-router-dom";

import { errorMessage } from "../../components/Messages";

import { typePokemonColors } from "../../styles/colors";
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
      setPokemon({
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
      });
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

  useEffect(() => {
    console.log(pokemon);
  }, [pokemon]);

  if (loading) {
    return (
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ minHeight: "93%" }}
      >
        <img src={pikachuLoading} alt='Loading' />
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
      <Grid container lg={6} xs={12}>
        <Grid item lg={12} xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
                id
              )}.png`}
            />
          </div>
        </Grid>
        <Grid item lg={12} xs={12} style={{ paddingBottom: 16 }}>
          {pokemon.stats?.map((stat) => (
            <React.Fragment key={stat.name}>
              <Typography
                style={{ fontSize: 24, textTransform: "capitalize" }}
              >{`${stat.name}: ${stat.value}`}</Typography>
              <LinearProgress
                variant='determinate'
                value={(stat.value * 100) / 255}
                style={{ height: 16, borderRadius: 10 }}
              />
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
      <Grid container lg={6}>
        <Grid item xs={6} sm={6} md={6} lg={6}>
          <Typography
            style={{
              textAlign: "center",
              fontSize: 24,
              textTransform: "capitalize",
            }}
          >
            Types
          </Typography>
          {pokemon?.types?.map((type) => {
            let currentType = type;
            let colorType = Object.entries(typePokemonColors).find((item) => {
              if (item[0] === currentType) {
                return item[1];
              }
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
          <Typography
            style={{
              textAlign: "center",
              fontSize: 24,
              textTransform: "capitalize",
            }}
          >
            Abilities
          </Typography>
          <Typography
            style={{ marginTop: 16, fontSize: 24, textTransform: "capitalize" }}
          >
            {pokemon?.abilities?.join(", ")}
          </Typography>
        </Grid>
        <Grid item lg={12}>
          <Typography
            style={{
              textAlign: "center",
              fontSize: 24,
              textTransform: "capitalize",
            }}
          >
            Moves
          </Typography>
          {pokemon.moves?.length !== 0 ? (
            <Typography
              style={{
                marginLeft: 32,
                marginRight: 32,
                fontSize: 24,
                textTransform: "capitalize",
              }}
            >
              {pokemon?.moves?.join(", ")}
            </Typography>
          ) : (
            <Typography
              style={{
                marginTop: 16,
                fontSize: 24,
                textTransform: "capitalize",
                marginLeft: 32,
              }}
            >
              No registers found!
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};
