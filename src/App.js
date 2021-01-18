import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css'

// PAGES 
import Drinks from './views/Drinks'
import NotFound from './views/NotFound'

// CONTEXTS
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