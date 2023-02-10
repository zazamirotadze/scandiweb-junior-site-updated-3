import React, { Component } from 'react'
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
    const cart = this.props.cart 
    const renderCart = cart.map(item => {
      //price
      const priceObject = (item.prices.find((element => element.currency.symbol ===this.props.currency)))
      /////////////////////////// attributes
      const attributes = item.attributes
     
    
      
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
