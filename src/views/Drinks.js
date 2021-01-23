import React, { useContext } from 'react'
import { SyncLoader } from 'react-spinners'
import './styles.css'
import Utils from '../utils'

// Components
import Search from '../components/Search'
import Types from '../components/Types'
import Ingredients from '../components/Ingredients'
import ListDrinks from '../components/ListDrinks'

// Context
import { DrinksContext } from '../contexts/DrinksContext'

const Drinks = () => {  
  const {        
    loading,
    error 
  } = useContext(DrinksContext)
  
  if(loading) return(<SyncLoader />) 
  if(error) return(<h1>{error}</h1>) 
  
  return( 
    <div>   
      <Ingredients />
      <br /> 

      <div>
        <Search />
        <Types/> 
      </div>
      <br /><br /><br />
      
      <ListDrinks /> 
    </div> 
  ) 
}  

export default Drinks