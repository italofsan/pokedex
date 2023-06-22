import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
      alignItems: "center",

      [theme.breakpoints.down("xs")]: {
        padding: theme.spacing(1),
      },
    },
    cardContainer: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
    },
    media: {
      height: 250,
      [theme.breakpoints.down("xs")]: {
        height: 150,
      },
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
  })
);
