import React, { useEffect } from 'react';
import './App.css';
import Header from './Header';
import Home from "./Home";
import {BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from './Checkout';
import Login from './Login';
import {auth} from './firebase';
import { useStateValue } from "./StateProvider";


  function App() {
    const [{}, dispatch] = useStateValue();
    useEffect(()=>{
      //Use only once when app is loaded
      auth.onAuthStateChanged(authUser =>{
        console.log('The User is : ', authUser);
        if(authUser){
          //User is login
          dispatch({
            type: "SET_USER",
            user: authUser,
          });
        }
        else{
          //No user logged In
          dispatch({
            type: "SET_USER",
            user: null,
          });
        }
      })
    }, [])

    return (
      // bem
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            
            <Route path="/checkout">
              <Header />
              <Checkout/>
            </Route>
            
            <Route path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
      );
    }
    
    export default App;
