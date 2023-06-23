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
import Divider from "../Divider/Divider";

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
    <>
      <h2 style={{ textAlign: 'center' }}>VOTRE PANIER</h2>
      <Divider />
      <Grid container spacing={5} style={{ textAlign: 'center' }}>
        {/* <Grid item xs={3}>
          <p>PRODUIT</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '20px' }}>
                <CardMedia
                  component="div"
                  sx={{
                    // 16:9
                    pt: "10%",
                  }}
                  image={item.image_url}
                />
              </li>
            ))}
          </ul>
        </Grid> */}
        <Grid item xs={3}>
          <p>TITRE</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '20px' }}>
                <p>{item.item_title}</p>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={3}>
          <p>PRIX</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '20px' }}>
                <Typography>{item.price} €</Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={3}>
          <p>QUANTITÉ</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '20px' }}>
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
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={3}>
          <p>TOTAL</p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {items.map((item) => (
              <li key={item.id} style={{ marginBottom: '20px' }}>
                {/* Item total code here */}
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
      <CheckoutButton />
    </>
  );
}