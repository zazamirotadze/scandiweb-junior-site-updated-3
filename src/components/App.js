import React from "react";
import ProductListPage from "./ProductListPage";
import Cart from "./Cart";
import Nav from "./Nav";
import {Routes, Route} from "react-router-dom"
import DescriptionPage from "./DescriptionPage";



class App extends React.Component {



  state = {
    detailProduct : JSON.parse(localStorage.getItem("detailProduct"))? JSON.parse(localStorage.getItem("detailProduct")): {},
    category: JSON.parse(localStorage.getItem("categoryNum"))?JSON.parse(localStorage.getItem("categoryNum")) : 0,
    currency:JSON.parse(localStorage.getItem("currency"))? JSON.parse(localStorage.getItem("currency")): "$",
    cart: JSON.parse(localStorage.getItem("cart"))? JSON.parse(localStorage.getItem("cart")):[],
    totalSum: JSON.parse(localStorage.getItem("totalSum"))? JSON.parse(localStorage.getItem("totalSum")):0,
    totalQuantity: JSON.parse(localStorage.getItem("totalQuantity"))? JSON.parse(localStorage.getItem("totalQuantity")):0,
    tax21: JSON.parse(localStorage.getItem("tax21"))? JSON.parse(localStorage.getItem("tax21")):0,
    allCategoryShown: JSON.parse( localStorage.getItem("allCategoryShown") ) !==null ? JSON.parse( localStorage.getItem("allCategoryShown") ): true,
    techCategoryShown: JSON.parse( localStorage.getItem("techCategoryShown") ) !==null ? JSON.parse( localStorage.getItem("techCategoryShown") ): false,
    clothesCategoryShown: JSON.parse( localStorage.getItem("clothesCategoryShown") ) !==null ? JSON.parse( localStorage.getItem("clothesCategoryShown") ): false,
    categoryUrl: JSON.parse( localStorage.getItem("categoryUrl") ) !==null ? JSON.parse( localStorage.getItem("categoryUrl") ) : "",
    filterParameterUrl: JSON.parse( localStorage.getItem("filterParameterUrl") ) !==null ? JSON.parse( localStorage.getItem("filterParameterUrl") ) : "",
    
  }


  
  changeCategoryUrl = (url) => {
    const attributesNames0 = JSON.parse(localStorage.getItem("attributesNames0"))
    const attributesNames1 = JSON.parse(localStorage.getItem("attributesNames1"))
    const attributesNames2 = JSON.parse(localStorage.getItem("attributesNames2"))
    const selectedAttribute0 = attributesNames0 !==null &&  attributesNames0.find(element => element.isSelected===true)
    const selectedAttribute1 = attributesNames1 !==null && attributesNames1.find(element => element.isSelected===true)
    const selectedAttribute2 = attributesNames2 !==null && attributesNames2.find(element => element.isSelected===true)
    if(url === "all"){
      this.changeFilterParameterUrl(selectedAttribute0)
    }
    if(url === "tech"){
      this.changeFilterParameterUrl(selectedAttribute2)
    }
    if(url === "clothes"){
      this.changeFilterParameterUrl(selectedAttribute1)
    }
    
    localStorage.setItem("categoryUrl", JSON.stringify(url))
    this.setState({categoryUrl: url})
    
  
    

  }

