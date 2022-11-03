import React, { Component } from 'react'
import PropTypes from "prop-types";

export default class OutsideAlerterForPopUp extends Component {
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
        const popUpCloser = this.props.popUpCloser
        
        
          if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            popUpCloser()
          }
        
      }
    
      render() {
        
        return <div ref={this.wrapperRef} style={{height: "230px", width: "150px"}}>{this.props.children}</div>;
      }
    }
    
    OutsideAlerterForPopUp.propTypes = {
      children: PropTypes.element.isRequired
    };
    