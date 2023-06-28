import React, { useState } from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import { useAtomValue } from 'jotai';
import { UserIdAtom } from '../../Atoms/userid';
import ItemForm from './itemform';

export default function Dashboard() {
  const userId = useAtomValue(UserIdAtom);
  const [showItemForm, setShowItemForm] = useState(false);
  const [showItemList, setShowItemList] = useState(false);
  const [showOrderList, setShowOrderList] = useState(false);

  const handleViewOrders = () => {
    setShowItemForm(false);
    setShowItemList(false);
    setShowOrderList(true);
  };

  const handleEditItem = () => {
    setShowItemForm(false);
    setShowItemList(true);
    setShowOrderList(false);
  };

  const handleCreateItem = () => {
    setShowItemForm(true);
    setShowItemList(false);
    setShowOrderList(false);
  };
  const generateNewItem = () =>{
    
  }
  React.useEffect(() => {
    // Add any necessary logic or side effects here
  }, []);

  return (
    <Container maxWidth="md">
      <Box textAlign="center" my={4}>
        <Typography variant="h4">Bienvenue sur le dashboard administrateur</Typography>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleViewOrders} sx={{ margin: '0 8px' }}>
          Voir toutes les commandes
        </Button>
        <Button variant="contained" color="primary" onClick={handleEditItem} sx={{ margin: '0 8px' }}>
          Modifier un article
        </Button>
        <Button variant="contained" color="primary" onClick={handleCreateItem} sx={{ margin: '0 8px' }}>
          Créer un nouvel article
        </Button>
      </Box>
      {showItemForm && (
        <Box my={4}>
          {/* Render the item form component here */}
          <ItemForm onSubmit={generateNewItem} />
          {/* It should include a submit button */}
        </Box>
      )}
      {showItemList && (
        <Box my={4}>
          {/* Render the list of all items component here */}<p>ItemList</p>
        </Box>
      )}
      {showOrderList && (
        <Box my={4}>
          {/* Render the list of orders component here */}<p>OrderList</p>
        </Box>
      )}
    </Container>
  );
}