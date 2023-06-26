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

const Item = ({ item }) => {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);

  return (
    <>
      <Card
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          margin: "20px",
          width: "280px", // Adjust the width as desired
          height: "480px", // Adjust the height as desired
        }}
        className="card"
      >
        <CardMedia
          component="div"
          sx={{
            // 16:9
            pt: "56.25%",
          }}
          image={item.image_url}
        />
        <CardHeader
          titleTypographyProps={{ variant: "h5" }}
          title={item.title}
          sx={{ pb: 0, mb: 0 }}
        />
        <CardContent
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography sx={{ mt: "auto", mb: 2 }}>{item.description}</Typography>
          <Typography sx={{ mt: "auto", mb: 2, fontWeight: "bold" }}>
            Prix : {(item.price / 100).toFixed(2)} € TTC
          </Typography>
        </CardContent>
        <CardActions sx={{ mt: "auto" }}>
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
        </CardActions>
      </Card>
    </>
  );
};

export default Item;
