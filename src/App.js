import logo from './logo.svg';
import { useEffect, useState } from 'react'
import './App.css';
import Header from './Header'
import Home from './Home'
import Cart from './Cart'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    // bem
    <Router>
      <div className="App">
        <Header 
          cartItems={cartItems} />
        <Switch>
          <Route path="/cart">
            <Cart cartItems={cartItems} />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
