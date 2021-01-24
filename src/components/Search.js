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
      favorite: false,
      name
    })
  }

  return ( 
    <div>
      <TextField 
        label="Filter by Name" 
        variant="filled" 
        onChange={handlerChange}
        value={query.name}
      />
    </div> 
  );
}

export default Search;