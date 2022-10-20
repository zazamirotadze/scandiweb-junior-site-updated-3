/*export default graphql(getAllCategory, {
    options: () => {
      return{
        variables:{
          "input": {"title": "all" } 
         
        }
  
      }
    }
  }
  
  )
  (ProductListPage);
  
  fetchData = () => {
    
    if(this.props.data.loading){
      return ""
    }else{
      const fetchCardData =  this.props.data.category
  
      return  fetchCardData.products.map(element => {
        const dollarPrice = element.prices.find(element => element)
        return (
            <Product element={element} dollarPrice={dollarPrice} key={element.id}  />
          )   
        } 
      )
    }
    
  
    
  }
  

  query($input: CategoryInput){
    category(input: $input) {
      name
      products {
        id
        name
        gallery
        brand
        prices {
          amount
          currency {
            label
            symbol
          }
        }
        attributes {
          id
          name
          type
          items {
            displayValue
            value
            id
          }
        }
        category
        description
        inStock
      }
    }
  }

  */ 

      {/*add = () => {
        localStorage.setItem(`${this.props.name}`,this.state.count );
        this.setState(prevState => ({count: JSON.parse(this.state.count) + 1}))
        const calculateSumOfCards = this.props.calculateSumOfCards
        calculateSumOfCards(this.props.card)
        
    }
    remove = () => {
        const removeFromCart = this.props.removeFromCart
        localStorage.setItem(`${this.props.name}`,this.state.count );
        this.setState(prevState => ({count: JSON.parse(this.state.count) - 1}))
        if(this.state.count <= 1){
            localStorage.removeItem(`${this.props.name}`)
            removeFromCart(this.props.name)
        }
    }*/}

       {/*  const hopeSwatch = newElmement1.attributes.filter(element => element.type === "swatch")
    const hopeSwatch1 = newElmement1.attributes.filter(element => element.type === "swatch")
    const hopeSwatch2 = newElmement1.attributes.filter(element => element.type === "swatch")
    const hopeSwatch3 = newElmement1.attributes.filter(element => element.type === "swatch")
    const hopeSwatch4 = newElmement1.attributes.filter(element => element.type === "swatch")
 
    hopeSwatch.forEach(element =>   element.items[0].isSelected=false )
    hopeSwatch1.forEach(element =>  element.items[1].isSelected=false )
    hopeSwatch2.forEach(element =>  element.items[2].isSelected=false )
    hopeSwatch3.forEach(element =>  element.items[3].isSelected=false )
    hopeSwatch4.forEach(element =>  element.items[4].isSelected=false )
    // give isSelected property to Size attribute
    const findSize = newElmement1.attributes.filter(element => element.id ==="Size")
    findSize.forEach(element => element.items[0].isSelected=false)
    findSize.forEach(element => element.items[1].isSelected=false)
    findSize.forEach(element => element.items[2].isSelected=false)
    findSize.forEach(element => element.items[3].isSelected=false)
    //
    */}