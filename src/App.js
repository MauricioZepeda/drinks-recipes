import React from 'react'
import { Switch, Route } from 'react-router-dom' 
import './App.css'

// Views 
import DrinksView from './views/DrinksView'
import NotFoundView from './views/NotFoundView'

// Context
import DrinksContextProvider from './contexts/DrinksContext'; 

const App = () => ( 
  <DrinksContextProvider> 
    <Switch> 
      <Route exact path='/' component={ DrinksView } />   
      <Route component={ NotFoundView } />
    </Switch>  
  </DrinksContextProvider>
);

export default App;