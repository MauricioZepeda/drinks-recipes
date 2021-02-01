import Utils from "../../utils"
import Ingredient from "./Ingredient"

const DrinksIngredients = ({ listIngredients = [], listMeasures = [] }) => {

  const getIngredients = () => {   
    const merged = [listIngredients, listMeasures]  
    const mixed = merged.reduce((accumulated, actualArray) => ( 
        (accumulated.length === 0)
          ? actualArray.map(infoIngredient => {
              return { 
                ingredient: infoIngredient, 
                image: Utils.getIngredientImage(infoIngredient)?.image, 
                measure: null 
              } 
            })
          : actualArray.map((infoMeasure, index) => ({ ...accumulated[index], measure: infoMeasure }))   
    ), []) 
    return mixed
  }
    console.log(getIngredients()) 

  return ( 
    <>
      <ul>
        { getIngredients().map( (ingredient, index) => {
          return <Ingredient key={index} ingredient={ingredient} />          
        }) }
      </ul>
    </>
  );
}

export default DrinksIngredients;