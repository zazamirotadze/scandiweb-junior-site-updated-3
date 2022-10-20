import React, { Component } from 'react'
import "./Nav.css"

export default class CurrencyChanger extends Component {

    state = {

        listIsShown: false,
        option1: false,
        option2: false,
        option3: false,
        option4: false,
        option5: false
    }
  render() {
    
    const  changeCurrency=this.props.changeCurrency
    const currency=this.props.currency

    return (
        <div  className='whole-currency-changer-in-nav'  style={{}}>
        <p>{currency}</p>
        <div className='currency-changer-in-nav'>
        
        <i 
            className={this.state.listIsShown?"fas fa-angle-up":  'fas fa-angle-down' }
            onClick={()=>this.setState({listIsShown: !this.state.listIsShown})}
        >
        </i>
        {this.state.listIsShown && <div className='list-of-prices-innav'>
          <option 
            onMouseOver={() => this.setState({option1: true})}
            onMouseOut={() => this.setState({option1: false})}
            onClick={()=> changeCurrency("$")}
            style={{backgroundColor: this.state.option1? "#e0e0d1" : "white"}}
            
          >
            $ USD
          </option>
          <option
            onMouseOver={() => this.setState({option2: true})}
            onMouseOut={() => this.setState({option2: false})}
            onClick={()=> changeCurrency("£")}
            style={{backgroundColor: this.state.option2? "#e0e0d1" : "white"}}
          >
            £ EUR
          </option>
          <option
            onMouseOver={() => this.setState({option3: true})}
            onMouseOut={() => this.setState({option3: false})}
            onClick={()=> changeCurrency("A$")}
            style={{backgroundColor: this.state.option3? "#e0e0d1" : "white"}}
          >
            A$ AUD
          </option>
          <option
            onMouseOver={() => this.setState({option4: true})}
            onMouseOut={() => this.setState({option4: false})}
            onClick={()=> changeCurrency("¥")}
            style={{backgroundColor: this.state.option4? "#e0e0d1" : "white"}}
          >
            ¥ JPY
          </option>
          <option
            onMouseOver={() => this.setState({option5: true})}
            onMouseOut={() => this.setState({option5: false})}
            onClick={()=> changeCurrency("₽")}
            style={{backgroundColor: this.state.option5? "#e0e0d1" : "white"}}
          >
           ₽ RUB 
          </option>
        </div>}
    </div>
    </div>
    )
  }
}
