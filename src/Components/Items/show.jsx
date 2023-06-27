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


const ShowItem = () => {
  const user = useAtomValue(currentUserAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const { itemSlug } = useParams();
  const [item, setItem] = useState({});

  const [isFavoriteButton, setIsFavoriteButton] = useState(`Ajouter à mes favoris`)

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
        console.log(responseData)
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

  return (
    <div className="container-item">
      <div className="item-section1">
        <div id="container">
          <img src={item.image_url} className="zoom" alt="Item" />
        </div>
      </div>

      <div className="item-section2">
        <h1>{item.title}</h1>
        <p>{(item.price / 100).toFixed(2)}€</p>
        <p>{item.description}</p>
        <p>Ajouter quantité produits</p>
        <div className="display-section2">
          {loggedIn && <button className="custom-button" onClick={() => handleAddToFavorites(item, user)}>
            <FavoriteBorderRoundedIcon className="custom-icon" /> {isFavoriteButton}
          </button>}
          <div className="display-section2">

            {loggedIn && (<button className="custom-button" onClick={() => HandleAddToCart(item, user)}>
              <AddShoppingCartIcon className="custom-icon" /> AJOUTER AU PANIER
            </button>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowItem;