  changeFilterParameterUrl = (data) => {
    
    if( Array.isArray(data) && data !==undefined){
      const selectedElement = data.find(element => element.isSelected === true)
      const prevSelectedElement = JSON.parse(localStorage.getItem("filterParameterUrl"))
      
      if(selectedElement && prevSelectedElement !== selectedElement.name){
       
        localStorage.setItem("filterParameterUrl", JSON.stringify(selectedElement.name.split(" ").join("")))
        this.setState({filterParameterUrl: selectedElement.name.split(" ").join("")})


        // give each of the category url its filter parameter
        if(this.state.categoryUrl==="all"){
         
          localStorage.setItem("filterParameterUrlAll", JSON.stringify(selectedElement.name.split(" ").join("")))
          
        }
        if(this.state.categoryUrl==="tech"){
          localStorage.setItem("filterParameterUrlTech", JSON.stringify(selectedElement.name.split(" ").join("")))
        }
        if(this.state.categoryUrl==="clothes"){
          localStorage.setItem("filterParameterUrlClothes", JSON.stringify(selectedElement.name.split(" ").join("")))
        }
        //
      }else{

         // when we want to disselect an attribute
       
        localStorage.setItem("filterParameterUrl", JSON.stringify(""))
        this.setState({filterParameterUrl: ""})
               
        if(JSON.parse(localStorage.getItem("filterParameterUrlAll"))  !== "" && this.state.categoryUrl==="all"){
          localStorage.setItem("filterParameterUrlAll", JSON.stringify(""))
        }
        if(JSON.parse(localStorage.getItem("filterParameterUrlTech"))  !== "" && this.state.categoryUrl==="tech"){
            localStorage.setItem("filterParameterUrlTech", JSON.stringify(""))
        }
        if(JSON.parse(localStorage.getItem("filterParameterUrlClothes"))  !== ""  && this.state.categoryUrl==="clothes"){
          localStorage.setItem("filterParameterUrlClothes", JSON.stringify(""))
        }
               //
       

        
    
        
      }
    }else if(!Array.isArray(data) && data){
      
      localStorage.setItem("filterParameterUrl", JSON.stringify(data.name.split(" ").join("")))
      this.setState({filterParameterUrl: data.name.split(" ").join("")})
   
       
    }else{
      
      localStorage.setItem("filterParameterUrl", JSON.stringify(""))
     this.setState({filterParameterUrl: ""})
     
      
    }
 
    

  }

    
  changeState = (data) => {
    this.setState( {detailProduct : data})
    setTimeout(()=>{
      localStorage.setItem("detailProduct", JSON.stringify(data))
    },100)
  }
  changeCategory = (number) => {
    localStorage.setItem("categoryNum", JSON.stringify(number))
    this.setState( {category : number})
    if(number===0){
      localStorage.setItem("allCategoryShown", JSON.stringify(true))
      localStorage.setItem("techCategoryShown", JSON.stringify(false))
      localStorage.setItem("clothesCategoryShown", JSON.stringify(false))
      this.setState({allCategoryShown: true})
      this.setState({techCategoryShown: false})
      this.setState({clothesCategoryShown: false})
    }
    if(number===1){
      localStorage.setItem("allCategoryShown", JSON.stringify(false))
      localStorage.setItem("techCategoryShown", JSON.stringify(false))
      localStorage.setItem("clothesCategoryShown", JSON.stringify(true))
      this.setState({allCategoryShown:false})
      this.setState({techCategoryShown: false})
      this.setState({clothesCategoryShown: true})
    }
    if(number===2){
      localStorage.setItem("allCategoryShown", JSON.stringify(false))
      localStorage.setItem("techCategoryShown", JSON.stringify(true))
      localStorage.setItem("clothesCategoryShown", JSON.stringify(false))
      this.setState({allCategoryShown: false})
      this.setState({techCategoryShown: true})
      this.setState({clothesCategoryShown: false})
    }
  }

  changeCurrency =(event) => {

    this.setState({currency: event})
    setTimeout(() => {
      localStorage.setItem("currency", JSON.stringify(this.state.currency))
      this.setState({currency: event})
    }, 90);
    

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
    setTimeout(()=>{
      localStorage.setItem("cart", JSON.stringify(this.state.cart))
      const storedCart = JSON.parse(localStorage.getItem("cart"))
      
      this.setState({cart: storedCart})
      this.getTotal();
    }
      ,
    10) 
    
  };

