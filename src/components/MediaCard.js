import React from 'react';
import { withLocalize , Translate } from "react-localize-redux";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: '99%',
    padding: '1em 1em',
    margin : '1em 2em'
  },
  media: {
    height: 140,
  },
});

const MediaCard = (props)=> {
  const classes = useStyles();
  const {data : vehicle}= props;

  setInterval(() => {
    // call Action to change db
  }, 10000000);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={vehicle.img_url}
          // image="/static/images/cards/contemplative-reptile.jpg"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {vehicle.name}
          </Typography>
          <Typography>
          <Translate id="status" />
          {':'}
         { vehicle.onlineStatus? 'online' : 'offline'}
          </Typography>
          <Typography>
          <Translate id="owner" />
          {':'}
         { vehicle.owner}
          </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

export default withLocalize(MediaCard)