import React,{ useState, useRef, useEffect } from "react";
import "react-credit-cards/es/styles-compiled.css";
import { Link, useHistory } from "react-router-dom";
import {db, auth} from "./firebase";
import "./CardStyles.css";
import "./EditProfile.css"
var fname, lname, adr ="";
var cnum,cname,cexp,cvv = "";

function EditProfile() {
    //Fetch all Info
    console.log("Mounted User DB");
    db.collection('Users')
        .where("UserID", "==", auth.currentUser.uid)
        .get()
        .then(snapshot=>{
            fname = snapshot.docs[0].get('UserFName');
            lname = snapshot.docs[0].get('UserLName');
            adr = snapshot.docs[0].get('UserAddress');
            }
        )
    db.collection('Card')
    .where("UserID", "==", auth.currentUser.uid)
    .get()
    .then(snapshot=>{
        cnum = snapshot.docs[0].get('CardNumber');
        cname = snapshot.docs[0].get('CardHolderName');
        cexp = snapshot.docs[0].get('CardExpiry');
        cvv = snapshot.docs[0].get('CardCVV');
        }
    )
    //User Info
    const history = useHistory();
    const [firstName, setFName] = useState(fname);
    const [lastName, setLName] = useState(lname);
    const [gender, setGender] = useState(null);
    const [address, setAddress] = useState(adr);
    //Card Info
    const [number, setNumber] = useState(cnum);
    const [name, setName] = useState(cname);
    const [expiry, setExpiry] = useState(cexp);
    const [cvc, setCvc] = useState(cvv);
    //Functionalities
    const [focus, setFocus] = useState("");
    const [error, setError] = useState('');
    const register = e => {
        e.preventDefault();
        const collection = db.collection("Users")
        const newDocumentBody = {
            UserID: auth.currentUser.uid,
            UserEmail: auth.currentUser.email,
            UserFName: firstName,
            UserLName: lastName,
            UserGender: gender,
            UserAddress: address
        }
        collection.where('UserID', '==', auth.currentUser.uid).get().then(response => {
            let batch = db.batch()
            response.docs.forEach((doc) => {
                const docRef = db.collection("Users").doc(doc.id)
                batch.update(docRef, newDocumentBody)
            })
            batch.commit().then(() => {
                console.log(`updated all documents inside ${"Users"}`)
            })
        })
        save_my_card()
    }
    useEffect(() => {
        ref.current.focus();
    }, []);
    const ref = useRef(null);
    const save_my_card = e => {
    //e.preventDefault();
        if (auth) {
            // Update Card
            const collection = db.collection("Card")
            const newDocumentBody = {
                UserID: auth.currentUser.uid,
                CardHolderName: name,
                CardNumber: number,
                CardExpiry: expiry,
                CardCVV: cvc
            }
            collection.where('UserID', '==', auth.currentUser.uid).get().then(response => {
                let batch = db.batch()
                response.docs.forEach((doc) => {
                    const docRef = db.collection("Card").doc(doc.id)
                    batch.update(docRef, newDocumentBody)
                })
                batch.commit().then(() => {
                    console.log(`updated all documents inside ${"Card"}`)
                })
            })
            history.push('/')
        }

    }
    return (
        <div className = "Edit_Profile">

            <div className="EditProfile_Header">
             <h2 className="editprofile_title"> Edit Profile </h2>
             </div>
             <div className='EditProfile_class'>
            <div className='EditProfile_container'>
                <h1>Your Details</h1>
                <form >
                    <h5>First Name</h5>
                    <input type='text' value={firstName} onChange={e => setFName(e.target.value)} />

                    <h5>Last Name</h5>
                    <input type='text' value={lastName} onChange={e => setLName(e.target.value)} />

                    <h5>E-mail</h5>
                    <input type='text' value={auth.currentUser.email} readonly />

                    <h5>Gender</h5>
                    <label>Male</label>
                    <input className = "radio" type="radio" name="gender" value={gender} onChange={e => setGender("Male")}/> 
                    <label>Female</label>
                    <input className = "radio" type="radio" name="gender" value={gender} onChange={e => setGender("Female")}/>

                    <h5>Address</h5>
                    <input type='text' value={address} onChange={e => setAddress(e.target.value)} />

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

                <button onClick={register} className='login__signInButton'>Save Changes</button>      
                </form>
            </div>     
        </div>
        </div>
    )
}
export default EditProfile