import React, { useEffect, useState } from 'react'; 
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around'
  } 
}));

const Types = ({listTypes, listDrinks, filterDrinksByType}) => {
  const classes = useStyles()
  
  return ( 
    <div className={classes.container}> 
      { listTypes.map(type => (
        <Type 
          key={type.strAlcoholic}  
          type={type}
          listDrinks={listDrinks} 
          filterDrinksByType={filterDrinksByType}
        /> 
      )) }
    </div>
  )
}

const Type = ({type, listDrinks, filterDrinksByType}) => { 
  const [active, setActive] = useState(false)
  const [count, setCount] = useState(0)

  useEffect(()=>{ 
    const total = active ? getCount() : 0
    setCount(total)
  },[filterDrinksByType])

  const getCount = () => { 
    const filteredByType = listDrinks.filter(drink =>  drink.strAlcoholic === type.strAlcoholic)
    return filteredByType.length 
  }

  const handlerClick = (event) => {
    const strAlcoholic = event.target.id || event.target.innerHTML  
    const filter = {
      type: strAlcoholic,
      active : !active
    }
    filterDrinksByType(filter)
    setActive(!active)
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