import React from "react";
import './Login.css'
import {link} from "react-router-com"
 
function Login(){
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
                    <input type='text'/>

                    <h5>Password</h5>
                    <input type='password'/>
 
                    <button>Sign In</button>

                </form>
                <p>By continuing, you agree to Reactify's Conditions of Use and Privacy Notice.</p>
             </div>
        </div>
    )

}
export default Login