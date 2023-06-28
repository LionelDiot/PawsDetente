import { TableCell, Modal, Box, Typography, Button, IconButton } from "@mui/material";
import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ItemForm from "./itemform";
import { currentUserAtom } from "../../Atoms/currentuser";
import { useAtomValue } from "jotai";
import { showToastSuccess, showToastError } from "../Style/Notifications";
const ItemListItem = ({ item }) => {
  const user = useAtomValue(currentUserAtom);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditItem = () => {
    handleOpen();
    // Handle the edit item functionality
  };

  const handleFormSubmit = (updatedItem) => {
    const categoryMapping = {
      Autre: 0,
      Chien: 1,
      Chat: 2,
      Oiseau: 3,
    };
    
    const updatedItemToSend = {
      ...updatedItem,
      category: categoryMapping[updatedItem.category],
    };

    const submitEdit = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
        };
        headers["Authorization"] = user;
        const response = await fetch(
          `https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/admin/items/${updatedItem.id}`,
          {
            method: "PUT",
            headers: headers,
            body: JSON.stringify(updatedItemToSend),
          }
        );
        const responseData = await response.json();
        showToastSuccess('La modification a bien été validé.');
      } catch (error) {
        console.error("Error:", error);
        showToastError("Une erreur s'est produite.");
      }
    };
    submitEdit()
    handleClose();
  };

  return (
    <React.Fragment>
      <TableCell>{item.title}</TableCell>
      <TableCell>{item.category}</TableCell>
      <TableCell>{(item.price / 100).toFixed(2)} €</TableCell>
      <TableCell>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={handleEditItem}
        >
          Modifier
        </Button>
      </TableCell>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "8px",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", top: 0, right: 0 }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="h2" gutterBottom>
            Modifier l'article
          </Typography>
          <ItemForm item={item} onSubmit={handleFormSubmit} />
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default ItemListItem;
