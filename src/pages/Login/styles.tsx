import { createStyles, makeStyles, Theme } from "@material-ui/core";

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "90vh",
    },
    paper: {
      color: theme.palette.text.secondary,
      marginTop: 12,
    },
    loginContentContainer: {
      display: "flex",
      width: 400,
      padding: 24,
      flexDirection: "column",
    },
    welcomeText: {
      textAlign: "center",
      color: "#211b15",
      fontWeight: 700,
      fontSize: 24,
    },
    instructionsText: {
      textAlign: "center",
      color: "#211b15",
      fontSize: 20,
    },
    inputLabel: {
      marginBottom: theme.spacing(1),
      color: "#DB0F27",
      fontWeight: 600,
    },
    buttonLogin: {
      fontSize: 14,
      fontWeight: "bold",
      paddingTop: 12,
      paddingBottom: 12,
      paddingRight: 30,
      paddingLeft: 30,
      color: "#FFF",
      textTransform: "capitalize",
      transition: ".5s ease",
      backgroundColor: "#DB0F27",
      "&:hover": {
        backgroundColor: "rgba(219,15,39,0.8)",
      },
      borderRadius: 5,
      textDecoration: "none",
    },
  })
);
