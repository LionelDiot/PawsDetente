import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from "@mui/material";

const ItemForm = ({ item, onSubmit }) => {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (item) {
      setImageUrl(item.image_url);
      setTitle(item.title);
      setPrice(item.price.toString());
      setDescription(item.description);
      setCategory(item.category.toLowerCase());
    }
  }, [item]);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an item object with the form data
    if (item) {
      const updatedItem = {
        id: item.id,
        image_url: imageUrl,
        title: title,
        price: parseInt(price),
        description: description,
        category: category.charAt(0).toUpperCase() + category.slice(1),
      };
    }

    // Call the onSubmit callback with the updated item object
    onSubmit(updatedItem);
  };

  return (
    <Box maxWidth="400px" mx="auto">
      <form onSubmit={handleSubmit}>
        <TextField
          label="Image URL"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
          required
          margin="normal"
        />
        <TextField
          label="Price (in cents)"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          fullWidth
          required
          type="number"
          margin="normal"
        />
        <TextField
          label="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
          required
          multiline
          rows={4}
          margin="normal"
        />
        <FormControl fullWidth required margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <MenuItem value="autre">Autre</MenuItem>
            <MenuItem value="chien">Chien</MenuItem>
            <MenuItem value="chat">Chat</MenuItem>
            <MenuItem value="oiseau">Oiseau</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          {item ? "Modifier l'article" : "Créer un article"}
        </Button>
      </form>
    </Box>
  );
};

export default ItemForm;
