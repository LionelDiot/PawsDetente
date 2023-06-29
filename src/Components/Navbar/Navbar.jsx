import * as React from "react";
import { Link } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
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
import "../../App.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import computeIsAdmin from "../../Tools/isAdmin";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import { useState, useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import FavoriteIcon from "@mui/icons-material/Favorite";
// Jotai
import { useSetAtom } from "jotai";
import { UserIdAtom } from "../../Atoms/userid";
import { useAtom } from "jotai";
import { cartAtom } from "../../Atoms/cart";
import { useAtomValue } from "jotai";
import { loggedInAtom } from "../../Atoms/loggedin";
import { currentUserAtom } from "../../Atoms/currentuser";

const pagesloggedin = ["articles", "profil"];
const pagesloggedout = ["articles", "s'enregistrer", "login"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElSettings, setAnchorElSettings] = React.useState(null);
  const loggedIn = useAtomValue(loggedInAtom);
  const user = useAtomValue(currentUserAtom);
  const setUser = useSetAtom(currentUserAtom);
  const setUserId = useSetAtom(UserIdAtom);
  const userid = useAtomValue(UserIdAtom);
  const [isAdmin, setIsAdmin] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenSettingsMenu = (event) => {
    setAnchorElSettings(event.currentTarget);
  };

  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };

  const [cart, setCart] = useAtom(cartAtom);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: 5,
      top: 20,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const handleLogout = () => {
    fetch(
      "https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/users/sign_out",
      {
        method: "delete",
        headers: {
          Authorization: `${user}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseData) => {})
      .catch((error) => {
        console.error("Error:", error);
      });
    setUser(null);
    setUserId(null);
  };

  const isMobileScreen = useMediaQuery("(max-width: 960px)");

  React.useEffect(() => {
    setIsAdmin(computeIsAdmin(userid));
  }, [userid]);
  // Fetch the cart item count from the API
  const fetchCartItemCount = () => {
    fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/cart", {
      method: "GET",
      headers: {
        Authorization: `${user}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const quantities = data.line_items.map((item) => item.quantity);
        const totalQuantity = quantities.reduce(
          (accumulator, current_quantity) => accumulator + current_quantity,
          0
        );
        setCart({ ...cart, quantity: totalQuantity }); // Update the cart quantity in the atom
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    if (loggedIn) {
      fetchCartItemCount(); // Fetch the initial cart item count if the user is logged in

      // Update the cart item count every minute
      const intervalId = setInterval(fetchCartItemCount, 100000);

      return () => {
        clearInterval(intervalId); // Clear the interval when the component unmounts
      };
    }
  }, [loggedIn]);

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
            PAWS DETENTE
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
            {(loggedIn ? pagesloggedin : pagesloggedout).map((page) => (
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
            component={Link} // Ajouter cette ligne
            to="/"
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
            HOME
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              alignItems: "center",
            }}
            className="searchContainer"
          >
            {(loggedIn ? pagesloggedin : pagesloggedout).map((page) => (
              <Button
                key={page}
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to={`/${page.toLowerCase()}`}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Tooltip title="Mon panier"><StyledBadge badgeContent={cart.quantity} color="secondary">
            <IconButton
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/panier"
            >
              <AddShoppingCartIcon />
            </IconButton>
          </StyledBadge></Tooltip>
          {/* Add the AdminDashboardIcon component */}
          {isAdmin && (
            <Tooltip title="Dashboard Admin"><IconButton
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/admin/dashboard"
            >
              <DashboardIcon />
            </IconButton></Tooltip>
          )}

          {loggedIn && (
            <>
              <Tooltip title="Favoris"><IconButton
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to="/favoris"
              >
                <FavoriteIcon />
              </IconButton></Tooltip>
              <Tooltip title="Se déconnecter"><IconButton
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton></Tooltip>
              <Tooltip title="Mes informations"><IconButton
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={handleOpenSettingsMenu}
              >
                <SettingsIcon />
              </IconButton></Tooltip>
            </>
          )}
        </Toolbar>
        <Menu
          id="settings-menu"
          anchorEl={anchorElSettings}
          open={Boolean(anchorElSettings)}
          onClose={handleCloseSettingsMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem component={Link} to="/changer-email">
            Changer mon email
          </MenuItem>
          <MenuItem component={Link} to="/changer-mot-de-passe">
            Changer mon mot de passe
          </MenuItem>
        </Menu>
      </Container>
    </AppBar>
  );
}

export default Navbar;
