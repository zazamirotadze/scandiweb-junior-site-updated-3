import React, { Component } from 'react'
import parse  from 'html-react-parser';
import {Link} from "react-router-dom"
import nodeid from 'node-id';


export default class DescriptionPage extends Component {

  


  render() {

    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorGreen = styles.getPropertyValue('--color-green');
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
    
    //
    
    const {attributes, brand,  description, gallery, id,  name, prices} = this.props.details && this.props.details
    
   
    
   const selectColorWhenInDescription=this.props.selectColorWhenInDescription
   const selectSizeWhenInDescription= this.props.selectSizeWhenInDescription
   const selectCapacityWhenInDescription= this.props.selectCapacityWhenInDescription
   const selectWithUSB3portsWhenInDescription= this.props.selectWithUSB3portsWhenInDescription
   const selectTouchIDinkeyboardWhenInDescription= this.props.selectTouchIDinkeyboardWhenInDescription
   
   
   
    

    //Description
  


    const des = parse(description)
    //
   


    //Photos
    const photosOfProducts = gallery.map(element => (<img key={nodeid()} src={element} className="secondary-Photos" alt=""></img>))
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
        key={nodeid()}
         style={{
             background: `${element.displayValue}`,
             border: element.isSelected?`2px solid ${colorGreen}`:`2px solid white`
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
      <option
      
      key={nodeid()}
        
        onClick={(event) => selectSize(element)}
        style={{
          background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
          color: element.isSelected?`${colorWhite}`:`${colorBlack}`
         }} 
      >
        {element.displayValue}
      </option>)
    //



    //capacity
    const selectCapacity =this.props.selectCapacity
    const capacityObject = ((attributes.find(element =>element.id === "Capacity")))
    const Capacity = capacityObject && capacityObject.items.map((element) => 
      <option 
      key={nodeid()}
        className='withUSB3Ports-touchIDinkeyboard-capacity'
        onClick={(event) => selectCapacity(element)}
        style={{
          background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
          color: element.isSelected?`${colorWhite}`:`${colorBlack}`
        }} 
      >
        {element.displayValue}
      </option> )
    //
    

    //With USB 3 ports
    const selectWithUSB3ports = this.props.selectWithUSB3ports;
    const withUSB3PortsObject = (attributes.find(element => element.id === "With USB 3 ports"));
    const withUSB3Ports = withUSB3PortsObject && withUSB3PortsObject.items.map((element) => (
      <label
        key={nodeid()}
        className='withUSB3Ports-touchIDinkeyboard-capacity'
        style={{
          backgroundColor: element.isSelected ? `${colorBlack}` : `${colorWhite}`,
          color: element.isSelected ? `${colorWhite}`  : `${colorBlack}` ,
        }}
      >
        <input
          type="checkbox"
          checked={element.isSelected}
          onChange={(event) => selectWithUSB3ports(element)}
          style={{ display: "none" }}
        />
        <div
        >
          {element.displayValue}
        </div>
      </label>
    ));
    //

    // touch id in keyboard

    
    
    const selectTouchIDinkeyboard =this.props.selectTouchIDinkeyboard
    const touchIdInKeyboardObject = ((attributes.find(element =>element.id === "Touch ID in keyboard")))
    const touchIdInKeyboard = touchIdInKeyboardObject && touchIdInKeyboardObject.items.map((element) =>
      <label
      key={nodeid()}
      className='withUSB3Ports-touchIDinkeyboard-capacity'
      style={{
        backgroundColor: element.isSelected ? `${colorBlack}` : `${colorWhite}`,
        color: element.isSelected ? `${colorWhite}`  : `${colorBlack}` ,
      }}
      >
      <input
        type="checkbox"
        checked={element.isSelected}
        onChange={(event) => selectTouchIDinkeyboard(element)}
        style={{ display: "none" }}
      />
      <div
      >
        {element.displayValue}
      </div>
      </label>
            
      
      )
    

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
     <div className='description'  >
        <div className='description__secondary-photo--div'>
          {photosOfProducts}
        </div> 
        <div >
          <img src={mainPhoto} alt="" className="description__mainPhoto"/>
        </div> 
        <div className='description__information-div'>
          <h2 >{brand}</h2>
          <h2 >{name}</h2>
          {renderSizes &&<div className='description__attributes-word-div'>
            SIZE: <select size="4" >{renderSizes}</select>
          </div>}
          
          {renderSwatches &&<div className='description__attributes-word-div'>
            Color:<div  className='attributes-container'>{renderSwatches}</div> 
          </div>}
          
          {withUSB3Ports &&<div className='description__attributes-word-div' >
            With USB 3 ports: <div className='attributes-container'>{withUSB3Ports}</div> 
          </div>}
          
          {Capacity && <div className='description__attributes-word-div' >
            Capacity: <select size="2" >{Capacity}</select>
          </div>}
          
          {touchIdInKeyboard &&<div className='description__attributes-word-div' >
            Touch ID in keyboard:<div className='attributes-container'>{touchIdInKeyboard}</div>
           </div>}
          
          <div className='description__attributes-word-div'>PRICE:</div>
          <div className='price-div' >{renderPrice.currency.symbol}{renderPrice.amount}</div>
          {card.inStock && <Link  to="/Cart"> 
            <button  onClick={() => 
              {addToCart(card)
              selectSizeWhenInDescription(card, id) 
              selectColorWhenInDescription(card, id)
              selectCapacityWhenInDescription(card, id)
              selectWithUSB3portsWhenInDescription(card, id)
              selectTouchIDinkeyboardWhenInDescription(card, id)
              
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

