import React, { useState, useEffect, useContext } from 'react'; 
import './styles.css'; 
import Types from '../components/drinks/Types'
import Ingredients from '../components/drinks/Ingredients';
import ListDrinks from '../components/drinks/ListDrinks';

import CircularProgress from '@material-ui/core/CircularProgress'; 

// Context
import { DrinksContext } from '../contexts/DrinksContext';  

const Drinks = () => {  
  const [ query, setQuery ] = useState({ types:[], ingredients:[] })

  useEffect(()=>{
    filterDrinks()
  },[query])

  const {     
    listCategories,
    listDrinks,
    listDrinksFiltered, 
    listGlases,
    listIngredients,
    listTypes,
    loading,
    error,
    setListDrinksFiltered
  } = useContext(DrinksContext); 
  

  const filterDrinks = () => {
      const {types: typesToFilter, ingredients: ingredientesToFilter} = query

      if(typesToFilter.length === 0 && ingredientesToFilter.length === 0){
        setListDrinksFiltered([]) 
        return []
      }

      const drinksFilteredByType = (typesToFilter.length > 0) 
        ? listDrinks.filter(drink => typesToFilter.some(type => type === drink.strAlcoholic))
        : listDrinks

      const drinksFilteredByIngredients = (ingredientesToFilter.length > 0) 
      ? drinksFilteredByType.filter(drink => {
          const keysIngredients = Object.keys(drink).filter(key => key.includes('strIngredient'))
          const existIngredient = keysIngredients.some(keyName => ingredientesToFilter.includes(drink[keyName]))   
          return existIngredient 
        })
      : drinksFilteredByType 

    const listDrinksUnique = new Set(drinksFilteredByIngredients)
    const finalListResult = Array.from(listDrinksUnique)

    setListDrinksFiltered(finalListResult)
    return finalListResult
  }






  const filterDrinksByType = (newFilter) => {
    const { type, active } = newFilter  

    const filters = (active)
    ? [...query.types, type] 
    : [...query.types].filter(typeSaved => typeSaved !== type) 

    setQuery({      
      types: filters,
      ingredients: query.ingredients
    })
  }

  const filterDrinksByIngredients = (ingredients) => { 
    setQuery({      
      types: query.types,
      ingredients: ingredients
    })
  }





  if(loading) return(<CircularProgress />) 
  if(error) return(<h1>{error}</h1>) 
  
  return( 
    <div>  
      <Types         
        listTypes={listTypes}  
        listDrinks={listDrinksFiltered}
        setListDrinksFiltered={setListDrinksFiltered}
        filterDrinksByType={filterDrinksByType}
      />  

      <Ingredients 
        listDrinks={listDrinksFiltered} 
        listIngredients={listIngredients} 
        filterDrinksByIngredients={filterDrinksByIngredients}
      />

      <ListDrinks listDrinks={listDrinksFiltered} />
    </div> 
  ) 
}  

export default Drinks;