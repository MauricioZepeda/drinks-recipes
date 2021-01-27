import React from 'react'
import { Switch, Route } from 'react-router-dom' 
import './App.css'

// Views 
import DrinksView from './views/DrinksView'
import NotFoundView from './views/NotFoundView'

// Context
import DrinksContextProvider from './contexts/DrinksContext'; 

const App = () => ( 
  <Switch> 
      <DrinksContextProvider> 
      <Route exact path='/' component={ DrinksView } />   
  </DrinksContextProvider>
      <Route component={ NotFoundView } />
    </Switch>  
);

export default App;