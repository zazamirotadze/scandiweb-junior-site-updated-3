import React from "react";
import {  gql } from "@apollo/client";
import {  graphql } from "react-apollo";
import Product from "./Product";
import Category from "./Category";
import Filter from "./Filter";


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
    techCategoryName: "",
    toRerenderComp: false, 
    productData: JSON.parse(localStorage.getItem("productData"))? JSON.parse(localStorage.getItem("productData")) : [],
    
  }

  setNameForAllCategory = (nameAll, nameClothes, nameTeach) => {
    this.setState({allCategoryName:nameAll})
    this.setState({clothesCategoryName:nameClothes})
    this.setState({techCategoryName:nameTeach})
  }
  // to rerender component
  reRenderListPageComp = () =>{
    this.setState({toRerenderComp:!this.state.toRerenderComp})
  }
  //
  // prodcut filterer function
  productFilterer = ( productData,  selectedAttribute ) => {
    if(!selectedAttribute){
      return productData
    }else{
      return  productData.filter(object => 
        object.attributes.find(attribute => attribute.name === selectedAttribute.name)
      );
    }
  }
  //


 
  
  fetchData = () => {
      

      if(this.props.data.loading){
        return ""
      }else{
        
        const category=this.props.category
        const currency =  this.props.currency
        let productData = this.props.data.categories[category].products
      
        
        //
        // filter by attributes

        // fetch data from local storage
        const attributesNames0 = JSON.parse(localStorage.getItem("attributesNames0"))
        const attributesNames1 = JSON.parse(localStorage.getItem("attributesNames1"))
        const attributesNames2 = JSON.parse(localStorage.getItem("attributesNames2"))
        const selectedAttribute0 = attributesNames0.find(element => element.isSelected===true)
        const selectedAttribute1 = attributesNames1.find(element => element.isSelected===true)
        const selectedAttribute2 = attributesNames2.find(element => element.isSelected===true)
        //

        let filteredArray 
        // all category filtering
        if(category === 0){  filteredArray = this.productFilterer(productData, selectedAttribute0)  }
        // 
        // clothes category filtering
        else if ( category === 1 ){  filteredArray = this.productFilterer(productData, selectedAttribute1)  }
        //
        // tech category fetching
        else if ( category === 2 ){  filteredArray = this.productFilterer(productData, selectedAttribute2) }
        //
        else { filteredArray = productData  }


        //////////

        const renderProductData = filteredArray.map(element=>{ 
        const swatch = element.attributes.filter(element => element.type === "swatch" )
        const capacity = element.attributes.filter(element => element.id === "Capacity" )
        const prices = element.prices.filter(element => element.currency.symbol===currency)
        const cart =this.props.cart
        
         
          return(
            <div key ={element.id} >
              <Product 
                trueOrFalse={cart.forEach(elementi =>  elementi.id===element.id)} 
                cart={cart}
                swatch = {swatch}
                capacity = {capacity}
                prices = {prices}
                id ={element.id}
                element={element} 
                setDetailProduct = {this.props.setDetailProduct}
                {...this.props}
              />
            </div>
            ) } 
          )
          
          localStorage.setItem("renderProductData",  renderProductData   )
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
          <Filter 
          category ={category} 
          reRenderListPageComp={this.reRenderListPageComp}
          changeFilterParameterUrl={this.props.changeFilterParameterUrl}
          categoryUrl={this.props.categoryUrl}
           />
          {this.state.allCategoryName && <div className="card-container">{this.fetchData()}</div>}
        </>
      
    )
  }
}



export default graphql(getAllCategory)(ProductListPage);
