import React, { Component } from 'react'
import OutsideAlerterForPopUp from '../outsideAlerters/OutsideAlerterForPopUp'
import { Link } from 'react-router-dom'
import nodeid from 'node-id';








export default class SmallPopup extends Component {
  render() {
    
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorGreen = styles.getPropertyValue('--color-green');
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
    //
const  cardHoverClose = this.props.cardHoverClose
const {attributes,  id, } = this.props.details && this.props.details
    
   
    
const selectColorWhenInDescription=this.props.selectColorWhenInDescription
const selectSizeWhenInDescription= this.props.selectSizeWhenInDescription
const selectCapacityWhenInDescription= this.props.selectCapacityWhenInDescription
const selectWithUSB3portsWhenInDescription= this.props.selectWithUSB3portsWhenInDescription
const selectTouchIDinkeyboardWhenInDescription= this.props.selectTouchIDinkeyboardWhenInDescription





 /////////////////////////// attributes
 //colors
  
 const selectColor =this.props.selectColor
 const swatchObject = (attributes.find(element => element.type === "swatch"))
 
 const renderSwatches = swatchObject && swatchObject.items.map(
   (element) => {
     return(
     <div key={nodeid()} className='popup__color'
      style={{
        background: `${element.displayValue}`,
        border: element.isSelected?`2px solid ${colorGreen}`:`2px solid ${colorWhite}`
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
      className='popup__attributes'
      onClick={(event) => selectSize(element)}
      style={{
        background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
        color: element.isSelected?`${colorWhite}`:`${colorBlack}`
      }} 
    >
      {element.displayValue}
    </option> 
   
   )
 //



 //capacity
 const selectCapacity =this.props.selectCapacity
 const capacityObject = ((attributes.find(element =>element.id === "Capacity")))
 const Capacity = capacityObject && capacityObject.items.map((element) => 
    <option 
    key={nodeid()}
      className='popup__attributes'
      onClick={(event) => selectCapacity(element)}
      style={{
        background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
        color: element.isSelected?`${colorWhite}`:`${colorBlack}`
      }} 
    >
      {element.displayValue}
    </option> 
   
   )
 //
 

 //With USB 3 ports
 const selectWithUSB3ports =this.props.selectWithUSB3ports
 const withUSB3PortsObject = ((attributes.find(element =>element.id === "With USB 3 ports")))
 const withUSB3Ports = withUSB3PortsObject && withUSB3PortsObject.items.map((element) =>
  
    <label
    key={nodeid()}
    className='popup__attributes'
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
   
   
   )
 //

 // touch id in keyboard
 const selectTouchIDinkeyboard =this.props.selectTouchIDinkeyboard
 const touchIdInKeyboardObject = ((attributes.find(element =>element.id === "Touch ID in keyboard")))
 const touchIdInKeyboard = touchIdInKeyboardObject && touchIdInKeyboardObject.items.map((element) =>
 

    <label
    key={nodeid()}
    className='popup__attributes'
    style={{
      backgroundColor: element.isSelected ? `${colorBlack}` : `${colorWhite}`,
      color: element.isSelected ? `${colorWhite}`  : `${colorBlack}` ,
    }}
    >
    <input
      type="checkbox"
      checked={element.isSelected}
      onChange={(event) =>  selectTouchIDinkeyboard(element)}
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



 // Add To cart
 
 const addToCart = this.props.addToCart
 const card = this.props.details
 //
   
 return ( 
    <div  onMouseOut={()=>cardHoverClose()}>
        <OutsideAlerterForPopUp popUpCloser={this.props.popUpCloser}>
        <div className='popup'>
       {renderSizes &&<div className='popup__attributes--div'>SIZE: <select size="4" >{renderSizes}</select></div>}
       
       {renderSwatches &&<div className='popup__attributes--div'>Color:<div>{renderSwatches}</div> </div>}
       
       {withUSB3Ports &&<div className='popup__attributes--div' >With USB 3 ports: <div>{withUSB3Ports}</div> </div>}
       
       {Capacity && <div className='popup__attributes--div' >Capacity: <select size="2" >{Capacity}</select></div>}
       
       {touchIdInKeyboard &&<div className='popup__attributes--div' >Touch ID in keyboard:<div >{touchIdInKeyboard}</div> </div>}
       
       {card.inStock && <Link  to="/Cart"> 
         <button  onClick={() => 
           {addToCart(card)
           selectSizeWhenInDescription(card, id) 
           selectColorWhenInDescription(card, id)
           selectCapacityWhenInDescription(card, id)
           selectWithUSB3portsWhenInDescription(card, id)
           selectTouchIDinkeyboardWhenInDescription(card, id)
           
           }}  
         > 
           ADD TO CART
         </button> </Link>}
         </div>
     </OutsideAlerterForPopUp>

 </div>
 )
}
}