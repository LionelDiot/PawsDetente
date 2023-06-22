import React, { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import {
  Typography,
  Container,
  Card,
  Box,
  Stack,
  IconButton,
  Divider,
  Chip,
  Switch,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./Myprofile.css";

export default function MyProfile() {
  const [monprofil, setMonprofil] = useState("");
  const [responseData, setResponseData] = useState(null);
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);

  useEffect(() => {
    if (loggedIn) {
      fetch("https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/member-data", {
        method: "get",
        headers: {
          Authorization: `${user}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((responseData) => {
          const createdAt = new Date(
            responseData.user.createdAt
          ).toLocaleString();
          setResponseData(responseData);
          setMonprofil(`email: ${responseData.user.email}
                        id: ${responseData.user.id}
                        username: ${responseData.user.username}
                        créé le: ${JSON.stringify(createdAt)}
                        all my data pas trié ? : ${JSON.stringify(
                          responseData.user
                        )}
                        mon token JOTAI : ${user}`);
          console.log(responseData);
        })
        .catch((error) => {
          console.error("Error:", error);
          setMonprofil(
            "Une erreur s'est produite lors de la récupération des données."
          );
        });
    } else {
      setMonprofil("Vous n'êtes pas connecté. Vous n'avez donc pas de profil.");
    }
  }, [user, loggedIn]);

  return (
    <Box
      className="profile-container"
      sx={{
        minHeight: "71vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" gutterBottom></Typography>
        <Card elevation={3} sx={{ padding: "1rem" }}>
          <Box sx={{ p: 2 }}>
            <Stack spacing={0.5}>
              <Typography fontWeight={700}>Profil de l'utilisateur</Typography>

              <Typography fontWeight={700} color="text.secondary">
                {monprofil && (
                  <>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      email:{" "}
                    </Typography>
                    {responseData && responseData.user.email}
                    <br />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      id:{" "}
                    </Typography>
                    {responseData && responseData.user.id}
                    <br />
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      component="span"
                    >
                      username:{" "}
                    </Typography>
                    {responseData && responseData.user.username}
                  </>
                )}
              </Typography>
            </Stack>
            <IconButton>
              <EditIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Box>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 2, py: 1, bgcolor: "background.default" }}
          >
            <Chip label="Active account" />
            <Switch />
          </Stack>
        </Card>
      </Container>
    </Box>
  );
}
