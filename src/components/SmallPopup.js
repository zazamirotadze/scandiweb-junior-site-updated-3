import React, { Component } from 'react'
import OutsideAlerterForPopUp from '../outsideAlerters/OutsideAlerterForPopUp'
import { Link } from 'react-router-dom'








export default class SmallPopup extends Component {
  render() {
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
     <div className='color-inpopup'
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
     className='size-inpopup'
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
     className='capacity-inpopup'
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
     className='withUSB3Ports-inpopup'
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
     className='touchIDinkeyboard-inpopup'
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



 // Add To cart
 
 const addToCart = this.props.addToCart
 const card = this.props.details
 //
   
 return ( 
    <div className='pop-up-in-pop-up' onMouseOut={()=>cardHoverClose()}>
        <OutsideAlerterForPopUp popUpCloser={this.props.popUpCloser}>
     <div className='information-div-inpopup'>
       {renderSizes &&<div className='size-word-div-inpopup'>SIZE: <div className='size-conteiner-inpopup'>{renderSizes}</div></div>}
       
       {renderSwatches &&<div className='color-word-div-inpopup'>Color:<div  className='color-conteiner-inpopup'>{renderSwatches}</div> </div>}
       
       {withUSB3Ports &&<div className='usb-word-div-inpopup' >With USB 3 ports: <div className='withUSB3Ports-container-inpopup'>{withUSB3Ports}</div> </div>}
       
       {Capacity && <div className='capacity-name-div-inpopup' >Capacity: <div className='capacity-container--inpopup'>{Capacity}</div></div>}
       
       {touchIdInKeyboard &&<div className='ID-name-div-inpopup' >Touch ID in keyboard:<div className='touchIDinkeyboard-container--inpopup'>{touchIdInKeyboard}</div> </div>}
       
       {card.inStock && <Link  to="/Cart"> 
         <button  onClick={() => 
           {addToCart(card)
           selectSizeWhenInDescription(card, id) 
           selectColorWhenInDescription(card, id)
           selectCapacityWhenInDescription(card, id)
           selectWithUSB3portsWhenInDescription(card, id)
           selectTouchIDinkeyboardWhenInDescription(card, id)
           
           }}  
         className="add-to-cart-btn-inpopup"
         > 
           ADD TO CART
         </button> </Link>}
     </div>
     </OutsideAlerterForPopUp>
 </div>
 )
}
}