  reduction = id =>{
    const { cart } = this.state;
    cart.forEach(item =>{
        if(item.id === id){
            item.count -=1;
        }
    })
    this.setState({cart: cart});
   
    this.removeFromCart(id)
    setTimeout(()=>{
      localStorage.setItem("cart", JSON.stringify(this.state.cart))
      const storedCart = JSON.parse(localStorage.getItem("cart"))
      
      this.setState({cart: storedCart})
      this.getTotal();
    }
      ,
    10) 



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
    //
    //place data into the local storage
    this.setState({totalQuantity: newQuantity})
    setTimeout(()=>{ 


      localStorage.setItem("totalSum", JSON.stringify(this.state.totalSum))
      this.setState({totalSum: res})

      localStorage.setItem("tax21", JSON.stringify(this.state.tax21))
      this.setState({tax21: tax21})

      localStorage.setItem("totalQuantity", JSON.stringify(this.state.totalQuantity))
      this.setState({totalQuantity: newQuantity})

    } ,100)
    
    //
};

  addToCart = (card) => {
    

    // identify if every attribute is selected for the card
    let isAnyAttributeChosen 
    
    if(card.attributes.length===0){
      isAnyAttributeChosen = true
    }


    if(card.attributes.length===1){
      isAnyAttributeChosen = card.attributes[0].items.some(item => item.isSelected===true)
    }


    if(card.attributes.length===2){
      isAnyAttributeChosen = card.attributes[0].items.some(item => item.isSelected===true)&&
      card.attributes[1].items.some(item => item.isSelected===true)
    }

    if(card.attributes.length===3){
      isAnyAttributeChosen = card.attributes[0].items.some(item => item.isSelected===true)&&
      card.attributes[1].items.some(item => item.isSelected===true)&&
      card.attributes[2].items.some(item => item.isSelected===true)
    }
    
    
    //

    const countedCard = JSON.parse(JSON.stringify(card));
    countedCard.count = 1
    countedCard.incart = true
    const cartLength = this.state.cart.length
    const inCartIdElementArray = cartLength > 0 && this.state.cart.map(element => element.id )
    const findId = cartLength > 0 && inCartIdElementArray.filter(element => element === card.id)
    const findIdLength = cartLength > 0 && findId.length
    
 
    if (cartLength === 0 && isAnyAttributeChosen){
      this.setState({cart: [...this.state.cart, countedCard]})
      
      setTimeout(()=>{
        localStorage.setItem("cart", JSON.stringify(this.state.cart))
        const storedCart = JSON.parse(localStorage.getItem("cart"))
        
        this.setState({cart: storedCart})
      }
        ,
      10) 

    }else if (findIdLength === 0 && isAnyAttributeChosen){
      this.setState({cart: [...this.state.cart, countedCard]})
      setTimeout(()=>{
        localStorage.setItem("cart", JSON.stringify(this.state.cart))
        const storedCart = JSON.parse(localStorage.getItem("cart"))
        this.setState({cart: storedCart})
      },10)     
    }else if(!isAnyAttributeChosen){
      alert("Firstly you have to choose  attributes. But you can change attributes by clicking the button")
    }else{
      alert("The product has already been added into the cart. But you can change attributes by clicking the button")
    }

    setTimeout(() => {
      this.getTotal()
    }, 100);
   
    
  }

  clearCart = () => {
    this.setState({cart: []})
    this.setState({totalQuantity:0})
    alert("They payment is successful. please click ok")
    localStorage.removeItem('cart');
    localStorage.removeItem('totalSum');
    localStorage.removeItem('tax21');
    localStorage.removeItem('totalQuantity');
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
    setTimeout(()=>{
      localStorage.setItem("detailProduct", JSON.stringify(newDetailProduct))
    },100)
  }

