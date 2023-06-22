import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";

import { Login } from "../pages/Login";

export const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Redirect to={{ pathname: "/" }} />
      </Switch>
    </BrowserRouter>
  );
};
