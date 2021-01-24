import React, { useEffect, useState, useContext } from 'react'; 
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge'; 
import { makeStyles } from '@material-ui/core/styles';

// Context
import { DrinksContext } from '../contexts/DrinksContext';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(() => ({ 
}));

const Types = () => {
  const { listTypes } = useContext(DrinksContext);  
  const classes = useStyles() 

  return ( 
    <>
      { listTypes.map(type => (
        <Type 
          key={type.strAlcoholic}  
          type={type} 
        /> 
      )) }
    </>
  )
}

const Type = ({type}) => { 
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(0)

  const { drinksFiltered } = useContext(DrinksContext); 

  const {      
    query, 
    setQuery
  } = useContext(DrinksContext); 

  useEffect(()=>{ 
    const total = active ? getCount() : 0
    setCount(total)
  },[drinksFiltered])

  useEffect(()=>{ 
    if(query.favorite){
      setActive(false) 
    } 
  },[query])
  
  const getCount = () => { 
    const filteredByType = drinksFiltered.filter(drink => drink.strAlcoholic === type.strAlcoholic)
    return filteredByType.length 
  }

  const handlerClick = (event) => {
    const strAlcoholic = event.target.id || event.target.innerHTML  

    const filters = (!active)
    ? [...query.types, strAlcoholic] 
    : [...query.types].filter(typeToFilter => typeToFilter !== strAlcoholic) 
    
    setActive(!active) 
    setQuery({ 
      ...query, 
      favorite: false,    
      types: filters 
    })
  }

  return ( 
    <Badge 
      max={999} 
      badgeContent={count} 
      color={ (count > 0) ? "primary" : "error" } 
      showZero={ active ? true : false }
    >
      <Button 
        variant={ active ? "contained" : "outlined" }
        color="secondary" 
        onClick={ handlerClick }
        id={ type.strAlcoholic }
      >
        { type.strAlcoholic }
      </Button>  
    </Badge>  
  )
}

export default Types;