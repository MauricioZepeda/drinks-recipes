import React, { useContext } from 'react'; 
import './styles.css'; 
import Types from '../components/drinks/Types'
import Ingredients from '../components/drinks/Ingredients';
import ListDrinks from '../components/drinks/ListDrinks';

import CircularProgress from '@material-ui/core/CircularProgress'; 

// Context
import { DrinksContext } from '../contexts/DrinksContext';
 

const Drinks = () => {  
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
  
  if(loading) return(<CircularProgress />) 
  if(error) return(<h1>{error}</h1>) 
  
  return( 
    <div>  
      <Types         
        listTypes={listTypes}  
        listDrinks={listDrinksFiltered}
        setListDrinksFiltered={setListDrinksFiltered}
      />  

      <Ingredients listDrinks={listDrinksFiltered} listIngredients={listIngredients} />
      <ListDrinks listDrinks={listDrinksFiltered} />
    </div> 
  ) 
}  

export default Drinks;