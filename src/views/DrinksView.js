import React, { useContext } from 'react'
import { SyncLoader } from 'react-spinners'  

// Components 
import FilterBar from '../components/FilterBar'
import FilterByIngredients from '../components/FilterByIngredients'
import ListDrinksCards from '../components/ListDrinksCards'

// Context
import { DrinksContext } from '../contexts/DrinksContext'  

const DrinksView = () => {    
  const {       
    loading,
    error 
  } = useContext(DrinksContext)
  
  if(loading) return(<SyncLoader />) 
  if(error) return(<h1>{error}</h1>) 
  
  return(  
    <>
      <FilterBar />

      <br /><br /><br /> 
      <FilterByIngredients /> 

      <ListDrinksCards /> 
    </> 
  ) 
}   

export default DrinksView