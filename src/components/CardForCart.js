import React, { Component } from 'react'
import RenderOptions from './reusableFunctions/RenderOptions';


export default class CardForCart extends Component {
  state={
    src: 0
  }
  increaseSrcNumber(){
    if (this.props.photosSrcs.length > this.state.src +1){
    this.setState({src: this.state.src +1})
    }
    if (this.props.photosSrcs.length === this.state.src +1){
      this.setState({src: 0})
    }
  }
  decreaseSrcNumber(){
  
    if (this.state.src > 0){
      this.setState({src: this.state.src -1})
    }

    if (this.state.src === 0){
      this.setState({src: this.props.photosSrcs.length -1})
    }
    
  }

  render() {
    
    const {brand,name ,    symbol, amount,  renderSwatches, withUSB3Ports,  touchIdInKeyboard,  count,  id} = this.props

    const increase = this.props.increase
    const reduction=this.props.reduction
    const photosSrcs = this.props.photosSrcs
    const programmedSrc = photosSrcs[this.state.src]


    
    return (
      <div className = "cart-card"  >
        <div className='attributes-div'>
          <h2>{brand}</h2>
          <h2 className='name'>{name}</h2>
          <p className='price'>{symbol}{amount}</p>
          <RenderOptions
            attributes={this.props.attributes}
            selectMethod ={this.props.removeOpitonsDefaultClickedColor}
            attribute = "Size"
            classNameData = ''
            classNameDataGeneral =  'attribute-word-div-in-cart'
          />
          {renderSwatches &&<div className='color-word-div-in-cart' >COLOR: <div className='attributes-container-forcolor'>{renderSwatches}</div></div>}
          {withUSB3Ports &&<div className='attribute-word-div-in-cart'>With USB 3 ports: <div className='attributes-container'>{withUSB3Ports}</div></div>}
          <RenderOptions
            attributes={this.props.attributes}
            selectMethod ={this.props.removeOpitonsDefaultClickedColor}
            attribute = "Capacity"
            classNameData = ''
            classNameDataGeneral =  'attribute-word-div-in-cart'
          />
          {touchIdInKeyboard &&<div  className='attribute-word-div-in-cart'>Touch ID in keyboard: <div className='attributes-container'>{touchIdInKeyboard}</div></div>}
        </div>
        <div className='imp-and-btn-and-count'>
          <div className='btn-and-sum' >
            <button onClick={() => increase(id)} className="cart-plus-minus-btn-incart" >+</button>
            <p className='count-incart'>{count}</p>
            <button onClick={() => reduction(id)}  className="cart-plus-minus-btn-incart">-</button>
          </div>
          <div>
            <div className='image-and-arrow-div'>
            <img className='cart-imgi' alt='' src={programmedSrc}/>
            {photosSrcs.length>1 && 
            <div className='arrow-icons-in-cart' >
              <div className='left-angle' onClick={() => this.decreaseSrcNumber()} >
                <i className='fas fa-angle-left' ></i>
              </div>
              <div className='right-angle' onClick={() => this.increaseSrcNumber()} >
                <i className='fas fa-angle-right' ></i>  
              </div>
            </div> }   
            </div>
           
          </div>
        </div>
      </div>
    )
  }
}
