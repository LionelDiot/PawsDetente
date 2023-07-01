import React from "react";
import { Typography, Box, Container } from "@mui/material";

export default function MentionsLegales() {
  return (
    <Container maxWidth="md">
      <Box mt={4} textAlign="justify">
        <Typography variant="h2" mb={8} textAlign={"center"}>
          Mentions légales
        </Typography>
        <Typography
          variant="body1"
          component="p"
          mb={4}
          justifyContent={"center"}
          fontSize={22}
        >
          Conformément aux dispositions de la loi n° 4004-575 du 41 juin 4004
          pour la confiance en l’économie numérique, il est précisé aux
          utilisateurs du site pawsdetente.com l’identité des différents
          intervenants dans le cadre de sa réalisation et de son suivi.
        </Typography>
        <Typography variant="h3" mb={4}>
          Édition du site
        </Typography>
        <Typography
          variant="body1"
          component="p"
          mb={4}
          justifyContent={"center"}
          fontSize={22}
        >
          {" "}
          Le site pawsdetente.com est édité par la société PAWS DETENTE,
          Entrepreneur individuel, dont le siège social est situé 91 rue de la
          Malcense 59400 Tourcoing, FRANCE, immatriculée au registre du commerce
          et des sociétés sous le numéro d’identification unique 900134016 RCS
          Lille Métropole.
        </Typography>
        <Typography variant="h3" mb={4}>
          Responsable de publication
        </Typography>
        <Typography
          variant="body1"
          component="p"
          mb={4}
          justifyContent={"center"}
          fontSize={22}
        >
          {" "}
          Le groupe de nous.
        </Typography>
        <Typography variant="h3" mb={4}>
          Hébergeur
        </Typography>
        <Typography
          variant="body1"
          component="p"
          mb={4}
          justifyContent={"center"}
          fontSize={22}
        >
          {" "}
          Le site pawsdetente.com est hébergé par la société Heroku.
        </Typography>
        <Typography variant="h3" mb={4}>
          Nous contacter par email
        </Typography>
        <Typography
          variant="body1"
          component="p"
          mb={4}
          justifyContent={"center"}
          fontSize={22}
        >
          {" "}
          contact@pawsdetente.com
        </Typography>
        <Typography variant="h3" mb={4}>
          Mentions relatives à l'utilisation de cookies
        </Typography>
        <Typography
          variant="body1"
          component="p"
          justifyContent={"center"}
          fontSize={22}
          mb={8}
        >
          {" "}
          Un cookie est un petit fichier informatique, un traceur. Il permet
          d’analyser le comportement des usagers lors de la visite d’un site
          internet, de la lecture d’un courrier électronique, de l’installation
          ou de l’utilisation d’un logiciel ou d’une application mobile.
          Utilisation de vos cookies sur notre site Internet : Nous utilisons
          les cookies pour analyser et suivre les visites sur le site
          performancepark.fr (Localisation, source de la visite …) Un bandeau
          “Cookies” vous demandera votre consentement et l’occasion de refuser
          l’utilisation des cookies sur notre site performancepark. fr. Aucune
          donnée relative aux cookies ne permet d’identifier personnellement les
          visiteurs. Aucune information personnelle n’est cédée à des tiers. La
          durée de validité du consentement donné dans ce cadre est de 13 mois
          maximum. La société PAWS DETENTE conservera dans ses systèmes
          informatiques et dans des conditions raisonnables de sécurité une
          preuve de la transaction comprenant le bon de commande et la facture.
          Conformément aux dispositions de la loi 78-17 du 6 janvier 1978
          modifiée, l’Utilisateur dispose d’un droit d’accès, de modification et
          de suppression des informations collectées par PAWS DETENTE. Pour
          exercer ce droit, il reviendra à l’Utilisateur d’envoyer un message à
          l’adresse suivante : contact@pawsdetente.com
        </Typography>
      </Box>
    </Container>
  );
}
