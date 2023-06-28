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
import SearchIcon from "@mui/icons-material/Search";
import { useMediaQuery } from "@mui/material";
import "../../App.css";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DashboardIcon from "@mui/icons-material/Dashboard";
import computeIsAdmin from "../../Tools/isAdmin";
// Jotai
import { useSetAtom, useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { UserIdAtom } from "../../Atoms/userid";
import { loggedInAtom } from "../../Atoms/loggedin";

const pagesloggedin = ["articles", "profil", "panier"];
const pagesloggedout = ["articles", "s'enregistrer", "login"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
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
            <MenuItem>
              <Link
                to="/rechercher"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={handleCloseNavMenu}
              >
                <Typography textAlign="center">Rechercher</Typography>
              </Link>
            </MenuItem>
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

            <IconButton
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/rechercher"
            >
              <SearchIcon />
            </IconButton>
          </Box>
          {/* Add the AdminDashboardIcon component */}
          {isAdmin && (
            <IconButton
              sx={{ my: 2, color: "white", display: "block" }}
              component={Link}
              to="/admin/dashboard"
            >
              <DashboardIcon />
            </IconButton>
          )}
          {loggedIn && (
            <>
              <IconButton
                sx={{ my: 2, color: "white", display: "block" }}
                component={Link}
                to="/panier"
              >
                <AddShoppingCartIcon />
              </IconButton>
              <Tooltip title="Logout">
                <Button onClick={handleLogout} color="inherit">
                  Se déconnecter
                </Button>
              </Tooltip>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
