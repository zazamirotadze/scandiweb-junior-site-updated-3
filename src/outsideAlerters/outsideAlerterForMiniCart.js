import React, { Component } from "react";
import PropTypes from "prop-types";

/**
 * Component that alerts if you click outside of it
 */
export default class OutsideAlerterForMiniCart extends Component {
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
    const miniCartCloser = this.props.miniCartCloser
    
    
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        miniCartCloser()
      }
    
  }

  render() {
    
    return <div ref={this.wrapperRef} style={{maxHeight: "510px"}}>{this.props.children}</div>;
  }
}

OutsideAlerterForMiniCart.propTypes = {
  children: PropTypes.element.isRequired
};
