import React, { useContext } from 'react' 

// Context
import { DrinksContext } from '../contexts/DrinksContext'

//Material-UI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid' 
import Box from '@material-ui/core/Box'


const ClearFiltersButton = () => { 
  const { 
    setQuery 
  } = useContext(DrinksContext)
  
  const handlerClick = async() => {   
    setQuery({      
      types: [], 
      ingredients: [], 
      name: "",
      favorite: false
    })
  }

  return(
    <Grid container justify="center">
      <Box>   
        <Button 
          variant="contained"
          color="secondary" 
          onClick={ handlerClick } 
        >
          Clear Ingredients
        </Button>  
      </Box>
    </Grid>
  )
}

export default ClearFiltersButton