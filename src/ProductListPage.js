import React from "react";
import {  gql } from "@apollo/client";
import {  graphql } from "react-apollo";
import Product from "./Product";
import "./ProductListPage.css"


const getAllCategory = gql`
  query {
    categories {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        amount
        currency {
          label
          symbol
        }
      }
      brand
    }
  }
}

`




class ProductListPage extends React.Component {


  
  fetchData = () => {
      

      if(this.props.data.loading){
        return ""
      }else{
        
        const category=this.props.category
        const category1 = this.props.data.categories[category].products
        
        const currency =  this.props.currency
        const productData = this.props.data.categories[category].products
        
        const renderProductData = productData.map(element=>{ 

          
         
          

          const swatch = element.attributes.filter(element => element.type === "swatch" )
          

          
          const prices = element.prices.filter(element => element.currency.symbol===currency)

          
          
          const cart =this.props.cart
        
         
          return(
            <div>
              <Product 
                trueOrFalse={cart.forEach(elementi =>  elementi.id===element.id)} 
                cart={cart}
                swatch = {swatch}
                prices = {prices}
                key ={element.id} 
                element={element} 
                setDetailProduct = {this.props.setDetailProduct}
              />
            </div>
            ) } 
          )
          return <div className="card-container" >{renderProductData}</div>
      }
    
  }


 
    
  render() {
    
    const category=this.props.category
    
    
    return (
        
        <div>
          <div className="titles-div">
            {category===0?<h1>All</h1>:category===1?<h1>CLOTHES</h1>:<h1>TECH</h1> }
          </div>

          {this.fetchData()}
          
        </div>
      
    )
  }
}



export default graphql(getAllCategory)(ProductListPage);


