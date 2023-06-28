import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Box } from '@mui/material';

const ItemForm = ({ onSubmit }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create an item object with the form data
    const item = {
      imageUrl,
      title,
      price: parseInt(price),
      description,
      category: parseInt(category),
    };

    // Call the onSubmit callback with the item object
    onSubmit(item);
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
          <Select value={category} onChange={(event) => setCategory(event.target.value)}>
            <MenuItem value={0}>Autre</MenuItem>
            <MenuItem value={1}>Chien</MenuItem>
            <MenuItem value={2}>Chat</MenuItem>
            <MenuItem value={3}>Oiseau</MenuItem>
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" type="submit">
          Créer un article
        </Button>
      </form>
    </Box>
  );
};

export default ItemForm;
