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
      <Route exact path='/'>
        <DrinksContextProvider> 
          <DrinksView />
        </DrinksContextProvider>
      </Route> 
      <Route component={ NotFoundView } /> 
    </Switch>  
);

export default App;