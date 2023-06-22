import { useContext } from "react";
import { AppRoutes } from "./app.routes";
import { AuthRoutes } from "./auth.routes";
import { AuthUserContext } from "../contexts/AuthUserContext";

export const Routes = () => {
  const { isSigned } = useContext(AuthUserContext);

  return isSigned === true ? <AppRoutes /> : <AuthRoutes />;
};
