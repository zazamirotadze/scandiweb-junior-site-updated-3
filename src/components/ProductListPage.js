import React from "react";
import {  gql } from "@apollo/client";
import {  graphql } from "react-apollo";
import Product from "./Product";
import Category from "./Category";

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

  setNameForAllCategory = (nameAll, nameClothes, nameTeach) => {
    this.setState({allCategoryName:nameAll})
    this.setState({clothesCategoryName:nameClothes})
    this.setState({techCategoryName:nameTeach})
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
        const capacity = element.attributes.filter(element => element.id === "Capacity" )
        const prices = element.prices.filter(element => element.currency.symbol===currency)
        const cart =this.props.cart
        
         
          return(
            <div>
              <Product 
                trueOrFalse={cart.forEach(elementi =>  elementi.id===element.id)} 
                cart={cart}
                swatch = {swatch}
                capacity = {capacity}
                prices = {prices}
                key ={element.id} 
                element={element} 
                setDetailProduct = {this.props.setDetailProduct}
                {...this.props}
              />
            </div>
            ) } 
          )
          return <>{renderProductData}</> 
      }
    
    
  }


 
    
  render() {
    
    const category=this.props.category
    
    return (
        
        <>
          <div className="titles-div">
            {category===0?<h1>{this.state.allCategoryName}</h1>:category===1?<h1>{this.state.clothesCategoryName}</h1>:<h1>{this.state.techCategoryName}</h1> }
            <Category setNameForAllCategory={this.setNameForAllCategory}/>
          </div>
          {this.state.allCategoryName && <div className="card-container">{this.fetchData()}</div>}
        </>
      
    )
  }
}



export default graphql(getAllCategory)(ProductListPage);


