import React from 'react'  

// Components
import FilterByName from './FilterByName'
import FilterByTypes from './FilterByTypes' 
import FavoritesButton from './FavoritesButton' 

// Material-UI
import Grid from '@material-ui/core/Grid'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar' 


const FilterBar = () => {     
  return(   
    <AppBar position="fixed" color='default'>
      <Toolbar style={{ margin: 4 }} >    

        <Grid container>
          <Grid item xs={3}>
            <FilterByName />
          </Grid>

          <Grid item xs={7}>
            <FilterByTypes /> 
          </Grid>
          
          <Grid item xs={2}>
            <FavoritesButton />  
          </Grid> 
        </Grid> 

      </Toolbar>
    </AppBar>  
  ) 
}   

export default FilterBar