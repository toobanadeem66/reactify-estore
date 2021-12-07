import React, { useState, useEffect } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./Reducer";
import axios from './axios';
import { auth, db } from "./firebase";
var address = ""

function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const empty = () => {
        // dispatch the item into the data layer
        dispatch({
        type: "EMPTY_BASKET",
        });
    };

    const Users = () => {
        console.log("Mounted User DB");
        db.collection('Users')
            .where("UserID", "==", auth.currentUser.uid)
            .get()
            .then(snapshot=>{
                address = snapshot.docs[0].get('UserAddress');
                //console.log(`FirstName is ${fname}.`);
                //this.fname = fname;
                }
            )
            //console.log("User: ", fname)
            return address;
        }

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)

    const handleSubmit = async (event) => {
        // do all the fancy stripe stuff...
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation

            db
              .collection('Users')
              .doc(user?.uid)
              .collection('Orders')
              .doc(paymentIntent.id)
              .set({
                  basket: basket,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })

    }

    const handleChange = event => {
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    }

//  console.log("Basket is ")
//  console.log(basket);
// console.log(basket[0].id);

    function addingtodb(basket){
        //basket itteratte store in array only ids
        var pidarray = []
        var items = 0
        while(items != basket?.length){
            pidarray.push(String(basket[items].id))
            console.log("Basket Iteration:")
            console.log(String(basket[items].id))
            items = items + 1
        }
        var paytype = "CashOnDelivery";
        db.collection('Orders').add({
                OrderStatus : "Pending",
                PaymentType : paytype,
                ProductIDs : pidarray,
                TotalPrice : Number(getBasketTotal(basket)),
                UserID : auth.currentUser.uid
            }

            
        )
        db.collection('Basket').add({
            UserID : auth.currentUser.uid,
            basket_arr : basket
            
            
        }
        )
        empty()
    }
            
            
            

    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>{auth? Users() : "Default Address"}</p>
                        <p>Karachi, Pakistan</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>
            

                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>

                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange}/>

                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"Rs. "}
                                    />
                                    {/* <button disabled={processing || disabled || succeeded}>
                                        <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                    </button> */}
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}

                                </form> 
                            {/* <div className="payment__details_cash">                            
                            <form>
                            <label className="CashOnDelivery">
                                Cash On Delivery
                            </label>
                            <input 
                            className="cashR"
                            name="Cash On Delivery"
                            type="radio"
                            />
                            </form>
                            </div> */}
                            {/* disabled={processing || disabled || succeeded} */}
                            <button  className="payment_button" onClick={e => {history.push('/orders'); addingtodb(basket)}} >
                                <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                            </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Payment
