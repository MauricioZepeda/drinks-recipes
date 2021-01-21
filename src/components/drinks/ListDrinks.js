import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';  

import Drink from "./Drink";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: '100%',
    height: '100%',
  },
}));

const ListDrinks = ({listDrinks}) => {
  const classes = useStyles();
  return ( 
      <div className={classes.root}>
        <GridList cellHeight={350} className={classes.gridList} cols={6}>
          { listDrinks.map(drink => (
            <GridListTile key={drink.idDrink} cols={ 1 }>
              <img src={drink.strDrinkThumb} alt={drink.strDrink} />
            </GridListTile>
          )) }
        </GridList>
      </div> 
  );
}

export default ListDrinks;