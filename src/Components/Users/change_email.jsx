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

export default function ChangeEmail() {

    const usertoken = useAtomValue(currentUserAtom);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newEmail = event.target.elements.email.value;

        const data = {
            user: {
                email: newEmail
            },
        };

        try {
            const response = await fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/new-email", {
                method: "POST",
                headers: {
                    "Authorization": usertoken,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {

                showToastSuccess("Adresse email modifiée !")
            } else {
                showToastError("Adresse email actuelle ou de confirmation erronée")
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
                        Changer mon adresse email
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
                            name="current_email"
                            label="Adresse email actuelle"
                            type="email"
                            id="currentEmail"
                        />

                        <TextField
                            required
                            fullWidth
                            name="email"
                            label="Nouvelle adresse email"
                            type="email"
                            id="currentEmail"
                        />


                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Enregistrer la nouvelle adresse email
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
