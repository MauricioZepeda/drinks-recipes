import React, { useContext } from 'react' 
import Loading from '../components/commons/Loading'
import DrinkDetailCard from '../components/DrinkDetailCard'

// Components 
import FilterBar from '../components/FilterBar'
import FilterByIngredients from '../components/FilterByIngredients'
import ListDrinksCards from '../components/ListDrinksCards'

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