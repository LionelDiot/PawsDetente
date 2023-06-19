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

function Copyright(props) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function ResetPassword() {
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
            password: formPassword,
            password_confirmation: formPasswordVerification,
            reset_password_token: tokenSlug
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
                        Réinitialiser mon mot de passe
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
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            
                            
                                <TextField
                                    required
                                    fullWidth
                                    name="passwordVerification"
                                    label="Password Verification"
                                    type="password"
                                    id="passwordVerification"
                                    autoComplete="new-password"
                                />
                            
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        // onClick={showToastSuccessLogin}
                        >
                            Enregistrer le nouveau mot de passe
                        </Button>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
