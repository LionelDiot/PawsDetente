import React, { useState, useEffect } from "react";
import Item from "./item";
import ShowButton from '../Buttons';
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";
import PaginationComponent from "../../Tools/Pagination";
import Container from "@mui/material/Container";

const Items = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  const handleChange = (event, value) => {
    setPage(value);
  };


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
        console.log(data);
        setItems(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchItems();

  }, []);

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = items.slice(startIndex, endIndex);

  // Calculate the total number of pages based on the total number of articles

  const pageCount = Math.ceil(items.length / itemsPerPage);

  return (
    <div>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={2} columns={{ xs: 4, sm: 8, md: 12 }}>
          {displayedItems.map((item) => (
            <Grid item xs={2} sm={4} md={4} key={item.id}>
              <Item item={item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      <PaginationComponent
        page={page}
        pageCount={pageCount}
        handleChange={handleChange}
      />
    </div>
  );
};

export default Items;
