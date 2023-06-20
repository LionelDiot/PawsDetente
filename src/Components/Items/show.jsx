import React, { useState, useEffect } from "react";
import Item from "./item";

import { useAtomValue } from "jotai";
import { currentUserAtom } from "../../Atoms/currentuser";
import { UserIdAtom } from "../../Atoms/userid";
import { loggedInAtom } from "../../Atoms/loggedin";
import { useParams } from "react-router-dom";

const ShowItem = () => {
  const { itemSlug } = useParams();
  const user = useAtomValue(currentUserAtom);
  const userid = useAtomValue(UserIdAtom);
  const loggedIn = useAtomValue(loggedInAtom);
  const [item, setItem] = useState({});
  const [author, setAuthor] = useState(false);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await fetch(
          `https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items/${itemSlug}`,
          {
            method: "get",
            headers: {
                  "Content-Type": "application/json",
                },
          }
        );
        const responseData = await response.json();
        setItem(responseData);
      } catch (error) {
        console.error("Error:", error);
        setItem(
          "Une erreur s'est produite lors de la récupération des données."
        );
      }
    };

    fetchItemData(); 
  }, [itemSlug]);
  
  return (
    <div>
      <h1>Show Item</h1>
      <Item item={item} />
    </div>
  );
};

export default ShowItem;
