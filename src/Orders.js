/*import React, { useState, useEffect } from 'react';
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'
import { TheatersRounded } from '@material-ui/icons';
import OrderProducts from './OrderProducts';
import { auth, db } from "./firebase";
var OrderStatus, PaymentType, ProductImg, ProductName,ProductPrice,OrderID = ""
var ProductIDs=[]
var OrderDetails = []
var Products = []
function retrieve_orders(){
    if(auth){
    db.collection('Orders')
        .where("UserID", "==", auth.currentUser.uid)
        .get()
        .then(snapshot=>{
            OrderID = snapshot.docs[0].id
            OrderStatus = snapshot.docs[0].get('OrderStatus');
            PaymentType = snapshot.docs[0].get('PaymentType');
            ProductIDs = snapshot.docs[0].get('ProductIDs');
            var count = 0
            OrderDetails.push(OrderStatus)
            OrderDetails.push(PaymentType)
            while(ProductIDs){
                db.collection('Products').where('UserID','==',auth.currentUser.uid)
                .get().then(snapshot2=>{
                    ProductImg = snapshot2.docs[0].get('ProductImg')
                    ProductName = snapshot2.docs[0].get('ProductName')
                    ProductPrice = snapshot2.docs[0].get('ProductPrice')
                } 
                )  
                Products.push(ProductImg)
                Products.push(ProductName)
                Products.push(ProductPrice)
            }
            OrderDetails.push(Products)
            }
        )
    }
    return OrderDetails
}


function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    if(user) {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('Orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])




    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            {<div className='orders__order'>
                {orders?.map(order => ( //have to call a function here
                    <Order order={order} />
                ))}

            {basket.map(item => (
            <OrderProducts
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}   
            </div> }
            {
                
                
}
        </div>
    )
}

export default Orders
*/

import React, { useState, useEffect } from 'react';
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order'
import { TheatersRounded } from '@material-ui/icons';
import CheckoutProduct from './CheckoutProduct';
import { auth, db } from "./firebase";
import OrderProducts from './OrderProducts';
var OrderStatus, PaymentType, ProductImg, ProductName,ProductPrice = ""
var ProductIDs=[]
var OrderDetails = []
var Products = []
function retrieve_orders(){
    if(auth){
    db.collection('Orders')
        .where("UserID", "==", auth.currentUser.uid)
        .get()
        .then(snapshot=>{
            var count = 0
            OrderStatus = snapshot.docs[0].get('OrderStatus');
            PaymentType = snapshot.docs[0].get('PaymentType');
            ProductIDs = snapshot.docs[0].get('ProductIDs');
            OrderDetails.push(OrderStatus)
            OrderDetails.push(PaymentType)
            while(count!=Products.length){
                count = count+1
                db.collection('Products').where('UserID','==',auth.currentUser.uid)
                .get().then(snapshot2=>{
                    ProductImg = snapshot2.docs[0].get('ProductImg')
                    ProductName = snapshot2.docs[0].get('ProductName')
                    ProductPrice = snapshot2.docs[0].get('ProductPrice')
                } 
                )  
                Products.push(ProductImg)
                Products.push(ProductName)
                Products.push(ProductPrice)
            }
            OrderDetails.push(Products)
            }
        )
    }
    return OrderDetails
}

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    if(user) {
        db
        .collection('users')
        .doc(user?.uid)
        .collection('Orders')
        .orderBy('created', 'desc')
        .onSnapshot(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])




    return (
        <div className='orders'>
            <h1>Your Orders</h1>
                {}


            { <div className='orders__order'>
                {orders?.map(order => ( //have to call a function here
                    <Order order={order} />
                ))}

            {basket.map(item => (
            <OrderProducts
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}   
            </div> }
            {
                
                
}
        </div>
    )
}

export default Orders
