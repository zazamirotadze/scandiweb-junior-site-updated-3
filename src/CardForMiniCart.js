import React, { Component } from 'react'
import "./miniCart.css"

export default class CardForMiniCart extends Component {
  render() {
    
    const {brand,name ,symbol, amount, renderSizes, renderSwatches, withUSB3Ports, Capacity, touchIdInKeyboard, src, count,  id} = this.props

    const increase = this.props.increase
    const reduction=this.props.reduction
    return (
      <div className = "minicard-card">
        <div className='attributes-inminicart'>
          <h2 className='h2-inminicart'>{brand}</h2>
          <h2 className='h2-inminicart'>{name}</h2>
          <p className="price-inminicart">{symbol}{amount}</p>
          {renderSizes &&<div className='h2-inminicart'>Size: <div className='size-container-inminicart'>{renderSizes}</div></div>}
          {renderSwatches &&<div className='h2-inminicart' >Color: <div className='color-conteiner-inminicart'>{renderSwatches}</div></div>}
          {withUSB3Ports &&<div className='h2-inminicart'>With USB 3 ports: <div className='attributes-container'>{withUSB3Ports}</div></div>}
          {Capacity && <div className='h2-inminicart'>Capacity:<div className='attributes-container'> {Capacity}</div></div>}
          {touchIdInKeyboard &&<div className='h2-inminicart' >Touch ID in keyboard: <div className='attributes-container'>{touchIdInKeyboard}</div></div>}
        </div>
        <div className='imga-btns-inminicart'>
          <div className='btn-and-sum-inminicart'>
            <button onClick={() => increase(id)} className="btns-inminicart">+</button>
            <p >{count}</p>
            <button onClick={() => reduction(id)} className="btns-inminicart">-</button>
          </div>
          <div>
            <img  className='img-in-mini-cart' src={src}/>
          </div>
        </div>
      </div>
    )
  }
}
