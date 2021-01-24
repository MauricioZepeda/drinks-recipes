import React, { useState, useEffect, useContext } from 'react'
import { SyncLoader } from 'react-spinners' 
import './styles.css' 

import Badge from '@material-ui/core/Badge'; 
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// Components
import Search from '../components/Search'
import Types from '../components/Types'
import Ingredients from '../components/Ingredients'
import ListDrinks from '../components/ListDrinks'

import Grid from '@material-ui/core/Grid';

// Context
import { DrinksContext } from '../contexts/DrinksContext'

const Drinks = () => {    
  const {       
    loading,
    error 
  } = useContext(DrinksContext)
  
  if(loading) return(<SyncLoader />) 
  if(error) return(<h1>{error}</h1>) 
  
  return(  
    <div>     
      <AppBar className='navbar' position="fixed" color='default'>
        <Toolbar>          
          <Grid container justify="space-around"  style={{ padding: 20 }}>
            <Search />
            <Types /> 
            <Favorite />
          </Grid> 
        </Toolbar>
      </AppBar>
      <br /><br /><br /><br /><br />
      <Grid container justify="center">
        <Ingredients /> 
      </Grid>

      <ListDrinks />  
    </div> 
  ) 
}  


const Favorite = () => {
  const [active, setActive] = useState(false) 
  
  const {     
    listFavorites,
    setQuery,
    query,
    getFavorites, 
    setDrinksFiltered
  } = useContext(DrinksContext)

  useEffect(()=>{
    setActive(query.favorite)
  },[query]) 
  

  const handlerClick = async() => {  
    setActive(!active)  
    setQuery({      
      types: [], 
      ingredients: [], 
      name: '',
      favorite: !active
    })
  }

  return(
    <Badge 
      max={999} 
      badgeContent={listFavorites.length} 
      color={ (listFavorites.length > 0) ? "primary" : "error" } 
      showZero={ true } 
    > 
      <Button 
        variant={ active ? "contained" : "outlined" }
        color="secondary" 
        onClick={ handlerClick } 
      >
        Favorites
      </Button> 
    </Badge> 
  )
}

export default Drinks