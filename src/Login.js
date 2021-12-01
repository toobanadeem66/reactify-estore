import React, { useState } from "react";
import './Login.css'
import {link} from "react-router-com"
 
function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return(
        <div className= 'login'>
             <Link '/'>
             <img
                className="login_logo"
                src= ''
             />
             <div className='login_container'>
                <h1>Sign-in</h1>
                <form>
                    <h5>Email</h5>
                    <input type='text' value={email} onChange={e => setEmail(e.target.value)}/>
                    <h5>Password</h5>
                    <input type='password' value={password} onChange={p => setEmail(p.target.value)}/>
 
                    <button>Sign In</button>

                </form>
                <p>By continuing, you agree to Reactify's Conditions of Use and Privacy Notice.</p>
                <button className='login_registerButton'>Create your Reactify account</button>            
             </div>
        </div>
    )

}
export default Login