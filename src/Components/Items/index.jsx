import React, { useState, useEffect } from "react";
import Item from "./item";
import ShowButton from '../Buttons';
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";

const Items = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(
                  "https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items",
                  {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                const data = await response.json();
                setItems(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchItems();
    }, []);

    return (
        <div>
            <h1>Items</h1>
            <Grid container spacing={2}>
                {items.map((item) => (
                    <Grid item xs={2} sm={4} md={4} key={item.id}>
                        <Item item={item} />
                        <Link to={`/item/${item.id}`}>
                            <ShowButton />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Items;
