import React, { useContext, useState, useEffect } from 'react'

// Context
import { DrinksContext } from '../../contexts/DrinksContext'

// Metrial-UI
import TextField from '@material-ui/core/TextField' 
import Grid from '@material-ui/core/Grid' 


const FilterByName = () => { 
  const {     
    query, 
    setQuery 
  } = useContext(DrinksContext)

  const [ name, setName ] = useState(query.name)

  useEffect(()=>{ 
    if(!query.favorite) {
      const debounce = setTimeout(()=> {
        setQuery({      
          ...query,
          favorite: false,
          name: name  
        })
      }, 300)  
      return () => clearTimeout(debounce)  
    }
  },[name, query.name])

  const handlerChange = (event) => {
    const nametoSearch = event.target.value
    setName(nametoSearch) 
  }

  return ( 
    <Grid container justify="center"> 
      <TextField   
        label='Filter by name'
        variant="outlined"   
        onChange={handlerChange} 
        value={name}
        style={{ width: 300 }} 
      />  
    </Grid> 
  )
}

export default FilterByName