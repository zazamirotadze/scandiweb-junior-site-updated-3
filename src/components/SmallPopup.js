import React, { Component } from 'react'
import OutsideAlerterForPopUp from '../outsideAlerters/OutsideAlerterForPopUp'
import { Link } from 'react-router-dom'
import nodeid from 'node-id';
import RenderOptions from './reusableComponents/RenderOptions';
import RenderCheckbox from './reusableComponents/RenderCheckbox';


export default class SmallPopup extends Component {
  state = {
    toRerenderComp: false, 
  }
 
  render() {
    
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorGreen = styles.getPropertyValue('--color-green');
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

 ////////////////////////////////



 // Add To cart
 
 const addToCart = this.props.addToCart
 const card = this.props.details
 //
   
 return ( 
    <div  onMouseOut={()=>cardHoverClose()}>
        <OutsideAlerterForPopUp popUpCloser={this.props.popUpCloser}>
        <div className='popup'>
       
        <RenderOptions
          attributes={attributes}
          selectMethod ={this.props.selectSize}
          attribute = "Size"
          classNameData = 'popup__attributes'
          classNameDataGeneral =  'popup__attributes--div'
        />
       
       
       
       {renderSwatches &&<div className='popup__attributes--div'>Color:<div>{renderSwatches}</div> </div>}
       
       <RenderCheckbox
            attributes={attributes}
            selectMethod ={this.props.selectWithUSB3ports}
            attribute = "With USB 3 ports"
            classNameData='popup__attributes'
            classNameDataMidGeneral = ''
            classNameDataGeneral =  'popup__attributes--div'
        />

       <RenderOptions
          attributes={attributes}
          selectMethod ={this.props.selectCapacity}
          attribute = "Capacity"
          classNameData = 'popup__attributes'
          classNameDataGeneral =  'popup__attributes--div'
        />
       
       <RenderCheckbox
            attributes={attributes}
            selectMethod ={this.props.selectTouchIDinkeyboard}
            attribute = "Touch ID in keyboard"
            classNameData='popup__attributes'
            classNameDataMidGeneral = ''
            classNameDataGeneral =  'popup__attributes--div'
          />
       
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