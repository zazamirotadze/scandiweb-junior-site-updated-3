import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import image2 from "../images/Common.png"
import SmallPopup from './SmallPopup'
import nodeid from 'node-id';
const uniqueId = nodeid()
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
      <div key={uniqueId}>
        <div  style={{background: `${element.items[0].displayValue}`}} className='product__attributes--swatch'></div> 
        <div style={{background: `${element.items[1].displayValue}`}} className='product__attributes--swatch'></div> 
        <div  style={{background: `${element.items[2].displayValue}`}} className='product__attributes--swatch'></div> 
        <div  style={{background: `${element.items[3].displayValue}`}} className='product__attributes--swatch'></div> 
      </div>)}
    )

    const capacity =  this.props.capacity.map(element  =>{
      
      return(
        <select  size="2" key={uniqueId}>
          <option>{element.items[0].value}</option>
          <option>{element.items[1].value}</option>
        </select>)}
    )

   
    
       
    return (
      

        <>
          <Link to="/details"  >
            <div 
              
              className={!newElmement1.inStock? "product__overlay": undefined} 
              onClick={()=>(changeState(newElmement1)) }
              onMouseOver={()=>this.setState({isCardHoverd: true})}
              onMouseOut={()=>this.setState({isCardHoverd: false})}
            ></div>
          </Link>
          {this.state.isHoveredAnImage && 
          <div className="product__cart-icon--div" 
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
          <div className={this.state.isCardHoverd ?"product__card--whenhovered":"product__card"} 
            onMouseOver={()=>this.setState({isCardHoverd: true})}
            onMouseOut={()=>this.setState({isCardHoverd: false})}
          >
          
              {!newElmement1.inStock && <div className="product__outofstock--word" >OUT OF STOCK</div>}
                  <div className='product__img--div' 
                      onMouseOver={()=>this.setState({isHoveredAnImage: true})}
                      onMouseOut={()=>this.setState({isHoveredAnImage: false})}
                      alt=""
                  >
                    <img src={element.gallery[0]} alt="" /> 
                  </div>
              <div className='product__attributes'>
                <h3>{element.brand}</h3>
                <h3>{element.name}</h3>
                <div>{swatch}</div>
                {!newElmement1.inStock &&<div>{capacity}</div>}
                <h3>{label}{amount}</h3>
              </div>
          </div>
          </Link>
          {this.state.isPopUpShown && 
          <SmallPopup
    
           popUpCloser={this.popUpCloser}
           cardHoverClose={this.cardHoverClose}
           {...this.props}
           />}
         </>
    )
  }
}