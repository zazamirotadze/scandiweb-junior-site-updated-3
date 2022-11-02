import React, { Component } from 'react'
import PropTypes from "prop-types";

export default class OutsideAlerterForCurrencyChanger extends Component {
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
    
      /**
       * Alert if clicked on outside of element
       */
       
      handleClickOutside(event) {
        const currencyCloser = this.props.currencyCloser
        
        
          if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            currencyCloser()
          }
        
      }
    
      render() {
        
        return <div ref={this.wrapperRef}>{this.props.children}</div>;
      }
    }
    
OutsideAlerterForCurrencyChanger.propTypes = {
    children: PropTypes.element.isRequired
};
    