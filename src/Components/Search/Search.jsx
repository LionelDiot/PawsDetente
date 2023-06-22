import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  TextField,
} from "@mui/material";

function Search() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        "https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items"
      );
      const data = await response.json();

      const filteredResults = data.filter((item) => {
        const { title, description } = item;
        const lowercaseQuery = searchQuery.toLowerCase();
        return (
          title.toLowerCase().includes(lowercaseQuery) ||
          description.toLowerCase().includes(lowercaseQuery)
        );
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - 275px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <div style={{ width: "45%", display: "flex", alignItems: "center" }}>
          <TextField
            label="Rechercher"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            style={{ marginRight: "10px" }}
          />
          <Button onClick={handleSearch} variant="contained">
            Rechercher
          </Button>
        </div>
      </div>

      <Container sx={{ py: 8, flexGrow: 1 }} maxWidth="md">
        <Grid container spacing={4}>
          {searchResults.map((item) => (
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
                    <h3>{item.title}</h3>
                  </Typography>
                  <Typography>{item.description}</Typography>
                  <br />
                  <Typography>Prix : {item.price} € TTC</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Voir</Button>
                  <Button size="small">Acheter</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
}

export default Search;