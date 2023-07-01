import CheckoutButton from "../Checkout/checkoutButton";
import * as React from "react";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import HandleDeleteFromCart from "../../Tools/deleteFromCart";
import EditQuantity from "../../Tools/editQuantity";
import Divider from "../Divider/Divider";
import { Button } from "@mui/material";
import "../Style/Price.css"

export default function Cart() {
  const user = useAtomValue(currentUserAtom);
  const [items, setItems] = React.useState([]);
  const [total, setTotal] = React.useState(0);

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
        console.log(data);
        setItems(data.line_items);
        setTotal(data.total);
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
      <h2 style={{ textAlign: "center" }}>VOTRE PANIER</h2>
      <Divider />
      <Grid container spacing={5} style={{ textAlign: "center" }}>
        <Grid item xs={3}>
          <p>TITRE</p>
        </Grid>
        <Grid item xs={3}>
          <p>PRIX</p>
        </Grid>
        <Grid item xs={3}>
          <p>QUANTITÉ</p>
        </Grid>
        <Grid item xs={3}>
          <p>TOTAL</p>
        </Grid>
      </Grid>
      <Divider />

      {items.length === 0 ? (<>
        <p style={{ textAlign: "center", padding: "10px" }}>
          Votre panier est vide.
        </p>
        <p style={{ textAlign: "center", padding: "10px" }}>
          <Button variant="contained" href="/articles">Commencer votre shopping</Button>
        </p>
      </>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "grid",
            gridTemplateColumns: "1fr",
            gridGap: "20px",
          }}
        >
          {items.map((item) => (
            <li key={item.item_id}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  alignItems: "center",
                  gap: "10px",
                  textAlign: "center",
                }}
              >
                <Link
                  to={`/item/${item.item_id}`}
                  style={{ textDecoration: "none", color: "black" }}
                  
                >
          
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    {/* IMAGE */}
                    <img
                      src={item.image_url}
                      alt={item.item_title}
                      style={{
                        marginLeft: "50px",
                        width: "100px",
                        borderRadius: "33%",
                      }}
                    />

                    {/* TITRE */}
                    <p style={{ marginLeft: "30px", textAlign: "center" }}>
                      {item.item_title}
                    </p>
                  </div>
                  </Link>

                {/* PRIX */}
                <p>{(item.price / 100).toFixed(2)} €</p>
                {/* QUANTITÉ */}
                <div>
                  <select
                    value={item.quantity}
                    onChange={(event) =>
                      handleQuantityChange(item.item_id, event.target.value)
                    }
                  >
                    {[
                      ...Array(
                        item.quantity < 9 ? 10 : item.quantity + 1
                      ).keys(),
                    ].map((value) => (
                      <option key={value} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
                {/* SUBTOTAL PAR LIGNE */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div>
                    <p style={{ textAlign: "center" }}>
                      {(item.line_item_price / 100).toFixed(2)} €
                    </p>
                  </div>
                  <div style={{ textAlign: "center" }}>
                    <button
                      style={{ marginLeft: "30px", textAlign: "center" }}
                      onClick={() => handleDeleteFromCart(item.item_id)}
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul >
      )
      }
      {
        items.length !== 0 ? (
          <div>
            <Divider />

            <div style={{
              marginLeft: "auto",
              marginRight: "auto",
              display: "flex",
              flexDirection: "center",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px"
            }}>
              <div>
                <p>TOTAL À PAYER : </p>
              </div>
              <div>
                <p className="price">{(total / 100).toFixed(2)} €</p>
              </div>
            </div>

            <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "20px"
            }}>
              <div>
                <Button variant="contained" color="inherit" href="/articles">Continuer votre shopping</Button>
              </div>
              <div>
                <CheckoutButton />
              </div>
            </div>
          </div >
        ) : (
          <>
          </>
        )
      }
    </>
  );
}
