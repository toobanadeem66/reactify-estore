import { append } from 'min-document';
import React,  {createContext} from 'react';
import {db} from './firebase';
export const ProductsContext = createContext();
export class ProductsContextProvider extends React.Component{

    state={
        products:[]
}

componentDidMount(){
    const prevProducts = this.state.products;
    db.collection('Products').onSnapshot(snapshot=>{
        let changes = snapshot.docChanges();
        changes.forEach(change => {
            if(change.type ==='added'){
                prevProducts.push({
                    ProductID: change.doc.id,
                    ProductName: change.doc.data().ProductName,
                    ProductPrice: change.doc.data().ProductPrice,
		            ProductRating: change.doc.data().ProductRating,
                    PriductName: change.doc.data().ProductImg,

                })
            }
            this.setState({
                products: prevProducts
            })
            
        })
    })
}
render(){
    return(
        <ProductsContext.Provider value = {{products:[...this.state.products]}}>
            {this.props.children}
        </ProductsContext.Provider>
    )
}

}

//add <ProductsContextProvider> tag in the return of app.js
//https://www.youtube.com/watch?v=NctFJGxBCfE&ab_channel=jsSolutions
//timestamp 6:06