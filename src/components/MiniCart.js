import React, { Component } from 'react'
import { Link} from "react-router-dom"
import CardForMiniCart from './CardForMiniCart'
import OutsideAlerterForMiniCart from '../outsideAlerters/outsideAlerterForMiniCart'




export default class MiniCart extends Component {



  
   

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
          const priceObject = (item.prices.find((element => element.currency.symbol===this.props.currency)))
          //
          
          //selectColorF
          
          
          
          //
          
          /////////////////////////// attributes
          const attributes = item.attributes
         
           //colors
          
    
          const swatchObject = (attributes.find(element => element.type === "swatch"))
          
          const renderSwatches = swatchObject && swatchObject.items.map((element) => {
            
     
            return(
            <div className='minicard__color' 
              style={{
                background: `${element.displayValue}`,
                border: element.isSelected?`2px solid ${colorGreen}`:`2px solid ${colorWhite}`
              }}  
              >
              
            </div>)})
          //
    
          //size
         
          const sizeObject = attributes.find(element => element.id === "Size")
          const renderSizes = sizeObject && sizeObject.items.map((element) =>
            <div
              className='minicard__attribute'
              style={{ 
                background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
                color: element.isSelected?`${colorWhite}`:`${colorBlack}`
              }}  
              
              >
              {element.displayValue}
            </div>)
          //
          //capacity
          
          const capacityObject = ((attributes.find(element =>element.id === "Capacity")))
          const Capacity = capacityObject && capacityObject.items.map((element) =>
            <div
            className='minicard__attribute'
              style={{ 
                background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
                color: element.isSelected?`${colorWhite}`:`${colorBlack}`
              }}  
              
            >
              {element.displayValue}
            </div>)
          //
        
    
          //capacity With USB 3 ports
     
          const withUSB3PortsObject = ((attributes.find(element =>element.id === "With USB 3 ports")))
          const withUSB3Ports = withUSB3PortsObject && withUSB3PortsObject.items.map((element) =>
            <div
            className='minicard__attribute'
              style={{ 
                background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
                color: element.isSelected?`${colorWhite}`:`${colorBlack}`
              }}  
              
            >
              {element.displayValue}
            </div>)
          //
    
          // touch id in keyboard
          
          const touchIdInKeyboardObject = ((attributes.find(element =>element.id === "Touch ID in keyboard")))
          const touchIdInKeyboard = touchIdInKeyboardObject && touchIdInKeyboardObject.items.map((element) =>
            <div
            className='minicard__attribute'
              style={{ 
                background: element.isSelected?`${colorBlack}`:` ${colorWhite}`,
                color: element.isSelected?`${colorWhite}`:`${colorBlack}`
              }}  
              
            >
              {element.displayValue}
            </div>)
          //
          ////////////////////////////////
     
    
          
          return(
          <div >
            <CardForMiniCart
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
              card={item}
              count={item.count}
              id={item.id}
              increase={this.props.increase}
              reduction={this.props.reduction}
            />
          </div>)}
        )
        
        //onClick={() => this.props.miniCartCloser()}
        
        return (
          <div>
             <div className= "minicart-overlay"   ></div>
             
              <div className='minicart'>
                
                <OutsideAlerterForMiniCart miniCartCloser={this.props.miniCartCloser}>
                <span> My Bag.</span>
                <span> {this.props.totalQuantity} items</span>
                
                {cart.length===0 ? <p>Cart is empty</p>:
                  <>
                    <div className='minicart__cards'>
                   {renderCart} 
                    </div>
                      <div className='minicart__fixed-part'>
                        <div className='minicart__total'>Total: <div >{this.props.currency}{this.props.totalSum}</div> </div>  
                        <div >
                            <Link  to="/Cart"><button  onClick={() => this.props.miniCartCloser()} >VIEW BAG</button></Link>
                            <button  onClick={() => this.props.clearCart()}>CHECK OUT</button>
                        </div> 
                    </div>
                  </> }
                  
                  </OutsideAlerterForMiniCart>
                  
              </div> 
              
          </div>
        )
      }
    }

