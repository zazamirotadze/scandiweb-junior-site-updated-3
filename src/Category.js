import React, { Component } from 'react'
import {  gql } from "@apollo/client";
import {  graphql } from "react-apollo";



const getAllCategoryName = gql`
  query {
    categories {
    name
  }
}

`

class Category extends Component {
    componentDidMount(){
        setTimeout(() => {
        if(this.props.data.loading){
            console.log("zaza")
          }else{
            const setNameForAllCategory = this.props.setNameForAllCategory
            setNameForAllCategory(
                this.props.data.categories[0].name,
                this.props.data.categories[1].name,
                this.props.data.categories[2].name
            )
            
        }
    }, 500)
    }



  render() {
    
    return (
      <div></div>
    )
  }
}

export default graphql(getAllCategoryName)(Category);
