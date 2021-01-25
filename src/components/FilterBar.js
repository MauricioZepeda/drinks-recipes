import React from 'react'  

// Components
import FilterByName from './FilterByName'
import FilterByTypes from './FilterByTypes' 
import FavoritesButton from './FavoritesButton' 

// Material-UI
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar' 

const FilterBar = () => {     
  return(   
    <AppBar position="fixed" color='default'>
      <Toolbar style={{ margin: 4 }} >        
        <FilterByName />
        <FilterByTypes /> 
        <FavoritesButton />  
      </Toolbar>
    </AppBar>  
  ) 
}   

export default FilterBar