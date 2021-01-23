import React, { useState, useEffect, createContext } from "react" 
import Utils from '../utils'

export const DrinksContext = createContext() 
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1"
const baseIngredientImageURL = 'https://www.thecocktaildb.com/images/ingredients'

const DrinksContextProvider = ({ children }) => {
  const [allDrinks, setAllDrinks] = useState([])
  const [drinksFiltered, setDrinksFiltered] = useState([]) 
  
  const [listIngredients, setListIngredients] = useState([])
  const [listTypes, setListTypes] = useState([]) 

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{ 
    getData()
  },[])  
  
  const getData = async() => {
    const getters = [
      getTypes(),
      getAllDrinks(getIngredients)
    ]

    Promise.all(getters)
      .then( _ => {
        setError('')  
      })
      .catch( _ => setError('Error to get data from server')) 
  }

  const getAllDrinks = async(callback) => {
    const listDrinksLocalStorage = await Utils.getFromLocalStoge('listDrinks') 
    if(listDrinksLocalStorage){ 
      setAllDrinks(listDrinksLocalStorage) 
      callback(listDrinksLocalStorage)  
      
      return listDrinksLocalStorage
    }
    
    const categories = await getCategories() 
    const drinksByCategory = categories.map(async(category) => await getDrinksByCategory(category.strCategory))  

    Promise.all(drinksByCategory).then(drinks => { 
      const listDrinks = drinks.flat()   
      const drinksWithDetail = listDrinks.map(async(drink) => await getDrink(drink.idDrink)) 

      Promise.all(drinksWithDetail).then(async(drinks) => {   
        const sortedDrinks = await Utils.sortListBy(drinks, 'strDrink')
        await Utils.saveOnLocalStoge('listDrinks', sortedDrinks) 
        setAllDrinks(sortedDrinks) 
        callback(sortedDrinks) 
        
        return sortedDrinks
      }) 
    }) 
  }

  const getIngredients = async(listDrinks) => { 
    const listIngredientsLocalStorage = await Utils.getFromLocalStoge('listIngredients')
    if(listIngredientsLocalStorage){ 
      setListIngredients(listIngredientsLocalStorage)
      setLoading(false) 
      return listIngredientsLocalStorage
    }

    const ingredientsByDrink = listDrinks.map(drink => getIngredientsByDrink(drink))
    const listAllIngredients = ingredientsByDrink.flat() 
    const listIngredients = await Utils.removeDuplicates(listAllIngredients) 
    const ingredientsWithImage = listIngredients.map(strIngredient => getIngredientWithImage(strIngredient))  
    const sortedIngredients = await Utils.sortListBy(ingredientsWithImage, 'strIngredient')

    await Utils.saveOnLocalStoge('listIngredients', sortedIngredients)  
    setListIngredients(sortedIngredients)
    setLoading(false)
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
    const listTypesLocalStorage = await Utils.getFromLocalStoge('listTypes') 
    if(listTypesLocalStorage){ 
      setListTypes(listTypesLocalStorage) 
      return listTypesLocalStorage
    } 

    const types = await fetch(`${baseURL}/list.php?a=list`)  
    const listTypesParsed = await types.json() 
    const { drinks: listTypes } = listTypesParsed 
    
    await Utils.saveOnLocalStoge('listTypes', listTypes) 
    setListTypes(listTypes)
    return listTypes 
  }

  const getCategories = async() => {
    const categories = await fetch(`${baseURL}/list.php?c=list`)  
    const listCategoriesParsed = await categories.json() 
    const { drinks: listCategories } = listCategoriesParsed  
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

  const getIngredientWithImage = strIngredient => ({
    strIngredient,
    image:`${baseIngredientImageURL}/${strIngredient}-Medium.png`
  }) 

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