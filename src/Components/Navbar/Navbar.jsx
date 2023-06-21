import * as React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import PetsIcon from "@mui/icons-material/Pets";
import { useMediaQuery } from "@mui/material";
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
// Jotai
import { useSetAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { UserIdAtom } from "../../Atoms/userid";
import { loggedInAtom } from "../../Atoms/loggedin";



const pages = ["Items", "MyProfile"];

function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const loggedIn = useAtomValue(loggedInAtom);
    const user = useAtomValue(currentUserAtom);
    const setUser = useSetAtom(currentUserAtom);
    const setUserId = useSetAtom(UserIdAtom);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogout = () => {
        fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/users/sign_out", {
            method: "delete",
            headers: {
                Authorization: `${user}`,
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error:", error);
            });
        setUser(null);
        setUserId(null);
    };

    const handlePayment = async () => {
      try {
        // Make the API request to create a checkout session
        const response = await fetch('http://localhost:3000/checkout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount: 100 }), // Adjust the amount according to your needs
        });
    
        // Handle the API response
        if (response.ok) {
          const { sessionId } = await response.json();
    
          // Load the Stripe instance
          const stripe = await loadStripe('pk_test_51MeC2IGFwxWB3B7MgBO0JGpTwYeudavjvvMa9Jbcu4PN1gerYAI9ErBoETZPAKKbF21EHxu8MUfATXaTvSrZgYSj00YrK3BnKT'); 
    
          // Redirect the user to the Stripe checkout page
          stripe.redirectToCheckout({ sessionId });
        } else {
          console.error('Error:', response.status);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const isMobileScreen = useMediaQuery("(max-width: 960px)");

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <PetsIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component={Link}
                        to="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        HOME
                    </Typography>

                    {isMobileScreen && (
                        <Tooltip title="Open navigation menu">
                            <IconButton
                                size="large"
                                aria-label="open navigation menu"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                        </Tooltip>
                    )}

                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "left",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: "block", md: "none" },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page}>
                                <Link
                                    to={`/${page.toLowerCase()}`}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">{page}</Typography>
                                </Link>
                            </MenuItem>
                        ))}
                    </Menu>

                    <PetsIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                        {loggedIn ? (
                            // Render "Home" and "MyProfile" buttons when logged in
                            pages.map((page) => (
                                <Button
                                    key={page}
                                    sx={{ my: 2, color: "white", display: "block" }}
                                    component={Link}
                                    to={`/${page.toLowerCase()}`}
                                >
                                    {page}
                                </Button>
                            ))
                        ) : (
                            // Render "Register" and "Login" buttons when not logged in
                            <>
                                <Button
                                    sx={{ my: 2, color: "white", display: "block" }}
                                    component={Link}
                                    to="/register"
                                >
                                    Register
                                </Button>
                                <Button
                                    sx={{ my: 2, color: "white", display: "block" }}
                                    component={Link}
                                    to="/login"
                                >
                                    Login
                                </Button>
                            </>
                        )}
                    </Box>

                    {loggedIn && (
                        <Tooltip title="Logout">
                            <Button onClick={handleLogout} color="inherit">
                                Se déconnecter
                            </Button>
                        </Tooltip>
                    )}
                    <Button onClick={handlePayment} color="inherit">
                                Payer
                            </Button>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
