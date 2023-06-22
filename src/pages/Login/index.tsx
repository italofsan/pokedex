import { useContext } from "react";
import {
  Button,
  Grid,
  InputLabel,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";

import { Formik, Form as FormikForm } from "formik";

import { errorMessage, successMessage } from "../../components/Messages";
import { AuthUserContext } from "../../contexts/AuthUserContext";

import { useStyles } from "./styles";

interface LoginData {
  firstName: string;
  lastName: string;
}

export const Login = () => {
  const classes = useStyles();
  const { setIsSigned } = useContext(AuthUserContext);

  const loginData: LoginData = {
    firstName: "",
    lastName: "",
  };

  const handleSubmit = (values: any) => {
    fakeLogin(values);
  };

  const fakeLogin = (values: LoginData) => {
    if (!values.firstName) {
      return errorMessage("Please, type your first name!");
    }
    if (!values.lastName) {
      return errorMessage("Please, type your last name!");
    }

    localStorage.clear();
    localStorage.setItem("signed", JSON.stringify(true));
    setIsSigned(true);
    successMessage("Enjoy it, pokemon Trainer!");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={loginData}
      onSubmit={handleSubmit}
    >
      {({ handleChange, values, handleSubmit }) => (
        <FormikForm>
          <Toolbar />
          <Grid container>
            <Grid item lg={12} className={classes.formContainer}>
              <Paper className={classes.paper}>
                <div className={classes.loginContentContainer}>
                  <div>
                    <Typography className={classes.welcomeText}>
                      Hello, Poke Trainer!
                    </Typography>
                    <Typography className={classes.instructionsText}>
                      Before knowing more about pokémon, we need some
                      information
                    </Typography>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <InputLabel className={classes.inputLabel}>
                      First Name
                    </InputLabel>
                    <TextField
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      variant="outlined"
                      color="secondary"
                      size="small"
                      fullWidth
                      required
                      inputProps={{ "data-testid": "firstNameInput" }}
                    />
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <InputLabel className={classes.inputLabel}>
                      Last Name
                    </InputLabel>
                    <TextField
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      variant="outlined"
                      color="secondary"
                      role="textbox"
                      size="small"
                      fullWidth
                      required
                      inputProps={{ "data-testid": "lastNameInput" }}
                    />
                  </div>

                  <Button
                    type="submit"
                    className={classes.buttonLogin}
                    style={{ marginTop: 12 }}
                    fullWidth
                    role="btnLogin"
                  >
                    Login
                  </Button>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </FormikForm>
      )}
    </Formik>
  );
};
