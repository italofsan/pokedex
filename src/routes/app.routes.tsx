import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Layout } from "../components/Layout";

import { Details } from "../pages/Details";
import { List } from "../pages/List";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/pokemons" component={List} />
          <Route exact path="/pokemons/:id/details" component={Details} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
