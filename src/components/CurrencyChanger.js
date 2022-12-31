import React, { Component } from 'react'
import OutsideAlerterForCurrencyChanger from '../outsideAlerters/OutsideAlerterForCurrencyChanger'

export default class CurrencyChanger extends Component {





    state = {
        listIsShown: false,
        option1: this.props.currency==="$"?true:false,
        option2: this.props.currency==="£"?true:false,
        option3: this.props.currency==="A$"?true:false,
        option4: this.props.currency==="¥"?true:false,
        option5: this.props.currency==="₽"?true:false
    }

    currencyCloser=()=>{
      this.setState({listIsShown:false})
    }


  render() {

    // color variebles
      const styles = window.getComputedStyle(document.documentElement);
      const colorWhite = styles.getPropertyValue('--color-white');
      const colorLightGrey = styles.getPropertyValue('--color-light-grey');
    //
    
    const  changeCurrency=this.props.changeCurrency
    const currency=this.props.currency

    return (
        <div className='currency-changer'>
          <p className='currency-changer__currency-symbol'>{currency}</p>
          <i 
              className={this.state.listIsShown?"fas fa-angle-up":  'fas fa-angle-down' }
              onClick={()=> this.setState({listIsShown:true}) }
          ></i>
        
        {this.state.listIsShown && <div className='currency-changer__list-of-prices' >
          
          <OutsideAlerterForCurrencyChanger currencyCloser={this.currencyCloser}>
            <>
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
            style={{backgroundColor: this.state.option1? `${colorLightGrey}` : `${colorWhite}`}}
            
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
            style={{backgroundColor: this.state.option2? `${colorLightGrey}` : `${colorWhite}`}}
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
            style={{backgroundColor: this.state.option3? `${colorLightGrey}` : `${colorWhite}`}}
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
            style={{backgroundColor: this.state.option4? `${colorLightGrey}` : `${colorWhite}`}}
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
            style={{backgroundColor: this.state.option5? `${colorLightGrey}` : `${colorWhite}`}}
          >
           ₽ RUB 
          </option>
          </>
          </OutsideAlerterForCurrencyChanger>
        </div>}
    </div>

    )
  }
}
