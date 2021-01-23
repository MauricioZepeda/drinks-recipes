import React from 'react'
import { Switch, Route } from 'react-router-dom' 
import './App.css'

// Views 
import Drinks from './views/Drinks'
import NotFound from './views/NotFound'

// Context
import DrinksContextProvider from './contexts/DrinksContext'; 
 
const App = () => ( 
  <DrinksContextProvider> 
    <Switch> 
      <Route exact path='/' component={ Drinks } />   
      <Route component={ NotFound } />
    </Switch>  
  </DrinksContextProvider>
);

export default App;