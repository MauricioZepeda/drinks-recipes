import React, { useState, useEffect, useContext } from 'react'; 
import { SyncLoader } from 'react-spinners';
import './styles.css'; 
import Types from '../components/Types'
import Ingredients from '../components/Ingredients';
import ListDrinks from '../components/ListDrinks'; 

// Context
import { DrinksContext } from '../contexts/DrinksContext';  

const Drinks = () => {  
  const [ query, setQuery ] = useState({ types:[], ingredients:[] })

  useEffect(()=>{
    filterDrinks()
  },[query])

  const {      
    allDrinks,
    drinksFiltered,  
    listIngredients,
    listTypes,
    loading,
    error,
    setDrinksFiltered
  } = useContext(DrinksContext); 
  

  const filterDrinks = () => {  
    if(query.types.length === 0 && query.ingredients.length === 0){
      setDrinksFiltered([]) 
      return []
    }

    const drinksFilteredByType = (query.types.length > 0) 
      ? allDrinks.filter(drink => query.types.some(type => type === drink.strAlcoholic))
      : allDrinks

    const drinksFilteredByIngredients = (query.ingredients.length > 0) 
    ? drinksFilteredByType.filter(drink => {
        const keysIngredients = Object.keys(drink).filter(key => key.includes('strIngredient'))
        const existIngredient = keysIngredients.some(keyName => query.ingredients.includes(drink[keyName]))   
        return existIngredient 
      })
    : drinksFilteredByType 
    
    const finalListResult = Array.from(new Set(drinksFilteredByIngredients))

    setDrinksFiltered(finalListResult)
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





  if(loading) return(<SyncLoader />) 
  if(error) return(<h1>{error}</h1>) 
  
  return( 
    <div>   
      <Ingredients 
        listDrinks={drinksFiltered} 
        listIngredients={listIngredients} 
        filterDrinksByIngredients={filterDrinksByIngredients}
      />
      <br /> 
      <Types         
        listTypes={listTypes}  
        listDrinks={drinksFiltered}
        setDrinksFiltered={setDrinksFiltered}
        filterDrinksByType={filterDrinksByType}
      /> 
      <br /><br /><br />
      <ListDrinks listDrinks={drinksFiltered} />
    </div> 
  ) 
}  

export default Drinks;