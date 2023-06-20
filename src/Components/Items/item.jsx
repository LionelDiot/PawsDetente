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

const Item = ({ item }) => {

    return (
      <>
        <Card sx={{ maxWidth: 345 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={<h3>{item.title}</h3>}
            // subheader="September 14, 2016"
          />
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
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">{/* <ShareIcon /> */}</IconButton>
          </CardActions>
        </Card>
      </>
    );
};

export default Item;