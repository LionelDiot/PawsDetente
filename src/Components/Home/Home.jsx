import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Jumbotron from "../Style/Jumbotron";
import HandleAddToCart from "../../Tools/addToCart";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import "./Home.css";
import { BookmarkOutlined } from "@mui/icons-material";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.log(error));
  }, []);

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
                  align="justify-content"
                  color="text.secondary"
                  paragraph
                  style={{
                    maxWidth: "100%",
                    margin: "0 auto",
                    fontSize: "1.5rem", // Default font size
                    "@media (max-width: 600px)": {
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
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {items.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
                  <Card
                    className="card"
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

                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          height: "100%",
                        }}
                      >
                        <div>
                          <Typography gutterBottom variant="h5" component="h2">
                            <h3>{item.title}</h3>
                          </Typography>
                        </div>
                        <div>
                          <Typography sx={{ mb: 2 }}>
                            {item.description}
                          </Typography>
                        </div>
                        <div>
                          <Typography sx={{ mt: 2, mb: 2, fontWeight: "bold" }}>
                            Prix : {(item.price / 100).toFixed(2)} € TTC
                          </Typography>
                        </div>
                      </Box>

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
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      </main>
    </ThemeProvider>
  );
}
