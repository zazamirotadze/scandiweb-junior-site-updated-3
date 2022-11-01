import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./Product.css"   
import image2 from "./Common.png"
export default class Product extends Component {

  render() {
    
    const element = this.props.element
    const newElmement1 = JSON.parse(JSON.stringify(element));
    // give isSelected property to every attribute
    const findEveryaAttribute = newElmement1.attributes.map(element => element.items)
    findEveryaAttribute.forEach(element => element.filter(element => element.isSelected=false) )
   /////
    
    const prices = this.props.prices
    const amount = prices.map(element => element.amount)
    const label = prices.map(element => element.currency.symbol)
    const changeState =this.props.setDetailProduct
   
    const swatch = this.props.swatch.map(element  =>{
      
      return(
      <div className='swatch-conteiner'>
        <div style={{background: `${element.items[0].displayValue}`}} className='swatch-div'></div> 
        <div style={{background: `${element.items[1].displayValue}`}} className='swatch-div'></div> 
        <div style={{background: `${element.items[2].displayValue}`}} className='swatch-div'></div> 
        <div style={{background: `${element.items[3].displayValue}`}} className='swatch-div'></div> 
      </div>)}
    )


    // is in cart or not
    const cart=this.props.cart
    const mappedCart = cart.map(element => newElmement1.id ===element.id)
    const trueOrFalse = mappedCart.some(element=> element===true)
    //
        
       
    return (
      
        <>
          <Link to="/details"><div className={!newElmement1.inStock && "cardoverlay-inproduct"} onClick={()=>(changeState(newElmement1)) }></div></Link>
          <div className='card' id={trueOrFalse && "isincart"} >
              {!newElmement1.inStock && <div className="outofstock-word" >OUT OF STOCK</div>}
              {trueOrFalse && <img src={image2} className="is-incart-img" />}
              <Link to="/details">
                  <img className='img-in-product' src={element.gallery[0]} onClick={()=>(changeState(newElmement1)) }/> 
              </Link>
              <h3 className='brand-div-inproductlistpage'>{element.brand}</h3>
              <h3 className='name-div'>{element.name}</h3>
              <div>{swatch}</div>
              <h3 className='price-div'>{label}{amount}</h3>
          </div>
         </>
    )
  }
}
