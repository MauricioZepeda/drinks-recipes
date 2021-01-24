import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles'; 

import Grid from '@material-ui/core/Grid';

// Components
import Drink from "./Drink";

// Context
import { DrinksContext } from '../contexts/DrinksContext'; 
 
const ListDrinks = () => {
  const {      
    drinksFiltered 
  } = useContext(DrinksContext); 
  
  return ( 
    <> 
      <Grid container justify="center">
        <OptionsSelected />
      </Grid>

      <Grid container justify="space-around" >
        { drinksFiltered.map(drink => (  
          <Drink key={drink.idDrink} drink={drink} />  
        )) } 
      </Grid> 
    </>
  );
}

const OptionsSelected = ()=>{
  const {      
    drinksFiltered,
    query 
  } = useContext(DrinksContext); 
  
  const getOptions = () => {
    const { types, ingredients, name, favorite } = query

    const existsData = drinksFiltered.length > 0
    const existsQuery = types.length > 0 || ingredients.length > 0 || name.length > 0 

    const message  = (existsData && existsQuery) 
                      ? `${drinksFiltered.length} drinks found ${ favorite ? 'on favorites' : ''  }`
                      : ( existsQuery 
                          ? `No drinks found ${ favorite ? 'on favorites' : ''}`
                          : `${ favorite ? drinksFiltered.length +' drinks on favorites' : "Enter your search"  }` )
    return message
  }

  return (
    <h1>{getOptions()} </h1>
  )
}

export default ListDrinks;