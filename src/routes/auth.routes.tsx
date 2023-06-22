import { Switch, Route, BrowserRouter } from "react-router-dom";

import { Layout } from "../components/Layout";

import { List } from "../pages/List";

export const AuthRoutes = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={List} />
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};
