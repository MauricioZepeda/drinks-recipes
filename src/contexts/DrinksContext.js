import React, { useState, createContext } from "react" 

export const DrinksContext = createContext() 
const baseURL = 'https://www.thecocktaildb.com/api/json/v1/1'

const DrinksContextProvider = ({ children }) => {
  const [listCategories, setListCategories] = useState([]); 
  const [listDrinks, setListDrinks] = useState([]);
   
  const getDrinks = async() => {
    // GET CATEGORIES
    const categories = await fetch(`${baseURL}/list.php?c=list`)  
    const listCategoriesParsed = await categories.json() 
    const { drinks: listCategories } = listCategoriesParsed 
    setListCategories(listCategories)

    // GET DRINKS BY CATEGORY
    const drinksByCategory = await listCategories.map(async(category) =>{
      const { strCategory } = category 
      const drinks = await fetch(`${baseURL}/filter.php?c=${strCategory}`)  
      const listDrinksParsed = await drinks.json() 
      const { drinks: listDrinks } = listDrinksParsed  
      return listDrinks 
    }) 


    Promise.all(drinksByCategory).then(data => { 
      const allDrinks = data.flat()
    
      // GET DRINK BY ID DRINK
      const dataFormated = allDrinks.map(async(drink) =>{
        const drinkDetail = await fetch(`${baseURL}/lookup.php?i=${drink.idDrink}`)  
        const drinkDetailParsed = await drinkDetail.json()
        return drinkDetailParsed  
      })

      // UPDATE STATE
      Promise.all(dataFormated).then(data => { 
         const allDrinksDetail = data.map(drink=>{
           const {drinks} = drink
           return drinks[0]
         })
         setListDrinks(allDrinksDetail)
      })
    }) 

  }
  
  return (
    <DrinksContext.Provider
      value={{
        getDrinks,
        listCategories,
        listDrinks
      }}
    >
      {children}
    </DrinksContext.Provider>
  );
};

export default DrinksContextProvider
