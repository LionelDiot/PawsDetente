import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HandleAddToCart from "../../Tools/addToCart";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import handleAddToFavorites from "../../Tools/addToFavorites";
import "../../App.css"; // Import CSS file for custom styles

const CardItem = ({ item }) => {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [isFavorite, setIsFavorite] = useState(false);

  const handleSwitch = (item, user) => {
    handleAddToFavorites(item, user);
    setIsFavorite(!isFavorite);
  };

  return (
    <Card
      className="card"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        width: "280px",
        height: "500px",
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: "56.25%",
        }}
        image={item.image_url}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              <p style={{ fontSize: "12px" }}>{item.category}</p>
              {item.title}
            </Typography>
          </div>
          <div>
            <Typography sx={{ mb: 2 }}>{item.description}</Typography>
          </div>
          <div>
            <Typography sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
              Prix : {(item.price / 100).toFixed(2)} € TTC
            </Typography>
          </div>
        </div>
      </CardContent>
      <CardActions sx={{ mt: "auto" }}>
        <Button size="small" href={`/item/${item.id}`}>
          Voir
        </Button>
        {loggedIn && (
          <Button
            size="small"
            onClick={() => HandleAddToCart(item, user)}
            color="primary"
          >
            Ajouter au panier
          </Button>
        )}
        {loggedIn && (
          <IconButton
            aria-label="add to favorites"
            className={isFavorite ? "favorite-icon active" : "favorite-icon"} // Apply custom CSS class
            onClick={() => handleSwitch(item, user)}
          >
            <FavoriteIcon />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};

export default CardItem;
