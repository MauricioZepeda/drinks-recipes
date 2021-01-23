import React, { useState, useEffect, createContext } from "react" 

export const DrinksContext = createContext() 
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1"
const baseIngredientImageURL = 'https://www.thecocktaildb.com/images/ingredients'

const DrinksContextProvider = ({ children }) => {
  const [allDrinks, setAllDrinks] = useState([])
  const [drinksFiltered, setDrinksFiltered] = useState([]) 

  const [listCategories, setListCategories] = useState([])
  const [listIngredients, setListIngredients] = useState([])
  const [listTypes, setListTypes] = useState([]) 

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{ 
    getData()
  },[])  
  
  const getData = () => {
    const data = [
      getAllDrinks(getIngredients), 
      getTypes(),     
    ] 
    Promise.all(data)
      .then(_ => { 
        setError('')
        setTimeout(() => {
          setLoading(false)           
        }, 2000);
      })
      .catch(_ => setError('Error to get data from server'))
  }

  const getAllDrinks = async(getIngredients) => {
    const categories = await getCategories() 
    const drinksByCategory = categories.map(async(category) => await getDrinksByCategory(category.strCategory))  

    Promise.all(drinksByCategory).then(drinks => { 
      const listDrinks = drinks.flat()   
      const drinksWithDetail = listDrinks.map(async(drink) => await getDrink(drink.idDrink)) 

      Promise.all(drinksWithDetail).then(drinks => {  
        const sortedDrinks = drinks.sort((a, b) => a.strDrink.localeCompare(b.strDrink))
        setAllDrinks(sortedDrinks) 
        getIngredients(sortedDrinks)
        return sortedDrinks
      }) 
    }) 
  }

  const getIngredients = async(listDrinks) => {
    const ingredientsByDrink = listDrinks.map(drink => getIngredientsByDrink(drink))
    const listAllIngredients = ingredientsByDrink.flat() 
    const ingredients = Array.from(new Set(listAllIngredients))
    
    const ingredientsWithImage = ingredients.map(strIngredient => (
      {
        strIngredient: strIngredient,
        image: getIngredientImage(strIngredient)
      }
    )) 

    const sortedIngredients = ingredientsWithImage.sort((a, b) => a.strIngredient.localeCompare(b.strIngredient))

    setListIngredients(sortedIngredients)
    return sortedIngredients
  }

  const getIngredientsByDrink = drink => {
    const keysIngredients = Object.keys(drink).filter(key =>{
      return key.includes('strIngredient') && drink[key] 
    })
    const ingredients = keysIngredients.map(keyName => drink[keyName].trim()) 
    return ingredients
  }

  const getTypes = async() => {
    const types = await fetch(`${baseURL}/list.php?a=list`)  
    const listTypesParsed = await types.json() 
    const { drinks: listTypes } = listTypesParsed 
    setListTypes(listTypes)
    return listTypes
  }

  const getCategories = async() => {
    const categories = await fetch(`${baseURL}/list.php?c=list`)  
    const listCategoriesParsed = await categories.json() 
    const { drinks: listCategories } = listCategoriesParsed 
    setListCategories(listCategories)
    return listCategories
  }

  const getDrinksByCategory = async(strCategory) => {  
    const drinks = await fetch(`${baseURL}/filter.php?c=${strCategory}`)  
    const listDrinksParsed = await drinks.json() 
    const { drinks: listDrinks } = listDrinksParsed  
    return listDrinks
  }

  const getDrink = async(idDrink) => { 
    const drinkDetail = await fetch(`${baseURL}/lookup.php?i=${idDrink}`)  
    const drinkDetailParsed = await drinkDetail.json() 
    const {drinks} = drinkDetailParsed
    return drinks[0]   
  }

  const getIngredientImage = strIngredient => (
    `${baseIngredientImageURL}/${strIngredient}-Medium.png`
  ) 

  return (
    <DrinksContext.Provider
      value={{  
        allDrinks,
        drinksFiltered, 
        listIngredients,
        listTypes,
        loading,
        error,
        setDrinksFiltered
      }}
    >
      {children}
    </DrinksContext.Provider>
  );
};

export default DrinksContextProvider