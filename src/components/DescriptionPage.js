import React, { Component } from 'react'
import parse  from 'html-react-parser';
import {Link} from "react-router-dom"
import nodeid from 'node-id';
import RenderOptions from './reusableComponents/RenderOptions';
import RenderCheckbox from './reusableComponents/RenderCheckbox';

export default class DescriptionPage extends Component {

  


  render() {

    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorGreen = styles.getPropertyValue('--color-green');
    
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
          
          <RenderOptions
          attributes={attributes}
          selectMethod ={this.props.selectSize}
          attribute = "Size"
          classNameData = ""
          classNameDataGeneral =  'description__attributes-word-div'
          />
       
          
          {renderSwatches &&<div className='description__attributes-word-div'>
            Color:<div  className='attributes-container'>{renderSwatches}</div> 
          </div>}
          
         
          <RenderCheckbox
            attributes={attributes}
            selectMethod ={this.props.selectWithUSB3ports}
            attribute = "With USB 3 ports"
            classNameData='withUSB3Ports-touchIDinkeyboard-capacity'
            classNameDataMidGeneral = 'attributes-container'
            classNameDataGeneral =  'description__attributes-word-div'
          />
          
         
          <RenderOptions
          attributes={attributes}
          selectMethod ={this.props.selectCapacity}
          attribute = "Capacity"
          classNameData = ''
          classNameDataGeneral =  'description__attributes-word-div'
           />
          
          
             
           <RenderCheckbox
            attributes={attributes}
            selectMethod ={this.props.selectTouchIDinkeyboard}
            attribute = "Touch ID in keyboard"
            classNameData='withUSB3Ports-touchIDinkeyboard-capacity'
            classNameDataMidGeneral = 'attributes-container'
            classNameDataGeneral =  'description__attributes-word-div'
          />
          
          
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

