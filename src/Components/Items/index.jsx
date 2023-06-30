import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import PaginationComponent from "../../Tools/Pagination";
import Container from "@mui/material/Container";
import CardItem from "../Style/Card";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SearchBar from "../Search/Search"; // Import the SearchBar component
import { Typography } from "@mui/material";

import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import { useAtomValue } from "jotai";

const defaultTheme = createTheme({
  typography: {
    fontFamily: [
      "Nunito",
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: "1200px",
          "@media (min-width: 1200px)": {
            maxWidth: "1200px",
          },
        },
      },
    },
  },
});

const Items = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const itemsPerPage = 8;

  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (category) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category)
      );
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

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

      setItems(filteredResults);
      setPage(1); // Reset the page to the first page
    } catch (error) {
      console.error("Erreur lors de la recherche :", error);
    }
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };

        if (loggedIn) {
          headers["Authorization"] = user;
        }

        const response = await fetch(
          `https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items/`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const responseData = await response.json();
        setItems(responseData);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchItemData();
  }, [loggedIn]);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items
    .slice(startIndex, endIndex)
    .filter((item) =>
      selectedCategories.length === 0
        ? true
        : selectedCategories.includes(item.category)
    );

  const pageCount = Math.ceil(items.length / itemsPerPage);

  const categories = [
    { name: "oiseau", label: "Oiseau" },
    { name: "chat", label: "Chat" },
    { name: "chien", label: "Chien" },
    { name: "autre", label: "Autre" },
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <Typography variant="h4" sx={{ py: 4 }}>
        Bienvenue sur la page des articles
      </Typography>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            maxWidth: "100%",
            padding: "0 20px",
          }}
        >
          {/* Render the SearchBar component */}
          <SearchBar
            onSearch={handleSearch}
            inputProps={{
              style: { fontSize: "18px", padding: "10px", width: "600px" },
            }}
          />
        </div>

        <Container
          sx={{ py: 8, display: "flex", flexDirection: "column" }}
          maxWidth="md"
          style={{ padding: "0 20px" }}
        >
          <Container sx={{ py: 4 }}>
            <div>
              <strong style={{ marginBottom: "10px", display: "block" }}>
                Filtrer par catégorie:
              </strong>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                {categories.map((category) => (
                  <label key={category.name} style={{ marginBottom: "20px" }}>
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.name)}
                      onChange={() => handleCategoryChange(category.name)}
                    />
                    {category.label}
                  </label>
                ))}
              </div>
            </div>

            <Grid container spacing={6}>
              {displayedItems.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <CardItem item={item} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Container>

        <div>
          <div>
            <PaginationComponent
              page={page}
              pageCount={pageCount}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Items;
