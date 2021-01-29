import React, { useContext } from 'react';

// Components
import InfoFilters from '../filters/InfoFilters';
import DrinkCard from "./DrinkCard";

// Context
import { DrinksContext } from '../../contexts/DrinksContext';  

// Material-UI
import Grid from '@material-ui/core/Grid'; 

const ListDrinksCards = () => {
  const {
    drinksFiltered 
  } = useContext(DrinksContext); 
  
  return ( 
    <> 
      <Grid container justify="center">
        <InfoFilters />
      </Grid>

      { drinksFiltered.length > 0 &&
        <Grid container justify="space-around" >
          { drinksFiltered.map(drink => (  
            <DrinkCard key={drink.idDrink} drink={drink} />  
          )) } 
        </Grid> 
      }
    </>
  );
}

export default ListDrinksCards;