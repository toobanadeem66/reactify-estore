import React from 'react'

function Product() {
    return (
        <div className='product'>
            <div className="product_info">
                <p>The lean startup</p>
                <p className="product_price">
                    <small>$</small>
                    <strong>19.99</strong>

                </p>
                <div className= "product_rating">
                 <p>⭐</p> 
                 <p>⭐</p>
                 <p>⭐</p>  
                </div>
            </div>
            <img 
              src="https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._ACSY400_.jpg"
              alt=""
            />

             
            
        </div>
    )
}

export default Product
