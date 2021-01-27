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

    const initialMessage = 'Look for some recipes' 
    const isFavorite =  favorite ? ' on your favorites' : ''
    const drinksFound = `${drinksFiltered.length} drinks found ${isFavorite}`
    const noDrinksFound = `No drinks found ${ isFavorite }`
    const favoriteMessage =  favorite 
                              ? `${drinksFiltered.length } drinks on favorites` 
                              : initialMessage   

    const message = (existsData && existsQuery) 
                      ? drinksFound 
                      : !existsQuery 
                          ? favoriteMessage 
                          : noDrinksFound 
    return message
  }

  return (
    <h1>{getOptions()} </h1>
  )
}

export default InfoFilters; 