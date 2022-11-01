import React, { Component } from 'react'
import "./Nav.css"

export default class CurrencyChanger extends Component {

    constructor(props) {
      super(props);

      this.wrapperRef = React.createRef();
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
      document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside(event) {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({listIsShown: false});
      }
    }



    state = {
        listIsShown: false,
        option1: this.props.currency==="$"?true:false,
        option2: this.props.currency==="£"?true:false,
        option3: this.props.currency==="A$"?true:false,
        option4: this.props.currency==="¥"?true:false,
        option5: this.props.currency==="₽"?true:false
    }



  render() {
    
    const  changeCurrency=this.props.changeCurrency
    const currency=this.props.currency

    return (
        <div  className='whole-currency-changer-in-nav' >
        <p>{currency}</p>
        <div className='currency-changer-in-nav'>
        <div className='arrow-div-currency'>
        <i 
            className={this.state.listIsShown?"fas fa-angle-up":  'fas fa-angle-down' }
            onClick={()=>this.setState({listIsShown: true})}
        >
        </i>
        </div>
        {this.state.listIsShown && <div className='list-of-prices-innav' ref={this.wrapperRef}>
          <option 
            onClick={()=> {
              changeCurrency("$") 
              this.setState({option1: true}) 
              this.setState({option2: false})
              this.setState({option3: false})
              this.setState({option4: false})
              this.setState({option5: false})
              this.setState({listIsShown: false})
            }}
            style={{backgroundColor: this.state.option1? "#e0e0d1" : "white"}}
            
          >
            $ USD
          </option>
          <option
            onClick={()=> {
              changeCurrency("£")
              this.setState({option1: false}) 
              this.setState({option2: true})
              this.setState({option3: false})
              this.setState({option4: false})
              this.setState({option5: false})
              this.setState({listIsShown: false})
            }}
            style={{backgroundColor: this.state.option2? "#e0e0d1" : "white"}}
          >
            £ EUR
          </option>
          <option
            onClick={()=> {
              changeCurrency("A$")
              this.setState({option1: false}) 
              this.setState({option2: false})
              this.setState({option3: true})
              this.setState({option4: false})
              this.setState({option5: false})
              this.setState({listIsShown: false})
            }}
            style={{backgroundColor: this.state.option3? "#e0e0d1" : "white"}}
          >
            A$ AUD
          </option>
          <option
            onClick={()=>{ 
              changeCurrency("¥")
              this.setState({option1: false}) 
              this.setState({option2: false})
              this.setState({option3: false})
              this.setState({option4: true})
              this.setState({option5: false})
              this.setState({listIsShown: false})
            }}
            style={{backgroundColor: this.state.option4? "#e0e0d1" : "white"}}
          >
            ¥ JPY
          </option>
          <option
            onClick={()=>{ 
              changeCurrency("₽")
              this.setState({option1: false}) 
              this.setState({option2: false})
              this.setState({option3: false})
              this.setState({option4: false})
              this.setState({option5: true})
              this.setState({listIsShown: false})
            }}
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
