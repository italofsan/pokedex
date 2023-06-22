import { useState, ReactNode, useContext } from "react";
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";

import { AuthUserContext } from "../../contexts/AuthUserContext";

import { useStyles } from "./styles";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { setIsSigned } = useContext(AuthUserContext);
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar style={{ backgroundColor: "#DB0F27" }}>
        <Typography variant="h6" noWrap style={{ color: "#FFF" }}>
          Pokedex App
        </Typography>
      </Toolbar>
      <List style={{ padding: 0 }}>
        <ListItem
          onClick={() => history.push("/pokemons")}
          selected={location.pathname === "/"}
          style={{ cursor: "pointer" }}
          role="btnAllPokemons"
        >
          <ListItemText
            style={{
              color: location.pathname === "/" ? "red" : "black",
            }}
          >
            All Pokemons
          </ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          onClick={() => {
            localStorage.setItem("signed", JSON.stringify(false));
            setIsSigned(false);
          }}
          style={{ cursor: "pointer" }}
          role="btnexit"
        >
          <ListItemText>Exit</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Pokedex App
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp>
          <Drawer
            style={{ flexShrink: 0 }}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Toolbar />
        {children}
      </main>
    </div>
  );
};
