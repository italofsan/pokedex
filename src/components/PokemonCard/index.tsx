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

interface PokemonCardProps {
  id: string;
  name: string;
}

export function PokemonCard({ id, name }: PokemonCardProps) {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea onClick={() => history.push(`/${id}/details`)}>
          <CardContent className={classes.cardContent}>
            <Typography variant='h5' className={classes.pokemonName}>
              {name}
            </Typography>
            <Typography variant='h5' className={classes.pokemonId}>
              #{formatId(id)}
            </Typography>
          </CardContent>
          <CardMedia
            className={classes.media}
            image={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${formatId(
              id
            )}.png`}
            title={name}
          />
        </CardActionArea>
        <CardActions>
          <Button
            size='small'
            color='primary'
            onClick={() => history.push(`/${id}/details`)}
          >
            <Typography>More Informations</Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
