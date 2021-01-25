import React, { useEffect, useState, useContext } from 'react'

// Components
import Counter from './commons/Counter'

// Context
import { DrinksContext } from '../contexts/DrinksContext'

// Material-UI
import Button from '@material-ui/core/Button' 
import Grid from '@material-ui/core/Grid'

const FilterByTypes = () => {
  const { listTypes } = useContext(DrinksContext);   

  return ( 
    <Grid container justify="center">
      { listTypes.map(type => (
        <Type 
          key={type.strAlcoholic}  
          type={type} 
        /> 
      )) }
    </Grid>
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
    <Counter
      count={count}
      showZero={ active }
    >
      <Button 
        variant={ active ? "contained" : "outlined" }
        color="secondary" 
        onClick={ handlerClick }
        id={ type.strAlcoholic }
        style={{ marginLeft: 30, marginLeft: 30 }}
      >
        { type.strAlcoholic }
      </Button> 
    </Counter> 
  )
}

export default FilterByTypes