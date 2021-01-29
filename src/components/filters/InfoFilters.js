import React, { useContext } from 'react';

// Context
import { DrinksContext } from '../../contexts/DrinksContext' 
import { Favorite, Message, Search } from '../../utils/Message';

// Material-UI
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const InfoFilters = () => {
  const {      
    drinksFiltered,
    query 
  } = useContext(DrinksContext);  

  const messages = () => {
    const { types, ingredients, name, favorite } = query 
    if(favorite){
      const favoriteMsg = new Favorite(drinksFiltered.length) 
      return favoriteMsg.getMessage()
    }
    
    const existsQuery = types.length > 0 || ingredients.length > 0 || name.trim() !== '' 
    if(existsQuery){
      const searchMsg = new Search(drinksFiltered.length, query) 
      return searchMsg.getMessage()
    }

    const initialMsg = new Message()
    return initialMsg.getMessage()
  }

  return ( 
    <Box my={5}>
    <Typography variant="h4">
        {messages()}  
    </Typography>
    </Box>
  )
}

export default InfoFilters; 