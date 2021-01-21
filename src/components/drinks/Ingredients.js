import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';

import Badge from '@material-ui/core/Badge'; 

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


const Ingredients = ({listIngredients, listDrinks}) => {
  const classes = useStyles()
  const [ingredients, setIngredients] = React.useState([]) 

  const handleChange = (event) => {
    setIngredients(event.target.value)
  };

  const getCount = ingredientName => { 
    const drinksWithIngredient = listDrinks.filter(drink => {
      const keysIngredients = Object.keys(drink).filter(key => key.includes('strIngredient'))
      const existIngredient =  keysIngredients.some(keyName => drink[keyName] === ingredientName) 
      
      return existIngredient
    })   
    return drinksWithIngredient.length 
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
          renderValue={(selected) => (
            <div className={classes.chips}>
              {selected.map((value) => ( 
                <Badge 
                  key={value} 
                  max={999} 
                  badgeContent={getCount(value)} 
                  color="error"
                >
                  <Chip  
                    label={value} 
                    className={classes.chip} 
                  />
                </Badge> 
              ))}
            </div>
          )}
        >
          <MenuItem value="" disabled>
            Select ingredients 
          </MenuItem>
          { listIngredients.map(ingredient => (
            <MenuItem 
              key={ingredient.idIngredient} 
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