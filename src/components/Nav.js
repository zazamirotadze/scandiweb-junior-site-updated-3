import React, { Component } from 'react'
import { Link} from "react-router-dom"
import image from "../images/a-logo.png"
import image1 from "../images/empty-cart.png"
import MiniCart from './MiniCart'
import CurrencyChanger from './CurrencyChanger'


export default class Nav extends Component {
  state = {
    isMiniCartShown: false,
  }





  miniCartCloser = () => {
    this.setState({isMiniCartShown: false})
  }
  render() {
    const changeCategory = this.props.changeCategory
    const allCategoryShown = this.props.allCategoryShown
    const techCategoryShown = this.props.techCategoryShown
    const clothesCategoryShown = this.props.clothesCategoryShown
  

    return (
      <div>
      <div className='nav-info-div'>

        <div className='category-div'>
            <Link  to="/"> 
              <button 
              className='category-btn'
              style={{borderBottom :allCategoryShown? "rgb(5, 199, 79) 2px solid": "",
                      color:allCategoryShown? "rgb(5, 199, 79)": ""}}  
              onClick={() =>changeCategory(0) } 
              >
                ALL
              </button> 
            </Link>
            <Link  to="/"> 
              <button 
                className='category-btn' 
                style={{borderBottom :techCategoryShown? "rgb(5, 199, 79) 2px solid": "",
                        color:techCategoryShown? "rgb(5, 199, 79)": "" }} 
                onClick={() =>changeCategory(2) }
              > 
                TECH
              </button> 
            </Link>
            <Link  to="/"> 
              <button 
                className='category-btn'
                style={{borderBottom :clothesCategoryShown? "rgb(5, 199, 79) 2px solid": "",
                        color:clothesCategoryShown? "rgb(5, 199, 79)": ""  }} 
                onClick={() =>changeCategory(1) }
              > 
                CLOTHES
              </button> 
            </Link>
        </div>

        <div className='div-for-bag'>
          <div className="bag-img-div">
            <img src={image}  alt=""  />
          </div>
        </div>
        <div className='currency-and-cart-icon-innav'>
          <CurrencyChanger changeCurrency={this.props.changeCurrency} currency={this.props.currency}/>
          <div className='cart-icon-div-innav' > 
            <div>
              <img src={image1} alt="" className="cart-img" onClick={()=> this.setState({isMiniCartShown: !this.state.isMiniCartShown})}  /> 
              {this.props.totalQuantity>0 &&<div className='quantity-circle'><p className='quantitynum-innav'>{this.props.totalQuantity}</p></div>}
            </div>
          </div>  
        </div>
      </div >
        <div  >
          {this.state.isMiniCartShown &&
                  <div  >
                    
                    <MiniCart 
                    miniCartCloser={this.miniCartCloser}
                    {...this.props}
                    />
                  </div>
          }
          </div>
      </div>
      
    )
  } 
}
