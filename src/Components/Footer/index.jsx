import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";
import "../../App.css";
import { Link as RouterLink } from "react-router-dom";

export default function Footer() {
  const handleLegalLinkClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#1976d2",
        p: 3,
        mt: "auto",
        textAlign: "center",
      }}
      className="my-custom-footer2"
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              A propos
            </Typography>
            <Typography variant="body2" color="white">
              Nous sommes l'entreprise Paws Détente, pourvoyeur de bonne humeur
              pour vos amis les plus fidèles.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="white" gutterBottom>
              Nous contacter
            </Typography>
            <Typography variant="body2" color="white">
              Rue des animaux
            </Typography>
            <Typography variant="body2" color="white">
              Email: pawsdétente@yopmail.com
            </Typography>
            <Typography variant="body2" color="white">
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sm={4}
            container
            direction="column"
            alignItems="center"
          >
            <Typography variant="h6" color="white" gutterBottom>
              Nous suivre :
            </Typography>
            <Grid item container justifyContent="center" spacing={1}>
              <Grid item>
                <Link href="https://www.facebook.com/" color="inherit">
                  <Facebook />
                </Link>
              </Grid>
              <Grid item>
                <Link
                  href="https://www.instagram.com/"
                  color="inherit"
                  sx={{ pl: 1, pr: 1 }}
                >
                  <Instagram />
                </Link>
              </Grid>
              <Grid item>
                <Link href="https://www.twitter.com/" color="inherit">
                  <Twitter />
                </Link>
              </Grid>
            </Grid>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              <Link
                color="inherit"
                component={RouterLink}
                to="/Legal"
                onClick={handleLegalLinkClick}
              >
                Legal
              </Link>
              <br />
              {"Copyright "}
              <Link color="inherit" href="https://www.pawsdetente.com/">
                Paws Détente
              </Link>
              {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}