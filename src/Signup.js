import React, { useState } from 'react';
import './Login.css'
import { Link, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {db, auth} from "./firebase"
import './index.css'
import './Login.css'

function Signup() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFName] = useState('');
    const [lastName, setLName] = useState('');
    const [gender, setGender] = useState(null);
    const [address, setAddress] = useState('');
    const [error, setError] = useState('');

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                // it successfully created a new user with email and password
                if (auth) {
                    // add User
                    db.collection('Users').add({
                        UserID: auth.currentUser.uid,
                        UserEmail: email,
                        UserFName: firstName,
                        UserLName: lastName,
                        UserGender: gender,
                        UserAddress: address
                    }).catch(err => setError(err.message))
                    history.push('/card', auth)
                }
            })
            .catch(error => alert(error.message))
        
    }

    return (
        <div className='login'>
            <Link to='/'>
                <img
                    className="login__logo"
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' 
                />
            </Link>

            <div className='login__container'>
                <h1>Sign-Up</h1>

                <form >
                    <h5>FirstName</h5>
                    <input type='text' value={firstName} onChange={e => setFName(e.target.value)} />
                    
                    <h5>LastName</h5>
                    <input type='text' value={lastName} onChange={e => setLName(e.target.value)} />
                    
                    <h5>E-mail</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    
                    <h5>Gender</h5>
                    <input type="radio" name="gender" value={gender} onChange={e => setGender("Male")}/>Male | 
                    <input type="radio" name="gender" value={gender} onChange={e => setGender("Female")}/>Female

                    <h5>Address</h5>
                    <input type='text' value={address} onChange={e => setAddress(e.target.value)} />
                    
                </form>

                <p>
                    By signing-in you agree to the Reactify E-store's Conditions of Use & Sale. Please
                    see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
                </p>

                <button onClick={register} className='login__signInButton'>Create your Amazon Account</button>
            </div>
        </div>
    )
}

export default Signup
