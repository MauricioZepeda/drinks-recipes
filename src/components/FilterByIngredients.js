import React, { useContext } from 'react'

// Components
import Counter from './commons/Counter'

// Context
import { DrinksContext } from '../contexts/DrinksContext'

// Material-UI
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import Chip from '@material-ui/core/Chip'
import Typography from '@material-ui/core/Typography' 
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  formControl: {
    paddingTop: 25,
    margin: theme.spacing(1),
    width: '100%',  
  },  
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: 15 
  },
  chip: {
    marginLeft: 20,
    marginBottom: 15,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const FilterByIngredients = () => { 
  const [ingredients, setIngredients] = React.useState([]) 
  const {        
    listIngredients, 
    query, 
    setQuery,
    getData
  } = useContext(DrinksContext);  
  const classes = useStyles()
  

  const handleChange = (event) => { 
    const ingredientsSelected = event.target.value
    setIngredients(ingredientsSelected)  
    setQuery({      
      ...query,
      favorite: false,
      ingredients: ingredientsSelected,
    })
  };

  const handlerClick = async() => {   
    setIngredients([])
    setQuery({      
      ...query, 
      ingredients: [],
    })
  }

  return (
    <Grid container justify="center">
      <Grid item xs={8}> 
        <div className={classes.container}> 
          <FormControl className={classes.formControl}>
            <InputLabel variant='filled'>   
              <Typography variant="h4" gutterBottom>
                Select ingredients 
              </Typography>
            </InputLabel>
            <Select  
              multiple
              autoWidth={true}                    
              value={ingredients}
              onChange={handleChange}  
              input={<Input id="select-multiple-chip" />}
              renderValue={ selected => (
                <ListIngredientsSelected 
                  selected={selected} 
                  setIngredients={setIngredients} 
                />
              )}          
            >
              <MenuItem value="" disabled>
                Select ingredients 
              </MenuItem>
              { listIngredients.map(ingredient => (
                <MenuItem 
                  key={ingredient.strIngredient} 
                  value={ingredient.strIngredient}
                >
                  {ingredient.strIngredient}
                </MenuItem>
              )) }
            </Select>
          </FormControl>
        </div>
      </Grid>

      <Grid item xs={2} style={{display: ingredients.length > 0 ? 'block' : 'none'}}>
        <Box mt={6} ml={10}>
          <Button 
            variant="contained"
            color="secondary" 
            onClick={ handlerClick } 
          >
            <HighlightOffIcon fontSize="large" />
              Clear Ingredients
          </Button>  
        </Box> 
      </Grid>
    </Grid>
  );
}

const ListIngredientsSelected = ({selected = [], setIngredients}) => {
  const {       
    drinksFiltered,   
    query 
  } = useContext(DrinksContext); 

  const classes = useStyles()

  const getCount = ingredientName => { 
    const filtered =  drinksFiltered.filter(drink => drink.listIngredients.includes(ingredientName))  
    return filtered.length 
  } 

  if(query.favorite){ 
    setIngredients([])
    return null
  }

  return(
    <div className={classes.chips}>
      {selected.sort().map((value) => { 
        const count = getCount(value)
        return(
          <Counter
            key={value}
            count={count}
          >
            <Chip  
              label={value} 
              className={classes.chip} 
            />
          </Counter> 
        )
      })}
    </div>
  )    
}

export default FilterByIngredients;