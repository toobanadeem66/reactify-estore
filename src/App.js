import React, { useEffect } from "react";
import "./App.css";
import Header from "./Header";
//import Home from "./Home";
 import Home from "./Home2";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Checkout from "./Checkout";
import Login from "./Login";
import Payment from "./Payment";
import Orders from "./Orders";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { AddProducts } from "./addproducts";
import { ProductsContextProvider } from "./ProductsContext";
import Signup from "./Signup";
import Card from "./Card";
import EditProfile from "./EditProfile"
import ProductDetail from "./ProductDetail"

// import Card from "./CardIndex";

const promise = loadStripe(
  "pk_test_51HPvU9DFg5koCdLGJJbNo60QAU99BejacsvnKvT8xnCu1wFLCuQP3WBArscK3RvSQmSIB3N0Pbsc7TtbQiJ1vaOi00X9sIbazL"
);

function App() {
  const [{}, dispatch] = useStateValue();

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);

  return (

    <ProductsContextProvider>
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/admin">
            <Header />
            <AddProducts />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/card">
            <Card />
          </Route>
          <Route path="/EditProfile">
          <Header />
          <EditProfile/>
          </Route>
          <Route path="/ProductDetail/:id">
          <Header />
          <ProductDetail/>
          </Route>
          <Route path="/">
            <Header />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    </ProductsContextProvider>
 
  );
}

export default App;
