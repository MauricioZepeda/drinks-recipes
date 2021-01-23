import React from 'react';  
import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar'; 
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info'; 

const useStyles = makeStyles(() => ({ 
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const Drink = ({drink})=> {
  const classes = useStyles();
  const {idDrink, strDrink, strDrinkThumb } = drink  

  return ( 
    <GridListTile key={idDrink} cols={ 1 }>
      <img src={strDrinkThumb} alt={strDrink} /> 
      <GridListTileBar
        title={strDrink}
        subtitle={<span>Type: strCategory</span>}
        actionIcon={
          <IconButton aria-label={`info about ${strDrink}`} className={classes.icon}>
            <InfoIcon />
          </IconButton>
        }
      />
    </GridListTile>
  );
}

export default Drink;