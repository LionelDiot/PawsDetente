import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HandleAddToCart from "../../Tools/addToCart";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import handleAddToFavorites from "../../Tools/addToFavorites";

const Item = ({ item }) => {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardHeader title={<h3>{item.title}</h3>} />
        <CardMedia
          component="img"
          height="194"
          image={item.image_url}
          alt={item.title}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {<p>{item.description}</p>}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {<p> Prix: {(item.price / 100).toFixed(2)}</p>}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" href={`/item/${item.id}`}>
            Voir
          </Button>
          {loggedIn && (
            <Button
              size="small"
              onClick={() => HandleAddToCart(item, user)}
              color="inherit"
            >
              Ajouter au panier
            </Button>
          )}
          {loggedIn && (
            <Button
              size="small"
              onClick={() => handleAddToFavorites(item, user)}
              color="inherit"
            >
              Ajouter aux favoris
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
};

export default Item;
