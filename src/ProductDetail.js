import React from 'react';
import { useStateValue } from "./StateProvider";
import { useParams } from "react-router-dom";
import {db, auth} from "./firebase";
import "./ProductDetail.css"


var prodName, prodDesc, prodImg, prodPrice = "";
var prodRat = 0;
var prod = []

function loadProduct(id){

    console.log("Mounted User DB");
    console.log(id)
    db.collection('Products').doc(id)
        .get()
        .then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                prodName = doc.data().ProductName;
                prodDesc = doc.data().ProductDesc;
                prodImg = doc.data().ProductImg;
                prodPrice = doc.data().ProductPrice;
                prodRat = Number(doc.data().ProductRating);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            
            }
        
    }) .catch(function(error) {
        console.log("Error getting document:", error);
    });

}


function ProductDetail() {
    let { id } = useParams();
    const [{basket}, dispatch] = useStateValue();

loadProduct(id);

console.log("its happening")
console.log(prodName);

const addToBasket = ({id, title, image, price, rating,description }) => {
    // dispatch the item into the data layer
    dispatch({
    type: "ADD_TO_BASKET",
    item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
    },
    });
};




    return (
        <div className="Main">
                    <div className="Title">
                    <h1> Product Description </h1>
                      </div>
                      <br/>

                    <div className="postPage">



                    <div className="ImageLeft">
                     <img 
                     src = {prodImg}
                     alt="no picture"/>
                    </div>

                    <div className="Product_Desc">
                        <div className="title">
                            <h3>{prodName}</h3>
                            <small>Rs</small>
                            <strong>{prodPrice}</strong>
                        </div>
                        <div className="rating">
                        {Array(prodRat)
                        .fill()
                        .map((_, i) => (
                        <p>★</p>
                        ))}
                        </div>
                        <div className="description">
                            <p>{prodDesc}</p>
                        </div>
                        <button className='addcart-btn' onClick={()=> addToBasket({id:id, title:prodName, image:prodImg, price:prodPrice, rating: prodRat, description: prodDesc})}>ADD TO CART</button>


                    </div>

        </div>
        </div>
    )
}

export default ProductDetail
