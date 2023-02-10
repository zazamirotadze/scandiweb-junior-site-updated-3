import React, { Component } from 'react'
import RenderOptions from './reusableComponents/RenderOptions'
import RenderCheckbox from './reusableComponents/RenderCheckbox';

export default class CardForMiniCart extends Component {
  render() {
    
    const {brand,name ,symbol, amount,  renderSwatches,    src, count,  id} = this.props

    const increase = this.props.increase
    const reduction=this.props.reduction
    return (
      <div className = "minicard" >
        <div className='minicard__attributes'>
          <h2>{brand}</h2>
          <h2>{name}</h2>
          <p>{symbol}{amount}</p>
          <RenderOptions
            attributes={this.props.attributes}
            selectMethod ={this.props.removeOpitonsDefaultClickedColor}
            attribute = "Size"
            classNameData = ''
            classNameDataGeneral =  ''
          />
          {renderSwatches &&<div>Color: <div>{renderSwatches}</div></div>}
          
          <RenderCheckbox
            attributes={this.props.attributes}
            selectMethod ={undefined}
            attribute = "With USB 3 ports"
            classNameData='minicard__attribute'
            classNameDataMidGeneral = ''
            classNameDataGeneral =  ''
          />
          <RenderOptions
            attributes={this.props.attributes}
            selectMethod ={this.props.removeOpitonsDefaultClickedColor}
            attribute = "Capacity"
            classNameData = ''
            classNameDataGeneral =  ''
          />
          <RenderCheckbox
            attributes={this.props.attributes}
            selectMethod ={undefined}
            attribute = "Touch ID in keyboard"
            classNameData='minicard__attribute'
            classNameDataMidGeneral = ''
            classNameDataGeneral =  ''
          />
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
