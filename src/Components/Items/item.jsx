import React from "react";
// import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

const Item = ({ item }) => {
    return (
      <>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardHeader title={<h3>{item.title}</h3>} />
          <CardMedia
            component="img"
            height="194"
            image={item.image_url}
            alt={item.title}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {<p>{item.description}</p>}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {<p> Prix: {item.price}</p>}
            </Typography>
          </CardContent>
        <CardActions>
          <Link to={`/item/${item.id}`}>
            <Button size="small">Voir</Button>
          </Link>
        </CardActions>
        </Card>
      </>
    );
};

export default Item;