  selectColorWhenInDescription = (element, id) => {
    
    const cart = this.state.cart
    const findDescriptionElement = cart.find(elementi => elementi.id === id )
      
    
    let IsSwatchInCart
    if(findDescriptionElement !== undefined){
      IsSwatchInCart = findDescriptionElement.attributes.find(element => element.id=== 'Color')
    }
    
      if (IsSwatchInCart !== undefined){
        const findSwatchInCart= findDescriptionElement.attributes.find(element => element.id === 'Color').items
        const findSwatchInDesc=  element.attributes.find(element => element.id === 'Color').items
        const  isSelectedColorInDescId = findSwatchInDesc.find(elementi => elementi.isSelected===true)
        
        if(isSelectedColorInDescId){
          const selectedColorInDescId = findSwatchInDesc.find(elementi => elementi.isSelected===true).id
        
          //find color to select
          findSwatchInCart.find(elementi => elementi.id === selectedColorInDescId).isSelected=true
          //

          //find colors to disselect
          const disselectedColor = findSwatchInCart.filter(elementi => elementi.id !== selectedColorInDescId)
          disselectedColor.forEach(element => element.isSelected=false)
          //
          setTimeout(()=>{
            localStorage.setItem("cart", JSON.stringify(cart))
          },100)
        }

      } 
      
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
      setTimeout(()=>{
        localStorage.setItem("detailProduct", JSON.stringify(newDetailProduct))
      },100)
  }


  selectSizeWhenInDescription = (element, id) => {

    const cart = this.state.cart
    let  findDescriptionElement
    if(id!==undefined){
       findDescriptionElement = cart.find(elementi => elementi.id === id )
       
    }

    



    let isSizeInCart
    if(findDescriptionElement !== undefined){
     isSizeInCart = findDescriptionElement.attributes.find(element => element.id === 'Size')
    }


    if (isSizeInCart !== undefined){

      const findSizeInCart= findDescriptionElement.attributes.find(element => element.id === 'Size').items
      const findSizeInDesc= element.attributes.find(element => element.id === 'Size').items

      const  isSelectedSizeInDescId = findSizeInDesc.find(elementi => elementi.isSelected===true)

      if(isSelectedSizeInDescId){

      const selectedSizeInDescId = findSizeInDesc.find(elementi => elementi.isSelected===true).id

      

      //find Size to select
      findSizeInCart.find(elementi => elementi.id === selectedSizeInDescId).isSelected=true
      //

      //find Size to disselect
      const disselectedSize = findSizeInCart.filter(elementi => elementi.id !== selectedSizeInDescId)
      disselectedSize.forEach(element => element.isSelected=false)
      //
      setTimeout(()=>{
        localStorage.setItem("cart", JSON.stringify(cart))
      },100)
      }


    }
    
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
    setTimeout(()=>{
      localStorage.setItem("detailProduct", JSON.stringify(newDetailProduct))
    },100)

  }

  selectCapacityWhenInDescription = (element, id) => {

    const cart = this.state.cart

    let  findDescriptionElement
    if(id!==undefined){
       findDescriptionElement =   cart.find(elementi => elementi.id === id )
       
    }

   

   

    let isCapacityInCart
    if(findDescriptionElement !== undefined){
     isCapacityInCart = findDescriptionElement.attributes.find(element => element.id === 'Capacity' )
    }


    if (isCapacityInCart !== undefined){

      const findCapacityInCart= findDescriptionElement.attributes.find(element => element.id === 'Capacity' ).items
      const findCapacityInDesc= element.attributes.find(element => element.id === 'Capacity' ).items
      const  isSelectedCapacityInDescId = findCapacityInDesc.find(elementi => elementi.isSelected===true)

      if(isSelectedCapacityInDescId){
        const selectedCapacityInDescId = findCapacityInDesc.find(elementi => elementi.isSelected===true).id
        //find capacity to select
        findCapacityInCart.find(elementi => elementi.id === selectedCapacityInDescId).isSelected=true
        //

        //find capacity to disselect
        const disselectedSize = findCapacityInCart.filter(elementi => elementi.id !== selectedCapacityInDescId)
        disselectedSize.forEach(element => element.isSelected=false)
        //
        setTimeout(()=>{
          localStorage.setItem("cart", JSON.stringify(cart))
        },100) 
      }



    }
    
  }


  //
  // functions to select if With USB 3 ports
  
