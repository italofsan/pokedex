import React from "react";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { withRouter, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { formatId } from "../../utils";

interface IPokemonCardProps {
  id: string;
  name: string;
  url: string;
}

const PokemonCard: React.FC<IPokemonCardProps> = ({ id, name, url }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <>
      <Card className={classes.card}>
        <CardActionArea
          onClick={
            () => console.log(name)
            // history.push({
            //   pathname: `/${id}/details`,
            //   state: {
            //     pokeId: id,
            //     pokeName: pokeName,
            //     pokeImage: pokeImage,
            //     pokeTypes: pokeTypes,
            //     pokeAbilities: pokeAbilities,
            //     pokeStats: pokeStats,
            //     pokeMoves: pokeMoves,
            //   },
            // })
          }
        >
          <CardContent
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography variant="h5" style={{ textTransform: "capitalize" }}>
              {name}
            </Typography>
            <Typography
              variant="h5"
              style={{ textTransform: "capitalize", color: "#CCC" }}
            >
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
            size="small"
            color="primary"
            onClick={
              () => console.log(name)
              //   history.push({
              //     pathname: `/${id}/details`,
              //     state: {
              //       pokeId: id,
              //       pokeName: pokeName,
              //       pokeImage: pokeImage,
              //       pokeTypes: pokeTypes,
              //       pokeAbilities: pokeAbilities,
              //       pokeStats: pokeStats,
              //       pokeMoves: pokeMoves,
              //     },
              //   })
            }
          >
            <Typography>More Informations</Typography>
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default PokemonCard;

const useStyles = makeStyles({
  text: {
    textTransform: "capitalize",
  },
  card: {
    width: 250,
    display: "inline-block",
    transition: ".3s ease",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  cardContainer: {
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
  },
  media: {
    height: 250,
  },
  title: {
    display: "flex",
    flexDirection: "row",
  },
  titleText: {
    textTransform: "capitalize",
  },
  titleId: {
    color: "#ccc",
    marginLeft: 20,
  },
  informations: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  section: {
    marginTop: 20,
  },
  sectionTitleText: {
    marginBottom: 10,
  },
});
