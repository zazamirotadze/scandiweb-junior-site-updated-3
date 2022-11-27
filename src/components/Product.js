import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import image2 from "../images/Common.png"
import SmallPopup from './SmallPopup'


export default class Product extends Component {

  state={
    isHoveredAnImage: false,
    isCardHoverd: false,
    isPopUpShown: false
  }

  popUpCloser = () =>{
    this.setState({isPopUpShown: false})
  }
  cardHoverClose = () =>{
    this.setState({isCardHoverd: false})
  }
  render() {
    // add to cart when an Item has no attribute
    const addToCart = this.props.addToCart
    
    //

    const element = this.props.element
    const newElmement1 = JSON.parse(JSON.stringify(element));
    // give isSelected property to every attribute
    const findEveryaAttribute = newElmement1.attributes.map(element => element.items)
    findEveryaAttribute.forEach(element => element.filter(element => element.isSelected=false) )
   /////
    
    const prices = this.props.prices
    const amount = prices.map(element => element.amount)
    const label = prices.map(element => element.currency.symbol)
    const changeState =this.props.setDetailProduct
   
    const swatch = this.props.swatch.map(element  =>{
      
      return(
      <div className='swatch-or-capacity-conteiner'>
        <div style={{background: `${element.items[0].displayValue}`}} className='swatch-div'></div> 
        <div style={{background: `${element.items[1].displayValue}`}} className='swatch-div'></div> 
        <div style={{background: `${element.items[2].displayValue}`}} className='swatch-div'></div> 
        <div style={{background: `${element.items[3].displayValue}`}} className='swatch-div'></div> 
      </div>)}
    )

    const capacity =  this.props.capacity.map(element  =>{
      
      return(
        <div className='swatch-or-capacity-conteiner'>
          <div  className='capacity-div'>{element.items[0].value}</div> 
          <div  className='capacity-div'>{element.items[1].value}</div> 
        </div>)}
    )

   
    
       
    return (
      
        <>
          <Link to="/details">
            <div 
              className={!newElmement1.inStock && "cardoverlay-inproduct"} 
              onClick={()=>(changeState(newElmement1)) }
              onMouseOver={()=>this.setState({isCardHoverd: true})}
              onMouseOut={()=>this.setState({isCardHoverd: false})}
            ></div>
          </Link>
          {this.state.isHoveredAnImage && 
          <div className="is-incart-img-div" 
            onClick={()=> {
              
              if(newElmement1.attributes.length>0){
                this.setState({isPopUpShown: true})
                changeState(newElmement1)
              }

              if(newElmement1.attributes.length===0){
                addToCart(newElmement1)
              }
              
            }}
            onMouseOver={()=>{
              this.setState({isHoveredAnImage: true})
              this.setState({isCardHoverd: true})
            }}
            onMouseOut={()=>this.setState({isHoveredAnImage: false})}
          ><img src={image2} alt="" /></div> }
          <Link to="/details" onClick={()=>(changeState(newElmement1)) } style={{textDecoration: 'none',color:"black"}} >
          <div className={`card ${this.state.isCardHoverd ?"hoveredCard":undefined}`} 
            onMouseOver={()=>this.setState({isCardHoverd: true})}
            onMouseOut={()=>this.setState({isCardHoverd: false})}
          >
          
              {!newElmement1.inStock && <div className="outofstock-word" >OUT OF STOCK</div>}
                  <div className='img-in-product-div' 
                      onMouseOver={()=>this.setState({isHoveredAnImage: true})}
                      onMouseOut={()=>this.setState({isHoveredAnImage: false})}
                      alt=""
                  >
                  <img className='img-in-product' 
                    src={element.gallery[0]} 
                    alt=""
                  /> 
                  </div>
              <div className='attributes-div-inproduct'>
                <h3 className='brand-name-div-inproductlistpage'>{element.brand}</h3>
                <h3 className='brand-name-div-inproductlistpage'>{element.name}</h3>
                <div>{swatch}</div>
                {!newElmement1.inStock &&<div>{capacity}</div>}
                <h3 className='price-div'>{label}{amount}</h3>
              </div>
          </div>
          </Link>
          {this.state.isPopUpShown && 
          <SmallPopup
           popUpCloser={this.popUpCloser}
           cardHoverClose={this.cardHoverClose}
           details={this.props.details}
           addToCart = {this.props.addToCart}


           selectColor={this.props.selectColor}
           selectSize={this.props.selectSize}
           selectCapacity={this.props.selectCapacity}
           selectWithUSB3ports={this.props.selectWithUSB3ports}
           selectTouchIDinkeyboard={this.props.selectTouchIDinkeyboard}

           

           selectColorWhenInDescription={this.props.selectColorWhenInDescription}
           selectSizeWhenInDescription={this.props.selectSizeWhenInDescription}
           selectCapacityWhenInDescription={this.props.selectCapacityWhenInDescription}     
           selectWithUSB3portsWhenInDescription={this.props.selectWithUSB3portsWhenInDescription}
           selectTouchIDinkeyboardWhenInDescription={this.props.selectTouchIDinkeyboardWhenInDescription}



           />}
         </>
    )
  }
}