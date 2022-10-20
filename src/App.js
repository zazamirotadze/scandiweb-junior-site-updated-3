import React from "react";
import ProductListPage from "./ProductListPage";
import Cart from "./Cart";
import Nav from "./Nav";
import {Routes, Route, Link} from "react-router-dom"

import DescriptionPage from "./DescriptionPage";




class App extends React.Component {



  state = {
    detailProduct : {},
    category: 0,
    currency: "$",
    cart: [],
    totalSum: 0,
    totalQuantity: 0,
    tax21: 0,
    allCategoryShown: true,
    techCategoryShown: false,
    clothesCategoryShown: false
  }



  changeState = (data) => {
    this.setState( {detailProduct : data})
  }
  changeCategory = (number) => {
    this.setState( {category : number})
    if(number===0){
      this.setState({allCategoryShown: true})
      this.setState({techCategoryShown: false})
      this.setState({clothesCategoryShown: false})
    }
    if(number===1){
      this.setState({allCategoryShown:false})
      this.setState({techCategoryShown: false})
      this.setState({clothesCategoryShown: true})
    }
    if(number===2){
      this.setState({allCategoryShown: false})
      this.setState({techCategoryShown: true})
      this.setState({clothesCategoryShown: false})
    }
  }

  changeCurrency =(event) => {

    this.setState({currency: event})
    setTimeout(() => {
      this.getTotal();
    }, 100);
  }


  increase = id =>{
    const { cart } = this.state;
    cart.forEach(item =>{
        if(item.id === id){
            item.count += 1;
        }
    })
    this.setState({cart: cart});
    this.getTotal();
  };

  reduction = id =>{
    const { cart } = this.state;
    cart.forEach(item =>{
        if(item.id === id){
            item.count -=1;
        }
    })
    this.setState({cart: cart});
    this.getTotal();
    this.removeFromCart(id)
  };


  getTotal = ()=>{
    const{cart} = this.state;

    ////// calculate total sum
   const res = cart.reduce((prev, item) => {
        const priceObject = (item.prices.find((element => element.currency.symbol ===this.state.currency)))
        return prev + (priceObject.amount * item.count);
    },0)
    this.setState({totalSum: res})
    //

     ////// calculate tax 21%
    const tax21 = res*0.21
    this.setState({tax21: tax21})
    //

     ////// calculate total quantity
    const newQuantity = cart.reduce((prev, item) => {
        return prev +  item.count;
    },0)
    this.setState({totalQuantity: newQuantity})
    //
};

  addToCart = (card) => {
    const countedCard = JSON.parse(JSON.stringify(card));
    countedCard.count = 1
    countedCard.incart = true
    const cartLength = this.state.cart.length
    const inCartIdElementArray = cartLength > 0 && this.state.cart.map(element => element.id )
    const findId = cartLength > 0 && inCartIdElementArray.filter(element => element === card.id)
    const findIdLength = cartLength > 0 && findId.length

 
    if (cartLength === 0){
      this.setState({cart: [...this.state.cart, countedCard]})
      
    }else if (findIdLength === 0){
      this.setState({cart: [...this.state.cart, countedCard]})
      
    }else{
      alert("The product has already been added into the cart.")
    }

    setTimeout(() => {
      this.getTotal()
    }, 100);
   
    
  }

  clearCart = () => {
    this.setState({cart: []})
    this.setState({totalQuantity:0})
    alert("They payment is successful. please click ok")
  }

  removeFromCart = (id) => {
    
    const findElement = this.state.cart.find(element => element.id ===id)
    const findCount = findElement.count
  
    if (findCount <1){
      const filteredCart = this.state.cart.filter(element => element.id !==id)
      this.setState({cart: filteredCart})
    }

  }

  // functions to select colors
  selectColor = (element) => {
  const newDetailProduct = JSON.parse(JSON.stringify(this.state.detailProduct));
  const findSwatch= newDetailProduct.attributes.find(element => element.type === 'swatch')
  findSwatch.items.find(color =>  color.id === element.id).isSelected=true
   const eleseColors= findSwatch.items.filter(color =>  color.id !== element.id)
   eleseColors.forEach(element => element.isSelected=false )
   
  this.setState({detailProduct:newDetailProduct})
  }

