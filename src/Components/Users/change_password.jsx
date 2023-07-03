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
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";

const defaultTheme = createTheme();

export default function ChangePassword() {

    const usertoken = useAtomValue(currentUserAtom);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPassword = event.target.elements.password.value;
        const passwordConfirmation = event.target.elements.password_confirmation.value;
        const userPassword = event.currentTarget.current_password.value;

        const data = {
            user: {
                password: newPassword,
                password_confirmation: passwordConfirmation,
                current_password: userPassword,
            },
        };

        try {
            const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/new-password", {
                method: "POST",
                headers: {
                    "Authorization": usertoken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showToastSuccess("Mot de passe modifié !")
            } else {
                showToastError("Mot de passe actuel ou de confirmation erroné")
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
                            name="current_password"
                            label="Mot de passe actuel"
                            type="password"
                            id="currentPassword"
                        />

                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Nouveau mot de passe"
                            type="password"
                            id="password"
                        />


                        <TextField
                            required
                            fullWidth
                            name="password_confirmation"
                            label="Confirmation mot de passe"
                            type="password"
                            id="passwordVerification"
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enregistrer le nouveau mot de passe
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
