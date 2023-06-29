import React, { useEffect } from 'react';
import { useAtom } from 'jotai';
import { Typography, Table, TableHead, TableBody, TableRow, TableCell} from '@mui/material';
import ItemListItem from './itemListItem';
import { editCountAtom } from '../../Atoms/editCount';


const ItemIndex = () => {
  const [editCount, setEditCount] = useAtom(editCountAtom);
  const [items, setItems] = React.useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
        };

        const response = await fetch('https://api-paws-detente-6e0fafb6dbaa.herokuapp.com/items', {
          method: 'GET',
          headers: headers,
        });

        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, [editCount]);

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Liste de nos articles en vente :
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Titre</TableCell>
            <TableCell>Catégorie</TableCell>
            <TableCell>Prix</TableCell>
            <TableCell>Modifier</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <ItemListItem item={item} />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemIndex;

