import { createStyles, makeStyles, Theme } from "@material-ui/core";

const drawerWidth = 240;

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    drawer: {
      zIndex: 1,
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      backgroundColor: "red",
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    pokemonName: {
      cursor: "pointer",
      backgroundColor: "#CCC",
      borderRadius: 2,
      marginBottom: 5,
    },
    pokemonCardContainer: {
      display: "flex",
      justifyContent: "center",
    },
    pokemonPaginationContainer: {
      display: "flex",
      justifyContent: "center",
    },

    // Form
    formControl: {
      // margin: theme.spacing(1),
      minWidth: 120,
    },
  })
);
