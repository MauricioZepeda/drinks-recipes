import React, { useContext } from 'react';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip'; 
import Badge from '@material-ui/core/Badge'; 
import { makeStyles } from '@material-ui/core/styles';

// Context
import { DrinksContext } from '../contexts/DrinksContext'; 

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: '100%', 
  },  
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '15px' 
  },
  chip: {
    margin: 2,
    marginLeft: '20px',
    marginBottom: '15px'  
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const Ingredients = () => { 
  const [ingredients, setIngredients] = React.useState([]) 
  const {       
    drinksFiltered,  
    listIngredients, 
    query, 
    setQuery 
  } = useContext(DrinksContext);  
  const classes = useStyles()
  
  const handleChange = (event) => { 
    const ingredientsSelected = event.target.value
    setIngredients(ingredientsSelected)  
    setQuery({      
      ...query,
      ingredients: ingredientsSelected,
    })
  };

  const getCount = ingredientName => { 
    const drinksWithIngredient = drinksFiltered.filter(drink => {
      const keysIngredients = Object.keys(drink).filter(key => key.includes('strIngredient'))
      const existIngredient =  keysIngredients.some(keyName => drink[keyName] === ingredientName)  
      return existIngredient
    })   
    return drinksWithIngredient.length 
  } 

  const getBadges = (selected) => {  
    return(
      <div className={classes.chips}>
        {selected.sort().map((value) => { 
          const count = getCount(value)
          return(
            <Badge 
              key={value} 
              max={999} 
              badgeContent={count} 
              color={ (count > 0) ? "primary" : "error"}
              showZero
            >
              <Chip  
                label={value} 
                className={classes.chip} 
              />
            </Badge>           
          )
        })}
      </div>
    )    
  }

  return (
    <div> 
      <FormControl className={classes.formControl}>
        <InputLabel> 
            Select ingredients 
        </InputLabel>
        <Select  
          multiple
          autoWidth={true}                    
          value={ingredients}
          onChange={handleChange}  
          input={<Input id="select-multiple-chip" />}
          renderValue={ selected => getBadges(selected) }
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
  );
}

export default Ingredients;