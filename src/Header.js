import React, { useCallback } from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth, db, storage } from "./firebase";
var fname, display = ""
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  }

  const Users = () => {
    console.log("Mounted User DB");
     db.collection('Users')
        .where("UserID", "==", auth.currentUser.uid)
        .get()
        .then(snapshot=>{
            fname =  snapshot.docs[0].get('UserFName');
            //console.log(`FirstName is ${fname}.`);
            //this.fname = fname;
            }
        )
        console.log("User: ", fname)
        return fname;
    }

  return (
    //display = user? Users() : "",
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://firebasestorage.googleapis.com/v0/b/reactify-e-store.appspot.com/o/LOGO.png?alt=media&token=dd2e05e1-4dcf-4b8e-9b2d-24636dd7ffa6"
        />
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className="header__option">
            <span className="header__optionLineOne">Hello {!user ? 'Guest' : Users() }</span>
            <span className="header__optionLineTwo">{user ? 'Sign Out' : 'Sign In'}</span>
          </div>
        </Link>

        <Link to='/orders'>
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>
        
        <Link to="/EditProfile">
        <div className="header__option">
          <span className="header__optionLineOne">Edit</span>
          <span className="header__optionLineTwo">Profile</span>
        </div>
        </Link>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
export default Header;
