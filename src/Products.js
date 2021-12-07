import { title } from 'min-document';
import React, {useContext} from 'react';
import { ProductsContext } from './ProductsContext';
import { useStateValue } from "./StateProvider";

// import "./Products.css";

export const Products = () => {
    const {products} = useContext(ProductsContext);
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = (id, title, image, price, rating) => {
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
    //console.log(products);



    return(
        <>
        <div className="product">
        {products.length !== 0 && <h1>Products</h1>}
        <div className='products-container'>
            {products.length === 0 && <div>slow internet...no products to display</div>}
            {products.map(product => (
                <div className='product-card' key={product.ProductID}>
                    <div className='product-img'>
                        <img src={product.ProductImg} alt="not found" />
                    </div>
                    <div className='product-name'>
                        {product.ProductName}
                    </div>
                    <div className='product-price'>
                        Rs {product.ProductPrice}.00
                    </div>
                    <div className='product-rating'>
                        {Array(product.ProductRating)
                            .fill()
                            .map((_, i) => (
                            <p>⭐</p>
                            ))}
                    </div>
                    <button className='addcart-btn' onClick={() => dispatch({ type: 'ADD_TO_CART', id: product.ProductID, product })}>ADD TO CART</button>

                </div>
        
            ))}
        </div>
        </div>
    </>
    )
}
//set directory on the second line