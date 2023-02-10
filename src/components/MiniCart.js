import React, { Component } from 'react'
import { Link} from "react-router-dom"
import CardForMiniCart from './CardForMiniCart'
import OutsideAlerterForMiniCart from '../outsideAlerters/outsideAlerterForMiniCart'
import nodeid from 'node-id';



export default class MiniCart extends Component {

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
            key={nodeid()}
              style={{
                background: `${element.displayValue}`,
                border: element.isSelected?`2px solid ${colorGreen}`:`2px solid ${colorWhite}`
              }}  
              >
              
            </div>)})
          //
    
  
    ////////////////////////////////
     
    
          
          return(
          <div key={item.id} >
            <CardForMiniCart
              attributes={attributes}
              removeOpitonsDefaultClickedColor = {this.removeOpitonsDefaultClickedColor}
              
              removeFromCart={this.props.removeFromCart}
              brand={item.brand}
              name= {item.name}
              symbol={priceObject.currency.symbol}
              amount={priceObject.amount}
           
              renderSwatches={renderSwatches}
              
            
              
              src={item.gallery[0]}
              card={item}
              count={item.count}
              id={item.id}
              increase={this.props.increase}
              reduction={this.props.reduction}
            />
          </div>)}
        )
        
        
        
        return (
          <div>
             <div className= "minicart-overlay"   ></div>
             
              <div >
                
                <OutsideAlerterForMiniCart miniCartCloser={this.props.miniCartCloser}>
                  <div className='minicart'>
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
                  </div>
                  </OutsideAlerterForMiniCart>
                  
              </div> 
              
          </div>
        )
      }
    }

