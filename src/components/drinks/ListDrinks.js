import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';  
 
import GridListTileBar from '@material-ui/core/GridListTileBar'; 
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info'; 


import Drink from "./Drink";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden' 
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

const ListDrinks = ({listDrinks}) => {
  const classes = useStyles();
  return ( 
      <div className={classes.root}>
        <GridList cellHeight={350} className={classes.gridList} cols={5}>
          { listDrinks.map(drink => (
            <GridListTile key={drink.idDrink} cols={ 1 }>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} />
              <GridListTileBar
              title={drink.strDrink}
              subtitle={<span>Type: {drink.strCategory}</span>}
              ></GridListTileBar>
            </GridListTile>
          )) }
        </GridList>
      </div> 
  );
}

export default ListDrinks;