import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { showToastSuccessLogin, showToastErrorLogin } from "../Style/Notifications";
import { useParams } from "react-router-dom";

const defaultTheme = createTheme();

export default function ChangePassword() {
    const { tokenSlug } = useParams();
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formPassword = event.currentTarget.password.value;
        const formPasswordVerification = event.target.elements.passwordVerification.value;
        if (formPassword !== formPasswordVerification) {

            return;
        }
        const data = {
            user: {
                password: new_password,
                password_confirmation: new_password,
                current_password: current_password
            },
        };

        try {
            const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/users/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const responseData = await response.json();

                showToastSuccessLogin()
            } else {
                showToastErrorLogin()
            }
        } catch (error) {
            // Handle error
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
                        Changer mon mot de passe
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >

                        <TextField
                            required
                            fullWidth
                            name="currentPassword"
                            label="Mot de passe actuel"
                            type="password"
                            id="currentPassword"
                            autoComplete="new-password"
                        />

                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Nouveau mot de passe"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                        />


                        <TextField
                            required
                            fullWidth
                            name="passwordVerification"
                            label="Confirmation mot de passe"
                            type="password"
                            id="passwordVerification"
                            autoComplete="new-password"
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={showToastSuccessLogin}
                        >
                            Enregistrer le nouveau mot de passe
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
