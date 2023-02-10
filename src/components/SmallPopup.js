import React, { Component } from 'react'
import OutsideAlerterForPopUp from '../outsideAlerters/OutsideAlerterForPopUp'
import { Link } from 'react-router-dom'
import RenderOptions from './reusableComponents/RenderOptions';
import RenderCheckbox from './reusableComponents/RenderCheckbox';
import RenderSwatchAttribute from './reusableComponents/RenderSwatchAttribute';


export default class SmallPopup extends Component {
  state = {
    toRerenderComp: false, 
  }
 
  render() {
const  cardHoverClose = this.props.cardHoverClose
const {attributes,  id, } = this.props.details && this.props.details
      
const selectColorWhenInDescription=this.props.selectColorWhenInDescription
const selectSizeWhenInDescription= this.props.selectSizeWhenInDescription
const selectCapacityWhenInDescription= this.props.selectCapacityWhenInDescription
const selectWithUSB3portsWhenInDescription= this.props.selectWithUSB3portsWhenInDescription
const selectTouchIDinkeyboardWhenInDescription= this.props.selectTouchIDinkeyboardWhenInDescription



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
       
       
       
       <RenderSwatchAttribute
            attributes={attributes}
            selectMethod ={this.props.selectColor}
            attribute = "swatch"
            classNameData='popup__color'
            classNameDataMidGeneral = ''
            classNameDataGeneral =  'popup__attributes--div'
        />  
       
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