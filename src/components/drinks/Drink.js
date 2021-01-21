import React from 'react';
import GridListTile from '@material-ui/core/GridListTile';  

const Drink = ({drink})=> {
  const {idDrink, strDrink, strDrinkThumb } = drink  

  return ( 
    <GridListTile key={idDrink} cols={ 1 }>
      <img src={strDrinkThumb} alt={strDrink} />
    </GridListTile>
  );
}

export default Drink;