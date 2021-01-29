import React, { useState, useEffect, useContext } from 'react'  

// Components
import Counter from '../commons/Counter'

// Context
import { DrinksContext } from '../../contexts/DrinksContext'

//Material-UI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid' 
import Box from '@material-ui/core/Box'


const FavoritesButton = () => {
  const [active, setActive] = useState(false) 
  
  const {     
    listFavorites,
    setQuery,
    query
  } = useContext(DrinksContext)

  useEffect(()=>{
    setActive(query.favorite)
  },[query]) 

  const handlerClick = async() => {  
    setActive(!active)  
    setQuery({      
      types: [], 
      ingredients: [], 
      name: '',
      favorite: !active
    })
  }

  return(
    <Grid container justify="center">
      <Box mt={1}>  
        <Counter count={listFavorites.length}>
          <Button 
            variant={ active ? "contained" : "outlined" }
            color="secondary" 
            onClick={ handlerClick } 
          >
            Favorites
          </Button> 
        </Counter> 
        </Box>
    </Grid>
  )
}

export default FavoritesButton