import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CardItem from "../Style/Card";

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const isScreenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          width: "45%",
          display: "flex",
          alignItems: "center",
          flexDirection: isScreenSmall ? "column" : "row",
        }}
      >
        <TextField
          label="Rechercher"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth={!isScreenSmall}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleClickSearch();
            }
          }}
          style={{
            marginRight: isScreenSmall ? "0" : "10px",
            marginBottom: isScreenSmall ? "10px" : "0",
          }}
        />
        <Button onClick={handleClickSearch} variant="contained">
          Rechercher
        </Button>
      </div>
    </div>
  );
}

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchPerformed, setIsSearchPerformed] = useState(false);

  const handleSearch = async (searchQuery) => {
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
      setIsSearchPerformed(true);
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
      <SearchBar onSearch={handleSearch} />

      {isSearchPerformed && (
        <Container sx={{ py: 8, flexGrow: 1 }} maxWidth="md">
          <Grid container spacing={4}>
            {searchResults.map((item) => (
              <Grid item key={item.id} xs={12} sm={6} md={4}>
                <CardItem item={item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      )}
    </div>
  );
}

export default SearchBar;
