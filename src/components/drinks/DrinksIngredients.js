import Utils from "../../utils"

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
        { getIngredients().map( (info, index) => {
          return <li key={index}> {info.ingredient} - {info.measure} <img src={info.image}></img> </li>
        }) }
      </ul>
    </>
  );
}

export default DrinksIngredients;