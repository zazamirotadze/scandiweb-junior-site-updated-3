import React, { Component } from 'react'
import { Link} from "react-router-dom"
import CardForMiniCart from './CardForMiniCart'
import OutsideAlerterForMiniCart from '../outsideAlerters/outsideAlerterForMiniCart'




export default class MiniCart extends Component {



  
   

    render() {
        
       
        
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
            <div className='color-inminicart' 
              style={{
                background: `${element.displayValue}`,
                border: element.isSelected?`2px solid rgb(5, 199, 79)`:`2px solid white`
              }}  
              >
              
            </div>)})
          //
    
          //size
         
          const sizeObject = attributes.find(element => element.id === "Size")
          const renderSizes = sizeObject && sizeObject.items.map((element) =>
            <div
              className='size-inminicart'
              style={{ 
                background: element.isSelected?` black`:` white`,
                color: element.isSelected?`white`:` black`
              }}  
              
              >
              {element.displayValue}
            </div>)
          //
          //capacity
          
          const capacityObject = ((attributes.find(element =>element.id === "Capacity")))
          const Capacity = capacityObject && capacityObject.items.map((element) =>
            <div
            className='size-inminicart'
              style={{ 
                background: element.isSelected?` black`:` white`,
                color: element.isSelected?`white`:` black`
              }}  
              
            >
              {element.displayValue}
            </div>)
          //
        
    
          //capacity With USB 3 ports
     
          const withUSB3PortsObject = ((attributes.find(element =>element.id === "With USB 3 ports")))
          const withUSB3Ports = withUSB3PortsObject && withUSB3PortsObject.items.map((element) =>
            <div
            className='size-inminicart'
              style={{ 
                background: element.isSelected?` black`:` white`,
                color: element.isSelected?`white`:` black`
              }}  
              
            >
              {element.displayValue}
            </div>)
          //
    
          // touch id in keyboard
          
          const touchIdInKeyboardObject = ((attributes.find(element =>element.id === "Touch ID in keyboard")))
          const touchIdInKeyboard = touchIdInKeyboardObject && touchIdInKeyboardObject.items.map((element) =>
            <div
            className='size-inminicart'
              style={{ 
                background: element.isSelected?` black`:` white`,
                color: element.isSelected?`white`:` black`
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
             
              <div className='minicart' onMouseDown={()=>console.log("yaya")} >
                
                <OutsideAlerterForMiniCart miniCartCloser={this.props.miniCartCloser}>
                <span className='mybagword-in-minicart'> My Bag.</span>
                <span> {this.props.totalQuantity} items</span>
                
                {cart.length===0 ? <div>Cart is empty</div>:
                  <div>
                    <div className='miniCart-cards'>
                   {renderCart} 
                    </div>
                      <div className='fixed-part-minicart'>
                        <div className=' total-in-minicart'>Total: <div >{this.props.currency}{this.props.totalSum}</div> </div>  
                        <div className='buttons-in-div-minicart'>
                            <Link  to="/Cart"><button className='view-bag-minicart-btn' onClick={() => this.props.miniCartCloser()} >VIEW BAG</button></Link>
                            <button className='checkout-minicart-btn' onClick={() => this.props.clearCart()}>CHECK OUT</button>
                        </div> 
                    </div>
                  </div> }
                  
                  </OutsideAlerterForMiniCart>
                  
              </div> 
              
          </div>
        )
      }
    }