  selectColorInCart = (element, id) => {
    const newCart = JSON.parse(JSON.stringify(this.state.cart))
    const findObjInCart =  newCart.find(cartObj => cartObj.id === id )
    const findSwatch = findObjInCart.attributes.find(element => element.type === 'swatch')
    findSwatch.items.find(color =>  color.id === element.id).isSelected=true
    const eleseColors= findSwatch.items.filter(color =>  color.id !== element.id)
    eleseColors.forEach(element => element.isSelected=false )
    this.setState({cart:newCart})
  }
  //

  // functions to select sizes
  selectSize = (element) => {
    const newDetailProduct = JSON.parse(JSON.stringify(this.state.detailProduct));
    const findSize= newDetailProduct.attributes.find(element => element.id === 'Size')
    findSize.items.find(size =>  size.id === element.id).isSelected=true
     const eleseColors= findSize.items.filter(color =>  color.id !== element.id)
     eleseColors.forEach(element => element.isSelected=false )
     
    this.setState({detailProduct:newDetailProduct})
  }

  selectSizeInCart = (element, id) => {
    const newCart = JSON.parse(JSON.stringify(this.state.cart))
    const findObjInCart =  newCart.find(cartObj => cartObj.id === id )
    const findSize = findObjInCart.attributes.find(element => element.id === 'Size')
    findSize.items.find(size =>  size.id === element.id).isSelected=true
    const eleseSizes= findSize.items.filter(size=>  size.id !== element.id)
    eleseSizes.forEach(element => element.isSelected=false )
    this.setState({cart:newCart})
  }
  //
  // functions to select Capacity
  selectCapacity = (element) => {
    const newDetailProduct = JSON.parse(JSON.stringify(this.state.detailProduct));
    const findCapacity= newDetailProduct.attributes.find(element => element.id === 'Capacity')
    findCapacity.items.find(capacity=>  capacity.id === element.id).isSelected=true
     const eleseCapacity= findCapacity.items.filter(capacity =>  capacity.id !== element.id)
     eleseCapacity.forEach(element => element.isSelected=false )
     
    this.setState({detailProduct:newDetailProduct})
  }
  selectCapacityInCart = (element, id) => {
    const newCart = JSON.parse(JSON.stringify(this.state.cart))
    const findObjInCart =  newCart.find(cartObj => cartObj.id === id )
    const findCapacity = findObjInCart.attributes.find(element => element.id === 'Capacity')
    findCapacity.items.find(capacity =>  capacity.id === element.id).isSelected=true
    const eleseCapacity= findCapacity.items.filter(capacity=>  capacity.id !== element.id)
    eleseCapacity.forEach(element => element.isSelected=false )
    this.setState({cart:newCart})
  }

  // functions to select if With USB 3 ports
  
  selectWithUSB3ports = (element) => {
    const newDetailProduct = JSON.parse(JSON.stringify(this.state.detailProduct));
    const findwithUSB3Ports= newDetailProduct.attributes.find(element => element.id === 'With USB 3 ports')
    findwithUSB3Ports.items.find(withUSB=>  withUSB.id === element.id).isSelected=true
     const eleseWithUSB3Ports= findwithUSB3Ports.items.filter(withUSB =>  withUSB.id !== element.id)
     eleseWithUSB3Ports.forEach(element => element.isSelected=false )
     
    this.setState({detailProduct:newDetailProduct})
  }

  selectWithUSB3portsInCart = (element, id) => {
    const newCart = JSON.parse(JSON.stringify(this.state.cart))
    const findObjInCart =  newCart.find(cartObj => cartObj.id === id )
    const findWithUSB3ports = findObjInCart.attributes.find(element => element.id === 'With USB 3 ports')
    findWithUSB3ports.items.find(WithUSB =>  WithUSB.id === element.id).isSelected=true
    const eleseWithUSB3Ports= findWithUSB3ports.items.filter(withUSB=>  withUSB.id !== element.id)
    eleseWithUSB3Ports.forEach(element => element.isSelected=false )
    this.setState({cart:newCart})
  }
  //

