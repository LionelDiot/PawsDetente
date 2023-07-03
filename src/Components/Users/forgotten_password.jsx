import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { showToastSuccess, showToastError } from "../Style/Notifications";

const defaultTheme = createTheme();

export default function ForgottenPassword() {

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formUsername = event.currentTarget.email.value;
        const data = {
            user: {
                email: formUsername,
            },
        };

        try {

            const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/users/password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showToastSuccess("email envoyé")
            } else {
                showToastError("email non valide")
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
                        Recevoir un email pour réinitialiser mon mot de passe :
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Confirmer
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
