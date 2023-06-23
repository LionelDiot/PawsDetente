import CheckoutButton from "../Checkout/checkoutButton";
import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Jumbotron from "../Style/Jumbotron";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import HandleDeleteFromCart from "../../Tools/deleteFromCart";
import EditQuantity from "../../Tools/editQuantity";
const defaultTheme = createTheme();

export default function Cart() {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [items, setItems] = React.useState([]);

  const handleQuantityChange = (itemId, newQuantity) => {
    EditQuantity(itemId, newQuantity, user) // Call the imported function
      .then(() => {
        // After successful quantity update, update the list of items
        fetchCartItems();
      })
      .catch((error) => console.log(error));
  };

  const fetchCartItems = () => {
    fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/cart", {
      method: "GET",
      headers: {
        Authorization: `${user}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setItems(data.line_items);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  const handleDeleteFromCart = (itemId) => {
    HandleDeleteFromCart(itemId, user) // Call the imported function
      .then(() => {
        // After successful deletion, update the list of items
        fetchCartItems();
      })
      .catch((error) => console.log(error));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Jumbotron />
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <CheckoutButton />
          <Grid container spacing={4}>
            {items.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image={item.image_url}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      <h3>{item.item_title}</h3>
                    </Typography>
                    <Typography>{item.description}</Typography>
                    <br></br>
                    <Typography>Prix : {item.price} € / unité</Typography>
                    <br></br>
                    <form>
        <label>
          Quantité :
          <select
            value={item.quantity}
            onChange={(event) =>
              handleQuantityChange(item.item_id, event.target.value)
            }
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>
      </form>
                  </CardContent>
                  <CardActions>
                  <Button
                      size="small"
                      onClick={() => handleDeleteFromCart(item.item_id, user)}
                      color="inherit"
                    >
                      Supprimer du panier
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}