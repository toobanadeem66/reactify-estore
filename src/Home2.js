import React, {useContext} from 'react';
import { ProductsContext } from './ProductsContext';
import "./Home.css";
// import "./Products.css";
import { useStateValue } from "./StateProvider";

function Home() {
    const {products} = useContext(ProductsContext);
    const [{ basket }, dispatch] = useStateValue();

    const addToBasket = ({id, title, image, price, rating }) => {
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
        <div className="home">
            <div className="home__container">
                <img
                className="home__image"
                src="https://d1iv6qgcmtzm6l.cloudfront.net/categories/9DaIRx0MTqLrab71lKo1eaONLdyohU1Sw5v0L23O.png"
                alt=""
                />

                {products.length !== 0 && <h1></h1>}

                <div className='products-container'>
                    {products.length === 0 && <div>slow internet...no products to display</div>}
                    {products.map(product => (
                        <div className='product-card' key={product.ProductID}>
                            <div className="product-info-container">
                            <div className='product-img'>
                                <img 
                                src = {product.ProductImg}
                                alt="not found" 
                                />
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
                                <p>★</p>
                                ))}
                            </div>
                            <button className='addcart-btn' onClick={()=> addToBasket({id:product.ProductID, title:product.ProductName, image:product.ProductImg, price:product.ProductPrice, rating: product.ProductRating})}>ADD TO CART</button>
                            {/* <button className='addcart-btn' onClick={addToBasket}>ADD TO CART</button> */}
                            {/* <button onClick={addToBasket}>Add to Basket</button> */}
                        </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Home;
//set directory on the second line