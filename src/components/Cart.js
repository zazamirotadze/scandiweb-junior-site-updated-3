import React, { Component } from 'react'
import nodeid from 'node-id';
import CardForCart from './CardForCart'
import { checkBoxImplementation } from './reusableFunctions/functions';

export default class Cart extends Component {
    // to remove default clicked color that is created by the select and  option elements
    state = {
      clickedValue: {}
    }
  
    removeOpitonsDefaultClickedColor = (element) => {
      
      this.setState({clickedValue: element.value})
    }
    //


    render() {
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorGreen = styles.getPropertyValue('--color-green');
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
    //

    const cart = this.props.cart
 
   
      
      
    const renderCart = cart.map(item => {
      //price
      const priceObject = (item.prices.find((element => element.currency.symbol ===this.props.currency)))
      

      //
      
      //selectColorF
      
    
      
      //
      
      /////////////////////////// attributes
      const attributes = item.attributes
     
       //colors
      

      const swatchObject = (attributes.find(element => element.type === "swatch"))
      
      const renderSwatches = swatchObject && swatchObject.items.map((element) => {
        
 
        return(
        <div  className='color-incart'
        key={nodeid()}
          style={{
            background: `${element.displayValue}`,
            border: element.isSelected?`2px solid ${colorGreen}`:`2px solid ${colorWhite}`
          }}  
          >
          
        </div>)})
      //

      //size
      
      const sizeObject = attributes.find(element => element.id === "Size")
      const renderSizes = sizeObject && sizeObject.items.map((element) =>{
        
          return(
        <option
        key={nodeid()}
          onClick ={ () =>  this.removeOpitonsDefaultClickedColor(element) }
          style={{ 
            background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
            color: element.isSelected?`${colorWhite}`:`${colorBlack}`
          }}>
          {element.displayValue}
        </option>
        )})
      //
      //capacity

      const capacityObject = ((attributes.find(element =>element.id === "Capacity")))
      const Capacity = capacityObject && capacityObject.items.map((element) =>
        <option
        key={nodeid()}
          onClick ={ () =>  this.removeOpitonsDefaultClickedColor(element) }
          className='withUSB3Ports-touchIDinkeyboard-capacity'
          style={{ 
            background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
            color: element.isSelected?`${colorWhite}`:`${colorBlack}`
          }}  
          
        >
          {element.displayValue}
        </option>)
      //
    

      //capacity With USB 3 ports
    
      
    
      
      //

      // touch id in keyboard
     
     
      //
      ////////////////////////////////
      const withUSB3Ports = checkBoxImplementation( attributes,undefined, "With USB 3 ports", 'withUSB3Ports-touchIDinkeyboard-capacity');
      const touchIdInKeyboard = checkBoxImplementation( attributes, undefined, "Touch ID in keyboard", 'withUSB3Ports-touchIDinkeyboard-capacity');

      
      return(
      <div key={item.id} >
        <CardForCart
          removeFromCart={this.props.removeFromCart}
          brand={item.brand}
          name= {item.name}
          symbol={priceObject.currency.symbol}
          amount={priceObject.amount}
          renderSizes={renderSizes}
          renderSwatches={renderSwatches}
          withUSB3Ports={withUSB3Ports}
          Capacity={Capacity}
          touchIdInKeyboard={touchIdInKeyboard}
          src={item.gallery[0]}
          photosSrcs = {item.gallery}
          card={item}
          count={item.count}
          id={item.id}
          increase={this.props.increase}
          reduction={this.props.reduction}
          
        />
      </div>)}
    )
    
    
    
    return (
      <div className='thewholecart'>
        <h1 >CART</h1>
        {cart.length===0 ? <div>Cart is empty</div>:
          <div className='cards-conteiner-incart'>
            {renderCart}
            <div className='calculated-numbers-incart'>  
              <div>Tax 21%:<span style={{marginLeft: "0.4em",fontWeight: "bold"}}>{this.props.currency}{this.props.tax21}</span> </div>
              <div>Quantity:<span style={{marginLeft: "0.4em", fontWeight: "bold"}}>{this.props.totalQuantity}</span> </div>    
              <div>Total:  <span style={{marginLeft: "1.7em", fontWeight: "bold"}}>{this.props.currency} {this.props.totalSum}</span> </div>
              <button onClick={() => this.props.clearCart()} className="order-btn">ORDER</button>
            </div>
          </div>
        }
      </div>
    )
  }
}
