import React, { useContext } from 'react'

// Context
import { DrinksContext } from '../contexts/DrinksContext'

// Metrial-UI
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const FilterByName = () => {
  const {       
    query, 
    setQuery 
  } = useContext(DrinksContext)

  const handlerChange = (event) => {
    const name = event.target.value

    setQuery({      
      ...query,
      favorite: false,
      name
    })
  }

  return ( 
    <Grid container justify="center"> 
      <TextField   
        label='Filter by name'
        variant="outlined"   
        onChange={handlerChange} 
        value={query.name}
        style={{ width: 300 }}
      />
    </Grid> 
  )
}

export default FilterByName