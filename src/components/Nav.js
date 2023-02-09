import React, { Component } from 'react'
import { Link} from "react-router-dom"
import image from "../images/a-logo.png"
import image1 from "../images/empty-cart.png"
import MiniCart from './MiniCart'
import CurrencyChanger from './CurrencyChanger'
import {  gql } from "@apollo/client";
import {  graphql } from "react-apollo";



const getAllCategoryName = gql`
  query {
    categories {
    name
  }
}

`

 class Nav extends Component {
  state = {
    isMiniCartShown: false,
    allCategoryName: "",
    techCategoryName: "",
    clothesCategoryName: ""
  }

  


  componentDidUpdate(){
    if(!this.props.data.loading && this.props.data.categories[0].name !==this.state.allCategoryName
      && this.props.data.categories[2].name !==this.state.techCategoryName
      && this.props.data.categories[1].name !==this.state.clothesCategoryName  ){
      this.setState({ allCategoryName : this.props.data.categories[0].name  })
      this.setState({ clothesCategoryName : this.props.data.categories[1].name  })
      this.setState({ techCategoryName : this.props.data.categories[2].name  })
      if(JSON.parse( localStorage.getItem("categoryUrl") ) ===null){
        this.props.changeCategoryUrl(this.props.data.categories[0].name)
      }
      
    }
    
  }

  miniCartCloser = () => {
    this.setState({isMiniCartShown: false})
  }


  render() {
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorGreen = styles.getPropertyValue('--color-green');
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorTransparent = styles.getPropertyValue('--color-transparent');
    //

    const changeCategory = this.props.changeCategory
    const allCategoryShown = this.props.allCategoryShown
    const techCategoryShown = this.props.techCategoryShown
    const clothesCategoryShown = this.props.clothesCategoryShown
    

   
    return (
      <div>
      <div className='nav'>
        <div className='nav__category--div'>
            <Link  to={`./${this.state.allCategoryName}/${JSON.parse(localStorage.getItem("filterParameterUrlAll")) !==null ? JSON.parse(localStorage.getItem("filterParameterUrlAll")):""}`}> 
              <button 
              style={{borderBottom :allCategoryShown? `${colorGreen} 2px solid` : `${colorTransparent} 2px solid`,
                      color:allCategoryShown? `${colorGreen}`: `${colorBlack}`}}  
              onClick={() =>{ 
                changeCategory(0) 
                this.props.changeCategoryUrl(this.state.allCategoryName)
                
              }} 
              >
                {this.state.allCategoryName.toUpperCase()}
              </button> 
            </Link>
            <Link   to={`./${this.state.techCategoryName}/${JSON.parse(localStorage.getItem("filterParameterUrlTech")) !==null ? JSON.parse(localStorage.getItem("filterParameterUrlTech")):""}`}>
              <button 
                style={{borderBottom :techCategoryShown? `${colorGreen} 2px solid`: `${colorTransparent} 2px solid`,
                        color:techCategoryShown? `${colorGreen}`: `${colorBlack}` }} 
                onClick={() =>{
                  changeCategory(2) 
                  this.props.changeCategoryUrl(this.state.techCategoryName)
                  
                  
                }}
              > 
                {this.state.techCategoryName.toUpperCase()}
              </button> 
            </Link>
            <Link  to={`./${this.state.clothesCategoryName}/${JSON.parse(localStorage.getItem("filterParameterUrlClothes")) !==null ? JSON.parse(localStorage.getItem("filterParameterUrlClothes")):""}`}>
              <button 
                style={{borderBottom :clothesCategoryShown? `${colorGreen} 2px solid`: `${colorTransparent} 2px solid`,
                        color:clothesCategoryShown? `${colorGreen}`: `${colorBlack}` }} 
                onClick={() =>{ 
                  changeCategory(1) 
                  this.props.changeCategoryUrl(this.state.clothesCategoryName)
                 
                  
                }}
              > 
                {this.state.clothesCategoryName.toUpperCase()}
              </button> 
            </Link>
        </div>
          <div className="nav__bag--div">
            <img src={image}  alt=""  />
          </div>
        <div className='nav__currency-cart-icon--div'>
          <CurrencyChanger changeCurrency={this.props.changeCurrency} currency={this.props.currency}/>
          <div className='nav__cart-icon--div' > 
              <img src={image1} alt=""  onClick={()=> this.setState({isMiniCartShown: !this.state.isMiniCartShown})}  /> 
              {this.props.totalQuantity>0 &&<div>{this.props.totalQuantity}</div>}
          </div>  
        </div>
      </div >
          {this.state.isMiniCartShown &&
                             
                    <MiniCart 
                    miniCartCloser={this.miniCartCloser}
                    {...this.props}
                    />         
          }
      </div>
      
    )
  } 
}

export default graphql(getAllCategoryName)(Nav);
