import React, { useState } from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import { useAtomValue } from 'jotai';
import { UserIdAtom } from '../../Atoms/userid';
import ItemForm from './itemform';
import { showToastSuccess, showToastError } from '../Style/Notifications';
import { currentUserAtom } from '../../Atoms/currentuser';
import OrderIndex from './orderIndex';
import ItemIndex from './itemIndex';

export default function Dashboard() {
  const user = useAtomValue(currentUserAtom);
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
  const generateNewItem = (item) =>{
    const fetchItemData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          "Authorization": user,
        };

        const response = await fetch(
          `https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/admin/items`,
          {
            method: "POST",
            headers: headers,
            body: JSON.stringify(item),
          }
        );
        const responseData = await response.json();
        showToastSuccess("Votre article a bien été créé.");
        
      } catch (error) {
        console.error("Error:", error);
        showToastError("Une erreur s'est produite");
      }
    };

    fetchItemData();
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
          {/* Render the list of all items component here */}<ItemIndex onSubmit={generateNewItem}/>
        </Box>
      )}
      {showOrderList && (
        <Box my={4}>
          {/* Render the list of orders component here */}<OrderIndex />
        </Box>
      )}
    </Container>
  );
}