import React, { useContext } from 'react' 

// Components 
import Loading from '../components/commons/Loading'
import FilterBar from '../components/filters/FilterBar'
import FilterByIngredients from '../components/filters/FilterByIngredients'
import ListDrinksCards from '../components/drinks/ListDrinksCards'
import DrinkDetailCard from '../components/drinks/DrinkDetailCard'

// Context
import { DrinksContext } from '../contexts/DrinksContext'  

const DrinksView = () => {    
  const { 
    drinkSelected,
    setDrinkSelected,
    loading,
    error   
  } = useContext(DrinksContext)
  
  if(loading) return(<Loading />) 
  if(error) return(<h1>{error}</h1>) 
  
  return(  
    <>
      <FilterBar /> 
      <FilterByIngredients />  
      {!drinkSelected && <ListDrinksCards /> }
      {drinkSelected && <DrinkDetailCard 
                        drink={drinkSelected} 
                        setDrinkSelected={setDrinkSelected} /> }
    </> 
  ) 
}   

export default DrinksView