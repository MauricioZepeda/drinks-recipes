import React, { useContext, useEffect } from 'react'; 

// Context
import { DrinksContext } from '../contexts/DrinksContext';

const Drinks = () => { 
  const {    
    getDrinks,
    listCategories,
    listDrinks
  } = useContext(DrinksContext); 

  useEffect(()=>{ 
    getDrinks(); 
  },[])  
 

  return( 
    <div>
        CATEGORIES
       <ul>
          {listCategories.map(category => {
            return(
              <li key={category.strCategory} >{category.strCategory}</li>
            )
          })}
       </ul>
       <hr></hr>
        DRINKS
        <ul>
          {listDrinks.map(drink => {
            return(
              <li key={drink.idDrink} >{drink.strDrink}</li>
            )
          })}
       </ul>
     
    </div>
  ) 
} 

export default Drinks;