  // functions to select if Touch ID in keyboard
  selectTouchIDinkeyboard = (element) => {
    const newDetailProduct = JSON.parse(JSON.stringify(this.state.detailProduct));
    const findTouchIDinkeyboard= newDetailProduct.attributes.find(element => element.id === 'Touch ID in keyboard')
    findTouchIDinkeyboard.items.find(TouchID=>  TouchID.id === element.id).isSelected=true
    const elesefindTouchIDinkeyboard= findTouchIDinkeyboard.items.filter(withUSB =>  withUSB.id !== element.id)
    elesefindTouchIDinkeyboard.forEach(element => element.isSelected=false )
     
    this.setState({detailProduct:newDetailProduct})
  }

  selectTouchIDinkeyboardInCart = (element, id) => {
    const newCart = JSON.parse(JSON.stringify(this.state.cart))
    const findObjInCart =  newCart.find(cartObj => cartObj.id === id )
    const findfindTouchIDinkeyboard = findObjInCart.attributes.find(element => element.id === 'Touch ID in keyboard')
    findfindTouchIDinkeyboard.items.find(TouchID => TouchID.id === element.id).isSelected=true
    const eleseTouchIDinkeyboard= findfindTouchIDinkeyboard.items.filter(TouchID=>  TouchID.id !== element.id)
    eleseTouchIDinkeyboard.forEach(element => element.isSelected=false )
    this.setState({cart:newCart})
  }

  //

  render() {
  
    return  <div style={{width:"100%"}}>
                <Nav  
                  changeCategory= {this.changeCategory} 
                  changeCurrency = {this.changeCurrency} 
                  allCategoryShown= {this.state.allCategoryShown}
                  techCategoryShown= {this.state.techCategoryShown}
                  clothesCategoryShown= {this.state.clothesCategoryShown}


                  increase={this.increase}
                  reduction={this.reduction}
                  cart={this.state.cart} 
                  currency ={this.state.currency}
                  removeFromCart = {this.removeFromCart}
                  calculateSumOfCards = {this.calculateSumOfCards}
                  totalSum = {this.state.totalSum}
                  totalQuantity={this.state.totalQuantity}
                  tax21={this.state.tax21}
                  selectColorInCart={this.selectColorInCart}
                  selectSizeInCart={this.selectSizeInCart}
                  selectCapacityInCart={this.selectCapacityInCart}
                  selectWithUSB3portsInCart={this.selectWithUSB3portsInCart}
                  selectTouchIDinkeyboardInCart={this.selectTouchIDinkeyboardInCart}
                  clearCart={this.clearCart}
                  
                  />
                <Routes>
                  <Route path="/" 
                    element={
                      <ProductListPage 
                        setDetailProduct = {this.changeState}
                        category = {this.state.category}
                        currency ={this.state.currency}
                        cart={this.state.cart}
                      />}
                  />
                  <Route path="/details" 
                    element={
                      <DescriptionPage 
                        details={this.state.detailProduct}
                        currency ={this.state.currency}
                        addToCart = {this.addToCart}
                        selectColor={this.selectColor}
                        selectSize={this.selectSize}
                        selectCapacity={this.selectCapacity}
                        selectWithUSB3ports={this.selectWithUSB3ports}
                        selectTouchIDinkeyboard={this.selectTouchIDinkeyboard}
                      />}
                  />
                  <Route path="/Cart" 
                    element={
                      <Cart 
                        increase={this.increase}
                        reduction={this.reduction}
                        cart={this.state.cart} 
                        currency ={this.state.currency}
                        removeFromCart = {this.removeFromCart}
                        calculateSumOfCards = {this.calculateSumOfCards}
                        totalSum = {this.state.totalSum}
                        totalQuantity={this.state.totalQuantity}
                        tax21={this.state.tax21}
                        selectColorInCart={this.selectColorInCart}
                        selectSizeInCart={this.selectSizeInCart}
                        selectCapacityInCart={this.selectCapacityInCart}
                        selectWithUSB3portsInCart={this.selectWithUSB3portsInCart}
                        selectTouchIDinkeyboardInCart={this.selectTouchIDinkeyboardInCart}
                        clearCart={this.clearCart}
                      />}
                  />
                </Routes>
            </div>
  }
}
export default App;