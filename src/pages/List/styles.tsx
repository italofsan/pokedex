import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
      padding: theme.spacing(1),
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
    },
    inputContainer: {
      display: "flex",
      justifyContent: "center",
      padding: "0px 12px 12px 12px",
    },
    pokemonCardContainer: {
      display: "flex",
      justifyContent: "center",
    },
    pokemonPaginationContainer: {
      display: "flex",
      justifyContent: "center",
      paddingBottom: theme.spacing(1),
    },
  })
);
