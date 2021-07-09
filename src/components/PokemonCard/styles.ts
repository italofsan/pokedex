import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles({
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
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
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
  pokemonName: {
    textTransform: "capitalize",
  },
  pokemonId: {
    textTransform: "capitalize",
    color: "#CCC",
  },
});
