import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    titleText: {
      fontSize: 72,
      textTransform: "capitalize",
    },
    titleId: {
      color: "#ccc",
      marginLeft: 20,
      fontSize: 72,
    },

    textType: {
      textTransform: "capitalize",
      padding: "5px 15px",
      marginTop: theme.spacing(2),
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
      textAlign: "center",
      borderRadius: 10,
    },
  })
);
