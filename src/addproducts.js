import React, { useState } from 'react'
import {db, storage} from "./firebase"
import { Link, useHistory } from "react-router-dom";
import "./addproducts.css";
export const AddProducts = () => {

    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [productRating, setProductRating] = useState(0);
    const [productDesc, setProductDesc] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const types = ['image/png', 'image/jpeg']; // image types

    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError('')
        }
        else {
            setProductImg(null);
            setError('Please select a valid image type (jpg or png)');
        }
    }

    // add product
    const addProduct = (e) => {
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${productImg.name}`).put(productImg);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(progress);
        }, err => setError(err.message)
            , () => {
                storage.ref('product-images').child(productImg.name).getDownloadURL().then(url => {
                    db.collection('Products').add({
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        ProductRating: Number(productRating),
                        ProductImg: url,
                        ProductDesc: productDesc
                    }).then(() => {
                        setProductName('');
                        setProductPrice(0)
                        setProductRating(0);
                        setProductImg('');
                        setError('');
                        document.getElementById('file').value = '';
                    }).catch(err => setError(err.message))
                })
            })
            history.push('/')
    }
    const editProduct = (e) => {
        e.preventDefault();
        // Update Product
        const collection = db.collection("Products").where("ProductName", "==", productName)
        const newDocumentBody = {
            ProductPrice: Number(productPrice),
            ProductRating: Number(productRating),
            ProductDesc: productDesc
            //ProductImg: url
        }
        collection.get().then(response => {
            let batch = db.batch()
            response.docs.forEach((doc) => {
                const docRef = db.collection("Products").doc(doc.id)
                batch.update(docRef, newDocumentBody)
            })
            batch.commit().then(() => {
                console.log(`updated all documents inside ${"Card"}`)
            })
        })
        history.push('/')
    }
    //Remove Product
    const removeProduct = (e) => {
        e.preventDefault();
        var rmprd_query = db.collection('Products').where('ProductName','==',productName);
        rmprd_query.get()
            .then(
                function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                        doc.ref.delete();
                    });
                });
        history.push('/')
    }

    return (
        <div className='container'>
            <br />
            <h2>ADD PRODUCTS</h2>
            <hr />
            <div className= "addproducts_form">
            <form autoComplete="off" className='form-group' onSubmit={addProduct}>
                <label htmlFor="product-name">Product Name</label>
                <input type="text" className='form-control' required
                    onChange={(e) => setProductName(e.target.value)} value={productName} />
                <br />
                <label htmlFor="product-price">Product Price</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductPrice(e.target.value)} value={productPrice} />
                <br />
                <label htmlFor="product-rating">Product Rating</label>
                <input type="number" className='form-control' required
                    onChange={(e) => setProductRating(e.target.value)} value={productRating} />
                <br />
                <label htmlFor="product-img">Product Image</label>
                <input type="file" className='form-control' id="file" required
                    onChange={productImgHandler} />
                <br />
                <label htmlFor="product-description">Product Description</label>
                <input type="text" className='form-control' required
                     onChange={(e) => setProductDesc(e.target.value)} value={productDesc}  />
                <br />
                <button type="submit" className='btn btn-success btn-md mybtn'>ADD</button>
            </form>
            <button type="submit" className='editbutton' onClick={ editProduct } >Update</button>
            <br />
            <button type="submit" className='editbutton' onClick={ removeProduct } >Delete</button>
            </div>
            {error && <span className='error-msg'>{error}</span>}
        </div>
    )
}