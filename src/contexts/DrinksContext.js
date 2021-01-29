import React, { useState, useEffect, createContext } from "react" 
import Utils from '../utils'

export const DrinksContext = createContext()

const baseURL = "https://www.thecocktaildb.com/api/json/v1/1" 

const DrinksContextProvider = ({ children }) => {
  const [ allDrinks, setAllDrinks ] = useState([])
  const [ drinksFiltered, setDrinksFiltered ] = useState([]) 
  const [ query, setQuery ] = useState({ types: [], ingredients: [], name: '', favorite: false })

  const [ listIngredients, setListIngredients ] = useState([])
  const [ listTypes, setListTypes ] = useState([]) 

  const [ listFavorites, setListFavorites ] = useState([]) 

  const [ drinkSelected , setDrinkSelected ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState('')

  useEffect(() => getData(), [])  
  useEffect(() => filterDrinks(), [query, listFavorites])  

  const getData = async() => (
    Promise
      .all([ getTypes(), getFavorites(), getAllDrinks(getIngredients) ])
      .then( _ => setError(''))
      .catch( _ => setError('Error to get data from server'))      
  )

  const getDrinkSelectedDetail = idDrink => { 
      const drink = allDrinks.find(drink => drink.idDrink === idDrink)  
      setDrinkSelected(drink)
      return drink
    }

  const getFavorites = async() => {
    const favorites = await Utils.getFromLocalStorage('listFavorites')
    if(favorites){
      setListFavorites(favorites)  
      return favorites
    }  

    setListFavorites([])
    return []
  }

  const filterDrinks = async() => { 
    setDrinkSelected(null)

    if(!existQuery() && !query.favorite){
      setDrinksFiltered([]) 
      return []
    }  
  
    const filteredResult = await getDrinksFilteredByQuery() 
    setDrinksFiltered(filteredResult)

    return filteredResult
  }

  const existQuery = () => {
    const { types, ingredients, name } = query   
    return (types.length > 0 || 
            ingredients.length > 0 ||
            name.length > 0) 
  }

  const getDrinksFilteredByQuery = async() => { 
    const drinksFilteredByType = query.favorite ? listFavorites : getDrinksFilteredByType() 
    const drinksFilteredByIngredients = getDrinksFilteredByIngredients(drinksFilteredByType) 
    const drinksfilteredByName = getDrinksfilteredByName(drinksFilteredByIngredients) 
    const finalListResult = await Utils.removeDuplicates(drinksfilteredByName)

    return finalListResult
  }

  const getDrinksFilteredByType = () => (
    (query.types.length > 0)
        ? allDrinks.filter(drink => query.types.some(type => type === drink.strAlcoholic))
        : allDrinks
  )

  const getDrinksFilteredByIngredients = (listDrinks) => (
    (query.ingredients.length > 0)
    ? listDrinks.filter(drink => query.ingredients.some(ingredientQuery=> ( 
        drink.listIngredients.includes(ingredientQuery)
      )
    )) 
    : listDrinks
  )

  const getDrinksfilteredByName = (listDrinks) => (
    (query.name.length >0) 
      ? (listDrinks.filter(drink => { 
          const drinkName = drink.strDrink.toUpperCase() 
          return drinkName.includes(query.name.toUpperCase().trim())
        }))
      : listDrinks
  )

  const getTypes = async() => {
    const listTypesLocalStorage = await Utils.getFromLocalStorage('listTypes')

    if(listTypesLocalStorage){
      setListTypes(listTypesLocalStorage) 
      return listTypesLocalStorage
    }  
    return await getTypesFromServer()
  }

  const getTypesFromServer = async() => {
    const types = await fetch(`${baseURL}/list.php?a=list`)  
    const listTypesParsed = await types.json() 
    const { drinks: listTypes } = listTypesParsed  

    await Utils.saveOnLocalStorage('listTypes', listTypes) 
    setListTypes(listTypes)
    return listTypes
  }

  const getAllDrinks = async(callback) => {
    const listDrinksLocalStorage = await Utils.getFromLocalStorage('listDrinks') 

    if(listDrinksLocalStorage){ 
      setAllDrinks(listDrinksLocalStorage) 
      callback(listDrinksLocalStorage)   
      return listDrinksLocalStorage
    }
    
    return await getAllDrinksFromServer(callback) 
  }

  const getAllDrinksFromServer = async(callback) => {
    const categories = await getCategories() 
    const drinksByCategories = await getDrinksByCategories(categories)

    Promise.all(drinksByCategories).then(async(drinks) => { 
      const listDrinks = drinks.flat()   
      const listDrinksWithDetails = await getDetailsOfDrinks(listDrinks)

      Promise.all(listDrinksWithDetails).then(async(drinks) => {   
        const sortedDrinks = await Utils.sortListBy(drinks, 'strDrink')

        await Utils.saveOnLocalStorage('listDrinks', sortedDrinks) 
        setAllDrinks(sortedDrinks) 
        callback(sortedDrinks) 
        return sortedDrinks
      }) 
    }) 
  }

  const getDrinksByCategories = async(categories) => (
    categories.map(async(category) => await getDrinksByCategory(category.strCategory))  
  )

  const getDetailsOfDrinks = async(listDrinks) => (
    listDrinks.map(async(drink) => await getDrink(drink.idDrink)) 
  )

  const getIngredients = async(listDrinks) => { 
    const listIngredientsLocalStorage = await Utils.getFromLocalStorage('listIngredients')

    if(listIngredientsLocalStorage){
      setListIngredients(listIngredientsLocalStorage)
      setLoading(false) 
      return listIngredientsLocalStorage
    }

    return await getIngredientsFromListDrinks(listDrinks) 
  }  

  const getIngredientsFromListDrinks = async(listDrinks) => {
    const ingredientsByDrink = listDrinks.map(drink => drink.listIngredients ) 
    const listAllIngredients = ingredientsByDrink.flat() 
    const listIngredients = await Utils.removeDuplicates(listAllIngredients) 
    const ingredientsWithImage = listIngredients.map(strIngredient => Utils.getIngredientImage(strIngredient))  
    const sortedIngredients = await Utils.sortListBy(ingredientsWithImage, 'strIngredient')

    await Utils.saveOnLocalStorage('listIngredients', sortedIngredients)  
    setListIngredients(sortedIngredients)
    setLoading(false)
    return sortedIngredients
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
    const drink = drinks[0]
    const listIngredients = Utils.getDrinkInfoByKeyName(drink, 'strIngredient')
    const listMeasures = Utils.getDrinkInfoByKeyName(drink, 'strMeasure')

    const finalDrink = {
      ...drink,
      listIngredients: listIngredients.sort(),
      listMeasures: listMeasures.sort()
    }
    return finalDrink 
  }
 
  return (
    <DrinksContext.Provider
      value={{  
        allDrinks,
        drinksFiltered, 
        drinkSelected,
        listIngredients,
        listTypes,
        listFavorites,
        loading,
        error,
        query,  
        getData,    
        getFavorites,
        setDrinksFiltered,
        setDrinkSelected,
        getDrinkSelectedDetail,
        setListFavorites,
        setQuery, 
      }}
    >
      {children}
    </DrinksContext.Provider>
  )
}

export default DrinksContextProvider