import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Jumbotron from "../Style/Jumbotron";
import "../../App.css";
import CardItem from "../Style/Card";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import { useAtomValue } from "jotai";
import PaginationComponent from "../../Tools/Pagination";

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

export default function Home() {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const handleChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items
    .slice(startIndex, endIndex)
    ;

  const pageCount = Math.ceil(items.length / itemsPerPage);

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

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <main>
        <Box
          sx={{
            position: "relative",
            backgroundColor: "#ccc",
          }}
        >
          <Jumbotron />
          <Box
            sx={{
              position: "absolute",
              top: "40%",
              left: "25%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1, // seems to be working as a layer !!!
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              width: "600px",
              height: "400px",
              padding: "24px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px 85px",
              display: "none", // Hide the box by default
              "@media (min-width: 600px)": {
                display: "flex", // Show the box when screen size is 600px or larger
              },
            }}
          >
            <Typography
              component="h1"
              variant="poster"
              align="center"
              color="text.primary"
              gutterBottom
            >
              PAWS DÉTENTE
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={4}>
                <img
                  src={"https://i.postimg.cc/ZRby0gzg/logo-paws-detente.png"}
                  alt="Your Image"
                  style={{ width: "80%" }}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={8}>
                <Typography
                  variant="h5"
                  align="center"
                  color="text.secondary"
                  paragraph
                  style={{
                    maxWidth: "100%",
                    margin: "0 auto",
                    fontSize: "1.5rem", // Default font size
                    "@media (maxWidth: 600px)": {
                      fontSize: "0.5rem", // Reduced font size for smaller screens
                    },
                  }}
                >
                  S'ils le pouvaient ils se lèveraient sur leurs petites pattes,
                  et iraient acheter Kwiskas. A la place de ça, ils passent leur
                  temps à jouer au babyfoot et dépenser notre argent, les chats
                  c'est vraiment des branleurs !
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <div className="container3">
          <Container sx={{ py: 8 }}>
            <Typography variant="h4">
              Accessoires pour nos compagnons
            </Typography>
            <Grid container spacing={0} sx={{ py: 8 }}>
              {items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <CardItem item={item} />
                </Grid>
              ))}
            </Grid>
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
      </main>
    </ThemeProvider >
  );
}
