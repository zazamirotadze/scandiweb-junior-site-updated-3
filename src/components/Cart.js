import React, { Component } from 'react'
import nodeid from 'node-id';
import CardForCart from './CardForCart'

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
      
    
      

      //capacity With USB 3 ports
    
      
    
      const withUSB3PortsObject = ((attributes.find(element =>element.id === "With USB 3 ports")))
      const withUSB3Ports = withUSB3PortsObject && withUSB3PortsObject.items.map((element) =>
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
        readOnly
        checked={element.isSelected}
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
        readOnly
        checked={element.isSelected}
        style={{ display: "none" }}
      />
      <div
      >
        {element.displayValue}
      </div>
      </label>)
      //
      ////////////////////////////////
 

      
      return(
      <div key={item.id} >
        <CardForCart
          attributes={attributes}
          removeOpitonsDefaultClickedColor = {this.removeOpitonsDefaultClickedColor}
          removeFromCart={this.props.removeFromCart}
          brand={item.brand}
          name= {item.name}
          symbol={priceObject.currency.symbol}
          amount={priceObject.amount}
          
          renderSwatches={renderSwatches}
          withUSB3Ports={withUSB3Ports}
          
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
