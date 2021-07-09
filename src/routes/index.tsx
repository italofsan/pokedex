import { BrowserRouter, Switch, Route } from "react-router-dom";

import { Details } from "../pages/Details";
import { Home } from "../pages/Home";

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/:id/details' component={Details} />
      </Switch>
    </BrowserRouter>
  );
};
