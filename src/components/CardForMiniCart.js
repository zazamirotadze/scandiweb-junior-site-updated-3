import React, { Component } from 'react'


export default class CardForMiniCart extends Component {
  render() {
    
    const {brand,name ,symbol, amount, renderSizes, renderSwatches, withUSB3Ports, Capacity, touchIdInKeyboard, src, count,  id} = this.props

    const increase = this.props.increase
    const reduction=this.props.reduction
    return (
      <div className = "minicard" >
        <div className='minicard__attributes'>
          <h2>{brand}</h2>
          <h2>{name}</h2>
          <p>{symbol}{amount}</p>
          {renderSizes &&<div>Size: <select size="4" >{renderSizes}</select></div>}
          {renderSwatches &&<div>Color: <div>{renderSwatches}</div></div>}
          {withUSB3Ports &&<div>With USB 3 ports: <div >{withUSB3Ports}</div></div>}
          {Capacity && <div>Capacity:<select size="2"> {Capacity}</select></div>}
          {touchIdInKeyboard &&<div>Touch ID in keyboard: <div >{touchIdInKeyboard}</div></div>}
        </div>
        <div className='minicard__btn-img--div'>
          <div>
            <button onClick={() => increase(id)} >+</button>
            <p >{count}</p>
            <button onClick={() => reduction(id)} >-</button>
          </div>
          <div>
            <img alt=''  src={src}/>
          </div>
        </div>
      </div>
    )
  }
}
