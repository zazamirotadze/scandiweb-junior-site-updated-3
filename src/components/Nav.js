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
            <Link  to="/"> 
              <button 
              style={{borderBottom :allCategoryShown? `${colorGreen} 2px solid` : `${colorTransparent} 2px solid`,
                      color:allCategoryShown? `${colorGreen}`: `${colorBlack}`}}  
              onClick={() =>changeCategory(0) } 
              >
                ALL
              </button> 
            </Link>
            <Link  to="/"> 
              <button 
                style={{borderBottom :techCategoryShown? `${colorGreen} 2px solid`: `${colorTransparent} 2px solid`,
                        color:techCategoryShown? `${colorGreen}`: `${colorBlack}` }} 
                onClick={() =>changeCategory(2) }
              > 
                TECH
              </button> 
            </Link>
            <Link  to="/"> 
              <button 
                style={{borderBottom :clothesCategoryShown? `${colorGreen} 2px solid`: `${colorTransparent} 2px solid`,
                        color:clothesCategoryShown? `${colorGreen}`: `${colorBlack}` }} 
                onClick={() =>changeCategory(1) }
              > 
                CLOTHES
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
