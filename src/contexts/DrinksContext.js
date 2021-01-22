import React, { useState, useEffect, createContext } from "react" 

export const DrinksContext = createContext() 
const baseURL = "https://www.thecocktaildb.com/api/json/v1/1"
const baseIngredientImageURL = 'https://www.thecocktaildb.com/images/ingredients'
const ingreditenImageSize = 'Medium'

const DrinksContextProvider = ({ children }) => {
  const [listDrinks, setListDrinks] = useState([])
  const [listDrinksFiltered, setListDrinksFiltered] = useState([])
  
  const [listGlases, setListGlases] = useState([])
  
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
      getAllDrinks(), 
      getGlases(),
      getTypes(),
      getIngredients(),
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

  const getGlases = async() => {
    const glases = await fetch(`${baseURL}/list.php?g=list`)  
    const listGlasesParsed = await glases.json() 
    const { drinks: listGlases } = listGlasesParsed 
    setListGlases(listGlases)
    return listGlases
  }

  const getIngredients = async() => {
    const ingredients = await fetch(`${baseURL}/list.php?i=list`)  
    const listIngredientsParsed = await ingredients.json() 
    const { drinks: listIngredients } = listIngredientsParsed 
    
    const listDetailed = await listIngredients.map(async(ingredient) => await getIngredient(ingredient))

    Promise.all(listDetailed).then(list => {  
      setListIngredients(list) 
      return list
    }) 
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

  const getIngredient = async({strIngredient1}) => { 
    const detail = await fetch(`${baseURL}/search.php?i=${strIngredient1}`)
    const detailParsed = await detail.json()  
    const { ingredients: detailIngredient } = detailParsed
    const image = getIngredientImage(strIngredient1)
    return {...detailIngredient[0], image} 
  } 

  const getAllDrinks = async() => {
    const categories = await getCategories() 
    const drinksByCategory = categories.map(async(category) => await getDrinksByCategory(category.strCategory))  

    Promise.all(drinksByCategory).then(drinks => { 
      const listDrinks = drinks.flat()   
      const drinksWithDetail = listDrinks.map(async(drink) => await getDrink(drink.idDrink)) 

      Promise.all(drinksWithDetail).then(drinks => {  
        setListDrinks(drinks) 
        return drinks
      }) 
    }) 
  }

  const getIngredientImage = strIngredient => (
    `${baseIngredientImageURL}/${strIngredient}-${ingreditenImageSize}.png`
  )

  return (
    <DrinksContext.Provider
      value={{ 
        listCategories,
        listDrinks,
        listDrinksFiltered,
        listGlases,
        listIngredients,
        listTypes,
        loading,
        error,
        setListDrinksFiltered
      }}
    >
      {children}
    </DrinksContext.Provider>
  );
};

export default DrinksContextProvider