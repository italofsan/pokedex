import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";

import { formatId } from "../../utils";

import { useStyles } from "./styles";

interface IPokemon {
  name: string;
  id: string;
}

interface PokemonCardProps {
  pokemonData: IPokemon;
}

export const PokemonCard = ({ pokemonData }: PokemonCardProps) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea
          onClick={() => history.push(`/pokemons/${pokemonData.id}/details`)}
          role="pokemonCard"
        >
          <CardContent className={classes.cardContent}>
            <Typography className={classes.pokemonName}>
              {pokemonData.name}
            </Typography>
            <Typography className={classes.pokemonId}>
              #{formatId(pokemonData.id)}
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
              pokemonData.id
            )}.png`}
            title={pokemonData.name}
          />
        </CardActionArea>
        <CardActions>
          <Button
            size="small"
            variant="text"
            onClick={() => history.push(`/pokemons/${pokemonData.id}/details`)}
            role="btnMoreInfo"
          >
            <Typography style={{ color: "red" }}>More Information</Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
