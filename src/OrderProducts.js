import React from 'react';
import { useStateValue } from "./StateProvider";
import { auth, db } from "./firebase";



var basket = []
function OrderProducts({ id, image, title, price, rating, hideButton }) {
    db.collection('Basket')
            .where("UserID", "==", auth.currentUser.uid)
            .get()
            .then(snapshot=>{
                basket = snapshot.docs[0].get('basket_arr');
            }
            )
    //const [{ basket }, dispatch] = useStateValue();
                /*
    const removeFromBasket = () => {
        // remove the item from the basket
        dispatch({
            type: 'REMOVE_FROM_BASKET',
            id: id,
        })
    }
    */
    return (
        <div className='checkoutProduct'>
            <img className='checkoutProduct__image' src={image} />

            <div className='checkoutProduct__info'>
                <p className='checkoutProduct__title'>{title}</p>
                <p className="checkoutProduct__price">
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <p>★</p>
                    ))}
                </div>
            </div>
        </div>
    )
                    }
export default OrderProducts;