  selectWithUSB3ports = (element) => {
    const newDetailProduct = JSON.parse(JSON.stringify(this.state.detailProduct));
    const findwithUSB3Ports= newDetailProduct.attributes.find(element => element.id === 'With USB 3 ports')
    findwithUSB3Ports.items.find(withUSB=>  withUSB.id === element.id).isSelected=true
     const eleseWithUSB3Ports= findwithUSB3Ports.items.filter(withUSB =>  withUSB.id !== element.id)
     eleseWithUSB3Ports.forEach(element => element.isSelected=false )
     
    this.setState({detailProduct:newDetailProduct})

    setTimeout(()=>{
      localStorage.setItem("detailProduct", JSON.stringify(newDetailProduct))
    },100)

  }

  selectWithUSB3portsWhenInDescription = (element, id) => {
    
    const cart = this.state.cart
    let findDescriptionElement
    if(id!==undefined){
      findDescriptionElement = cart.find(elementi => elementi.id === id )
      
    }
    
     let isWithUSB3portsInCart
    if(findDescriptionElement !== undefined){
     isWithUSB3portsInCart = findDescriptionElement.attributes.find(element => element.id === 'With USB 3 ports')
     
    }
    

    if (isWithUSB3portsInCart !== undefined){

      const findWithUSB3portsInCart= findDescriptionElement.attributes.find(element => element.id === 'With USB 3 ports').items
      
      const findWithUSB3portsInDesc= element.attributes.find(element => element.id === 'With USB 3 ports').items
      
      const  isSelectedWithUSB3portsInDescId = findWithUSB3portsInDesc.find(elementi => elementi.isSelected===true)

      if(isSelectedWithUSB3portsInDescId){

        const selectedWithUSB3portsInDescId = findWithUSB3portsInDesc.find(elementi => elementi.isSelected===true).id

        //find WithUSB3ports to select
        findWithUSB3portsInCart.find(elementi => elementi.id === selectedWithUSB3portsInDescId).isSelected=true
        //

        //find WithUSB3ports to disselect
        const disselectedWithUSB3ports = findWithUSB3portsInCart.filter(elementi => elementi.id !== selectedWithUSB3portsInDescId)
        disselectedWithUSB3ports.forEach(element => element.isSelected=false)
      //
        setTimeout(()=>{
          localStorage.setItem("cart", JSON.stringify(cart))
        },100) 
      }


    }
    
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

    setTimeout(()=>{
      localStorage.setItem("detailProduct", JSON.stringify(newDetailProduct))
    },100)
  }

