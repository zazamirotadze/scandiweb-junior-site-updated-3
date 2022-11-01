import React, { Component } from 'react'
import parse from 'html-react-parser';
import {Link} from "react-router-dom"
import "./DescriptionPage.css"



export default class DescriptionPage extends Component {
  render() {

    
    
    const {attributes, brand, category, description, gallery, id, inStock, name, prices} = this.props.details && this.props.details
    
   
    
   const selectColorWhenInDescription=this.props.selectColorWhenInDescription
   const selectSizeWhenInDescription= this.props.selectSizeWhenInDescription
   const selectCapacityWhenInDescription= this.props.selectCapacityWhenInDescription
   
   
    

    //Description
    const des = parse(description)
    //


    //Photos
    const photosOfProducts = gallery.map(element => (<img src={element} className="secondary-Photos"></img>))
    const mainPhoto = photosOfProducts[0].props.src
    //

    /////////////////////////// attributes
    //colors
     
    const selectColor =this.props.selectColor
    const swatchObject = (attributes.find(element => element.type === "swatch"))
    
    const renderSwatches = swatchObject && swatchObject.items.map(
      (element) => {
        return(
        <div className='color'
         style={{
             background: `${element.displayValue}`,
             border: element.isSelected?`2px solid rgb(5, 199, 79)`:`2px solid white`
            }} 
             onClick={(event) =>{
              selectColor(element)
              
             } }
             
        >
             
        </div>)})
    //


    //size
    const selectSize =this.props.selectSize
    const sizeObject = ((attributes.find(element =>element.id === "Size")))
    const renderSizes = sizeObject && sizeObject.items.map((element) =>
      <div 
        className='size'
        onClick={(event) => selectSize(element)}
        style={{
          background: element.isSelected?` black`:` white`,
          color: element.isSelected?`white`:` black`
         }} 
      >
        {element.displayValue}
      </div>)
    //



    //capacity
    const selectCapacity =this.props.selectCapacity
    const capacityObject = ((attributes.find(element =>element.id === "Capacity")))
    const Capacity = capacityObject && capacityObject.items.map((element) => 
      <div 
        className='capacity'
        onClick={(event) => selectCapacity(element)}
        style={{
          background: element.isSelected?` black`:` white`,
          color: element.isSelected?`white`:` black`
        }} 
      >
        {element.displayValue}
      </div> )
    //
    

    //With USB 3 ports
    const selectWithUSB3ports =this.props.selectWithUSB3ports
    const withUSB3PortsObject = ((attributes.find(element =>element.id === "With USB 3 ports")))
    const withUSB3Ports = withUSB3PortsObject && withUSB3PortsObject.items.map((element) =>
      <div
        className='withUSB3Ports'
        onClick={(event) => selectWithUSB3ports(element)}
        style={{
          background: element.isSelected?` black`:` white`,
          color: element.isSelected?`white`:` black`
        }} 
      >
        {element.displayValue}
      </div>)
    //

    // touch id in keyboard
    const selectTouchIDinkeyboard =this.props.selectTouchIDinkeyboard
    const touchIdInKeyboardObject = ((attributes.find(element =>element.id === "Touch ID in keyboard")))
    const touchIdInKeyboard = touchIdInKeyboardObject && touchIdInKeyboardObject.items.map((element) =>
      <div 
        className='touchIDinkeyboard'
        onClick={(event) => selectTouchIDinkeyboard(element)}
        style={{
          background: element.isSelected?` black`:` white`,
          color: element.isSelected?`white`:` black`
        }} 
      >
        {element.displayValue}
      </div>)
    //
    ////////////////////////////////

    //prices
    const renderPrice = prices.find(element => element.currency.symbol===this.props.currency)
    //

    // Add To cart
    
    const addToCart = this.props.addToCart
    const card = this.props.details
    //
      
    return ( 
     <div className='description-conteiner'  >
        <div className='secondary-photos-condeiner'>
          {photosOfProducts}
        </div> 
        <div >
          <img src={mainPhoto} className="mainPhoto"/>
        </div> 
        <div className='information-div'>
          <h2 className='brand-name-div'>{brand}</h2>
          <h2 className='name-div'>{name}</h2>
          {renderSizes &&<div className='size-word-div'>SIZE: <div className='size-conteiner'>{renderSizes}</div></div>}
          
          {renderSwatches &&<div className='color-word-div'>Color:<div  className='color-conteiner'>{renderSwatches}</div> </div>}
          
          {withUSB3Ports &&<div className='usb-word-div' >With USB 3 ports: <div className='withUSB3Ports-container'>{withUSB3Ports}</div> </div>}
          
          {Capacity && <div className='capacity-name-div' >Capacity: <div className='capacity-container'>{Capacity}</div></div>}
          
          {touchIdInKeyboard &&<div className='ID-name-div' >Touch ID in keyboard:<div className='touchIDinkeyboard-container'>{touchIdInKeyboard}</div> </div>}
          
          <div className='price-word-div'>PRICE:</div>
          <div className='price-div' >{renderPrice.currency.symbol}{renderPrice.amount}</div>
          {card.inStock && <Link  to="/Cart"> 
            <button  onClick={() => 
              {addToCart(card)
              selectSizeWhenInDescription(card, id) 
              selectColorWhenInDescription(card, id)
              selectCapacityWhenInDescription(card, id)
              }}  
            className="add-to-cart-btn"
            > 
              ADD TO CART
            </button> </Link>}
          <div className='des'>{des}</div>
        </div>
    </div>
    )
  }
}

