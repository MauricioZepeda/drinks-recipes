import React, { useContext } from 'react';
import TextField from '@material-ui/core/TextField';

// Context
import { DrinksContext } from '../contexts/DrinksContext';  

const Search = () => {
  const {       
    query, 
    setQuery 
  } = useContext(DrinksContext);

  const handlerChange = (event) => {
    const name = event.target.value

    setQuery({      
      ...query,
      name
    })
  }

  return ( 
    <div>
      <TextField 
        label="Filter by Name" 
        variant="outlined" 
        onChange={handlerChange}
      />
    </div> 
  );
}

export default Search;