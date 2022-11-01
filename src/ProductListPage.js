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

  state={
    allCategoryName: "",
    clothesCategoryName: "",
    techCategoryName: ""
  }
  componentDidMount(){
    setTimeout(() => {
      if(this.props.data.loading){
        console.log("zaza")
      }else{
        this.setState({allCategoryName:this.props.data.categories[0].name})
        this.setState({clothesCategoryName:this.props.data.categories[1].name})
        this.setState({techCategoryName:this.props.data.categories[2].name})
      }
    }
    , 500)
  }
  
  fetchData = () => {
      

      if(this.props.data.loading){
        return ""
      }else{
       
        const category=this.props.category
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
            {category===0?<h1>{this.state.allCategoryName}</h1>:category===1?<h1>{this.state.clothesCategoryName}</h1>:<h1>{this.state.techCategoryName}</h1> }
          </div>
          {this.state.allCategoryName && <div>{this.fetchData()}</div>}
        </div>
      
    )
  }
}



export default graphql(getAllCategory)(ProductListPage);


