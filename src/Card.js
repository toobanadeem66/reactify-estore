import React,{ useState, useRef, useEffect } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { Link, useHistory } from "react-router-dom";
import {db, auth} from "./firebase";
import "./CardStyles.css";

function Card() {
    const history = useHistory();
    const [number, setNumber] = useState("");
    const [name, setName] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");
    const [focus, setFocus] = useState("");
    const [error, setError] = useState('');

    useEffect(() => {
        ref.current.focus();
    }, []);

    const ref = useRef(null);
    const save_my_card = e => {
    e.preventDefault();
        if (auth) {
            // add Card
            db.collection('Card').add({
                UserID: auth.currentUser.uid,
                CardHolderName: name,
                CardNumber: number,
                CardExpiry: expiry,
                CardCVV: cvc,
            }).catch(err => setError(err.message))
            history.push('/')
        }
    
    }
    return (
        <div className="card">
        <form>
            <input
            type="tel"
            name="number"
            placeholder="Card Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            ref={ref}
            />
            <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            />
            <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            />
            <input
            type="tel"
            name="cvc"
            placeholder="CVC"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            onFocus={(e) => setFocus(e.target.name)}
            />
        </form>
        <button onClick={save_my_card} className='login__signInButton'>Save My Card</button>
        </div>
    );
}

export default Card
