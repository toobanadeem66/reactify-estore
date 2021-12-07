
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
/*
function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([]);



  useEffect(() => {
    if(user) {
        db
        .collection('Basket').where('UserID','==',auth.currentUser.uid).get()
        .then(snapshot => (
            setOrders(snapshot.docs.map(doc => ({
                id:snapshot.docs[0].get('UserID')
                ,
                data: snapshot.docs[0].get('basket_arr')
            })))
        ))
    } else {
        setOrders([])
    }

  }, [user])

*/
var user_orders=[]
function Orders(){


db.collection('Basket')
  .where("UserID", "==", auth.currentUser.uid)
  .get()
  .then(snapshot=>{
    user_orders = snapshot.docs[0].get('basket_arr');
      console.log(user_orders)
    })
    
    return (
        <div className='orders'>
            <h1>Your Orders</h1>
            {user_orders.flatMap(item => (
            <OrderProducts
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}   
            </div> 
        
                
                


    )
            }
export default Orders
