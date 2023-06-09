import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSetAtom } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { UserIdAtom } from "../../Atoms/userid";
import { showToastSuccess, showToastError } from "../Style/Notifications";


const defaultTheme = createTheme();

export default function SignUp() {
  const setUser = useSetAtom(currentUserAtom);
  const [error, setError] = useState("");
  const setId = useSetAtom(UserIdAtom);

  const saveProfile = async (e) => {
    e.preventDefault();
    const formEmail = e.target.elements.email.value;
    const formPassword = e.target.elements.password.value;
    const formPasswordVerification =
      e.target.elements.passwordVerification.value;

    if (formPassword !== formPasswordVerification) {
      setError("Passwords do not match");
      return;
    }

    const data = {
      user: {
        email: formEmail,
        password: formPassword,
      },
    };

    try {

      const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
      );

      if (response.ok) {

        const token = await response.headers.get("Authorization");
        setUser(token);
        const responseData = await response.json();
        setId(responseData.user.id);
        showToastSuccess("Votre compte a bien été créé.");
      } else {
        setError("Identifiants non conforme. (email déjà utilisé?)");
        showToastError(error);
      }
    } catch (error) {
      setError("Une erreur est survenue.");
      showToastError(error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            S'enregistrer
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={saveProfile}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordVerification"
                  label="Vérification mot de passe"
                  type="password"
                  id="passwordVerification"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              S'enregistrer
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Déjà un compte ? Connecte-toi
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
