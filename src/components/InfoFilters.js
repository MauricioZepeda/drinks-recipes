import React, { useContext } from 'react';

// Context
import { DrinksContext } from '../contexts/DrinksContext'; 

const InfoFilters = () => {
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

export default InfoFilters;