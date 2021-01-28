import React, { useState, useEffect } from 'react'; 
 
//Material-UI
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid' 
import Box from '@material-ui/core/Box'

const DrinkDetailCard = ({drink, setDrinkSelected}) => {  
  const handlerBackToHome = () => {  
    setDrinkSelected(null)
  } 

  console.log(drink)  

  return (  
    <Grid container justify='center'>
      <Grid item>
        <Box>  
          {drink.strDrink}
        </Box>
      </Grid>
      <Grid item>
        <Box>  
          <Button 
            variant="contained"
            color="primary" 
            onClick={ handlerBackToHome } 
          >
            Back to list 
          </Button>  
        </Box>
      </Grid>
    </Grid>
  )
}

export default DrinkDetailCard