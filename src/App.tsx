import { CssBaseline } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "./routes";
import { AuthUserContextProvider } from "./contexts/AuthUserContext";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["VT323"].join(","),
  },
});

export function App() {
  return (
    <AuthUserContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
        <ToastContainer limit={3} transition={Slide} />
      </ThemeProvider>
    </AuthUserContextProvider>
  );
}
