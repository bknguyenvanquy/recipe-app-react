import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Header from './components/header/Header';
import Recipes from './components/recipes/Recipes';
import ShoppingList from './components/shopping-list/ShoppingList';

function App() {
  return (
    <Router>
      <Header></Header>
      <br/>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/recipes"/>}></Route>
        <Route path="/recipes" component={Recipes}></Route>
        <Route path="/shopping-list" render={(props) => (<ShoppingList {...props}></ShoppingList>)}></Route>
      </Switch>
    </Router>
  );
}

export default App;
