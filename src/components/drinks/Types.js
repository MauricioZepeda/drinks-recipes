import React, { useEffect, useState } from 'react'; 
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge'; 
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'space-around'
  } 
}));

const Types = ({listTypes, listDrinks}) => {
  const classes = useStyles()
  
  return ( 
    <div className={classes.container}> 
      { listTypes.map(type => (
        <Type 
          key={type.strAlcoholic}  
          type={type}
          listDrinks={listDrinks} 
        /> 
      )) }
    </div>
  )
}

const Type = ({type, listDrinks}) => { 
  const [active, setActive] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(()=>{ 
    const total = active ? getCount() : 0
    setCount(total)
  })

  const getCount = () => { 
    const filteredByType = listDrinks.filter(drink => drink.strAlcoholic === type.strAlcoholic)
    return filteredByType.length 
  }

  const handlerClick = (event) => {
    const strAlcoholic = event.target.id || event.target.innerHTML  
    setActive(!active)
  }

  return ( 
    <Badge max={999} badgeContent={count} color="error">
      <Button 
        variant={active ? "contained" : "outlined"} 
        color="primary" 
        onClick={handlerClick}
        id={type.strAlcoholic}
      >
        {type.strAlcoholic}
      </Button>  
    </Badge>  
  )
}

export default Types;