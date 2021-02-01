import React, { useState, useEffect } from 'react';
import Utils from "../../utils"

// Components
import Ingredient from "./Ingredient"

// Material-UI
import Grid from '@material-ui/core/Grid' 
import Box from '@material-ui/core/Box' 

const DrinksIngredients = ({ listIngredients = [], listMeasures = [] }) => {
  const [ listFormated, setListFormated ] = useState([]);

  useEffect(()=>{
    getIngredients()
  },[])

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
    setListFormated(mixed)
  }

  return ( 
    <>  
      { listFormated.length > 0 &&
        <Grid container justify="space-around">
          { listFormated.map((ingredient, index) => ( 
            <Box key={index} mx={5} mb={5}>
              <Ingredient ingredient={ingredient} /> 
            </Box>  
          )) } 
        </Grid> 
      } 
    </>
  );
}

export default DrinksIngredients;