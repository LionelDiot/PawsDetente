import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../Style/ShowItem.css";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import HandleAddToCart from "../../Tools/addToCart";
import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { loggedInAtom } from "../../Atoms/loggedin";
import handleAddToFavorites from "../../Tools/addToFavorites";
import LockIcon from '@mui/icons-material/Lock';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Divider } from "@mui/material";
import "../../App.css"

import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const ShowItem = () => {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const { itemSlug } = useParams();
  const [item, setItem] = useState({});

  const [isFavoriteButton, setIsFavoriteButton] = useState(`AJOUTER À MES FAVORIS`)

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
          `https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items/${itemSlug}`,
          {
            method: "GET",
            headers: headers,
          }
        );
        const responseData = await response.json();
        setItem(responseData);
        if (responseData.favorite === true) {
          setIsFavoriteButton('RETIRER DE MES FAVORIS')
        }
      } catch (error) {
        console.error("Error:", error);
        setItem("Une erreur s'est produite lors de la récupération des données.");
      }
    };

    fetchItemData();
  }, [itemSlug, loggedIn]);

  useEffect(() => {
    const container = document.getElementById("container");
    const img = document.getElementsByClassName("zoom")[0];

    const handleMouseMove = (e) => {
      const x = e.clientX - e.target.offsetLeft;
      const y = e.clientY - e.target.offsetTop;

      img.style.transformOrigin = `${x}px ${y}px`;
      img.style.transform = "scale(2)";
    };

    const handleMouseLeave = () => {
      img.style.transform = "scale(1)";
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [item.image_url]);

  const [isFavorite, setIsFavorite] = useState(item.favorite);

  useEffect(() => {
    setIsFavorite(item.favorite);
  }, [item.favorite]);

  const handleSwitch = async (item, user) => {
    await handleAddToFavorites(item, user);
    if (isFavoriteButton === "AJOUTER À MES FAVORIS") {
      setIsFavoriteButton("RETIRER DE MES FAVORIS");
    } else {
      setIsFavoriteButton("AJOUTER À MES FAVORIS");
    }
    setIsFavorite(!isFavorite);
  };


  return (
    <div className="container-item">
      <div className="item-section1">
        <div id="container">
          <img src={item.image_url} className="zoom" alt="Item" />
          <p className="subtitle">Passer la souris sur l'image pour zoomer</p>
        </div>
      </div>


      <div className="item-section2">
        <h1>{item.title}</h1>
        <p>{(item.price / 100).toFixed(2)}€</p>
        <p>{item.description}</p>
        <div className="buttons-section">
          <div className="favorite-section">
            <div className="custom-button">
              <div onClick={() => handleSwitch(item, user)}>
                {loggedIn && <IconButton
                  aria-label="add to favorites"
                  className={`favorite-icon ${isFavorite ? "active" : "favorite-icon"
                    }`}>
                  <FavoriteIcon />
                </IconButton>}
                <div className={`favorite-icon ${isFavorite ? "active" : "favorite-icon"
                  }`} >
                </div>
                <div>
                  {isFavoriteButton}
                </div>
              </div>
            </div>
          </div>

          <div>
            {loggedIn && (<button className="custom-button" onClick={() => HandleAddToCart(item, user)}>
              <AddShoppingCartIcon className="custom-icon" /> AJOUTER AU PANIER
            </button>)}
          </div>
        </div>

        <Divider />

        <div className="item-section3">
          <div className="grid-customer-service">
            <div>
              <h4>Sécurité garantie</h4>
              <div className="customer-service">
                <div>
                  <LockIcon />
                </div>
                <div>
                  <p>Site web sécurisé et paiement sécurisé par la Société Générale</p>
                </div>
              </div>
            </div>
            <div>
              <h4>Livraison 48/72h</h4>
              <div className="customer-service">
                <div>
                  <LocalShippingIcon />
                </div>
                <div>
                  <p>La Poste, Colissimo, Mondial Relay</p>
                </div>
              </div>
            </div>
            <div>
              <h4>Retours</h4>
              <div className="customer-service">
                <div>
                  <HandshakeIcon />
                </div>
                <div>
                  <p>14 jours pour changer d'avis.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div >
  );
};

export default ShowItem;
