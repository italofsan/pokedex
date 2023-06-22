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
      fontSize: 60,
      textTransform: "capitalize",
    },
    titleId: {
      color: "#ccc",
      marginLeft: 20,
      fontSize: 60,
    },
    titleSection: {
      textAlign: "center",
      fontSize: 24,
      textTransform: "capitalize",
      fontWeight: 700,
    },
    imageContainer: {
      display: "flex",
      justifyContent: "center",
      width: "100%",
    },
    image: {
      width: "100%",
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
    textMove: {
      marginLeft: 32,
      marginRight: 32,
      fontSize: 24,
      textTransform: "capitalize",
    },
    textNoMove: {
      marginTop: 16,
      fontSize: 24,
      textTransform: "capitalize",
      marginLeft: 32,
    },
  })
);