  selectTouchIDinkeyboardWhenInDescription = (element, id) => {
    
    const cart = this.state.cart
    let findDescriptionElement
    if(id!==undefined){
      findDescriptionElement = cart.find(elementi => elementi.id === id )
      
    }
    
     let isTouchIDinkeyboard
    if(findDescriptionElement !== undefined){
     isTouchIDinkeyboard = findDescriptionElement.attributes.find(element => element.id === 'Touch ID in keyboard')
     
    }
    

    if (isTouchIDinkeyboard !== undefined){

      const findTouchIDinkeyboardInCart= findDescriptionElement.attributes.find(element => element.id === 'Touch ID in keyboard').items
      
      const findTouchIDinkeyboardInDesc= element.attributes.find(element => element.id === 'Touch ID in keyboard').items
      
      const  isSelectedTouchIDinkeyboardId = findTouchIDinkeyboardInDesc.find(elementi => elementi.isSelected===true)

      if(isSelectedTouchIDinkeyboardId){

        const selectedTouchIDinkeyboardInDescId = findTouchIDinkeyboardInDesc.find(elementi => elementi.isSelected===true).id

        //find WithUSB3ports to select
        findTouchIDinkeyboardInCart.find(elementi => elementi.id === selectedTouchIDinkeyboardInDescId).isSelected=true
        //

        //find WithUSB3ports to disselect
        const disselectedTouchIDinkeyboard = findTouchIDinkeyboardInCart.filter(elementi => elementi.id !== selectedTouchIDinkeyboardInDescId)
        disselectedTouchIDinkeyboard.forEach(element => element.isSelected=false)
      //
        setTimeout(()=>{
          localStorage.setItem("cart", JSON.stringify(cart))
        },100) 
      }


    }
    
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
                  changeCategoryUrl={this.changeCategoryUrl}
                  filterParameterUrl={this.state.filterParameterUrl}

                  increase={this.increase}
                  reduction={this.reduction}
                  cart={this.state.cart} 
                  currency ={this.state.currency}
                  removeFromCart = {this.removeFromCart}
                  calculateSumOfCards = {this.calculateSumOfCards}
                  totalSum = {this.state.totalSum}
                  totalQuantity={this.state.totalQuantity}
                  tax21={this.state.tax21}
                  clearCart={this.clearCart}
                  
                  />
                <Routes>
                  <Route path={`/${this.state.categoryUrl}/${this.state.filterParameterUrl}`}
                    element={
                      
                      <ProductListPage 
                        categoryUrl = {this.state.categoryUrl}
                        changeFilterParameterUrl = {this.changeFilterParameterUrl}
                        setDetailProduct = {this.changeState}
                        category = {this.state.category}
                        currency ={this.state.currency}
                        cart={this.state.cart}
                        toInitialyFetch= {this.toInitialyFetch}
                        initialFetch = {this.state.initialFetch}
                        // props for popUp
                        details={this.state.detailProduct}
                        addToCart = {this.addToCart}


                        selectColor={this.selectColor}
                        selectSize={this.selectSize}
                        selectCapacity={this.selectCapacity}
                        selectWithUSB3ports={this.selectWithUSB3ports}
                        selectTouchIDinkeyboard={this.selectTouchIDinkeyboard}



                        selectColorWhenInDescription={this.selectColorWhenInDescription}
                        selectSizeWhenInDescription={this.selectSizeWhenInDescription}
                        selectCapacityWhenInDescription={this.selectCapacityWhenInDescription}     
                        selectWithUSB3portsWhenInDescription={this.selectWithUSB3portsWhenInDescription}
                        selectTouchIDinkeyboardWhenInDescription={this.selectTouchIDinkeyboardWhenInDescription}
                        // 
                      />  
                     
                    
                    }  
                  />
                  <Route path="/"

                    element = {
                      <ProductListPage 
                      categoryUrl = {this.state.categoryUrl}
                      changeFilterParameterUrl = {this.changeFilterParameterUrl}
                      setDetailProduct = {this.changeState}
                      category = {this.state.category}
                      currency ={this.state.currency}
                      cart={this.state.cart}
                      toInitialyFetch= {this.toInitialyFetch}
                      initialFetch = {this.state.initialFetch}
                      // props for popUp
                      details={this.state.detailProduct}
                      addToCart = {this.addToCart}


                      selectColor={this.selectColor}
                      selectSize={this.selectSize}
                      selectCapacity={this.selectCapacity}
                      selectWithUSB3ports={this.selectWithUSB3ports}
                      selectTouchIDinkeyboard={this.selectTouchIDinkeyboard}



                      selectColorWhenInDescription={this.selectColorWhenInDescription}
                      selectSizeWhenInDescription={this.selectSizeWhenInDescription}
                      selectCapacityWhenInDescription={this.selectCapacityWhenInDescription}     
                      selectWithUSB3portsWhenInDescription={this.selectWithUSB3portsWhenInDescription}
                      selectTouchIDinkeyboardWhenInDescription={this.selectTouchIDinkeyboardWhenInDescription}
                      // 
                    />
                    }


                  >
                    
                  </Route>
                  
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



                        selectColorWhenInDescription={this.selectColorWhenInDescription}
                        selectSizeWhenInDescription={this.selectSizeWhenInDescription}
                        selectCapacityWhenInDescription={this.selectCapacityWhenInDescription}     
                        selectWithUSB3portsWhenInDescription={this.selectWithUSB3portsWhenInDescription}
                        selectTouchIDinkeyboardWhenInDescription={this.selectTouchIDinkeyboardWhenInDescription}
                        
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
                        clearCart={this.clearCart}
                      />}
                  />
                </Routes>
              
            </div>
  }
}
export default App;