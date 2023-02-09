import React, { Component } from 'react'
import { FaArrowCircleDown } from 'react-icons/fa';
import {  gql } from "@apollo/client";
import {  graphql } from "react-apollo";
import { Link} from "react-router-dom"

const getAttributes= gql`
  query {
    categories {
    products {
      attributes {
        name
      }
    }
  }
}
`

class Filter extends Component {
    state={
        isOptionsShown: false,
        uniqueNameData0: JSON.parse(localStorage.getItem("attributesNames0"))? JSON.parse(localStorage.getItem("attributesNames0")):[],
        uniqueNameData1: JSON.parse(localStorage.getItem("attributesNames1"))? JSON.parse(localStorage.getItem("attributesNames1")):[],
        uniqueNameData2: JSON.parse(localStorage.getItem("attributesNames2"))? JSON.parse(localStorage.getItem("attributesNames2")):[]

    }
// to fetch attributes
    fetchAttributeNames(catNum, attributesNames, attributesState  ){
        let arr = this.props.data.categories[catNum].products.map(element =>element.attributes) 
        let uniqueNames = Array.from(new Set(arr.reduce((acc, val) => acc.concat(val.map(obj => obj.name)), [])));
        let attributeObjects =  uniqueNames.map(name => ({ name, isSelected: false }));
        localStorage.setItem(attributesNames, JSON.stringify(attributeObjects))
        this.setState({[attributesState]: attributeObjects})
    }

    componentDidUpdate(prevProp){
        if(!this.props.data.loading && prevProp.data !==this.props.data && 
            this.state.uniqueNameData0.length === 0  && this.state.uniqueNameData1.length === 0 
            && this.state.uniqueNameData2.length === 0 ){
            this.fetchAttributeNames(0, "attributesNames0", "uniqueNameData0"  )
            this.fetchAttributeNames(1, "attributesNames1", "uniqueNameData1"  )
            this.fetchAttributeNames(2, "attributesNames2", "uniqueNameData2"  )
        }
    }
//
// to select attributes

    selectAttribute(name, data, attributesNames, attributesState){
        let data0 = data
        let selectedElement = data0.find(element => element.name === name)
        let elseElements = data0.filter(element => element.name !== name)
        
        if(selectedElement.isSelected === true) {
            selectedElement.isSelected = false
        }else{
            selectedElement.isSelected = true
        }
        
        elseElements.forEach(element => element.isSelected = false)
        localStorage.setItem(attributesNames, JSON.stringify(data0))
        localStorage.setItem(attributesNames, JSON.stringify(data0))
        this.setState({[attributesState]: data0})
    }

//

   

  render() {
    const renderAttributes0 = this.state.uniqueNameData0.map(element => 
        
        <Link key={element.name} to={`/${this.props.categoryUrl}/${JSON.parse(localStorage.getItem("filterParameterUrlAll")) === element.name  ? "": element.name}`  } className="removeLinkDefaultStyle" >
        <div 
        onClick={()=>{
            this.selectAttribute(element.name, this.state.uniqueNameData0,  "attributesNames0", "uniqueNameData0" )
            this.props.reRenderListPageComp()
            this.props.changeFilterParameterUrl(this.state.uniqueNameData0)
        }}
        className = {element.isSelected?"giveDarkGreyBackgroundColor": "giveMediumGreyBackground"}
        >{element.name}
        
        </div>
        </Link>

        
    )
    
    
    const renderAttributes1 = this.state.uniqueNameData1.map(element => 
      
        <Link key={element.name} to={`/${this.props.categoryUrl}/${JSON.parse(localStorage.getItem("filterParameterUrlClothes")) === element.name  ? "": element.name}`  } className="removeLinkDefaultStyle" >
        <div key={element.name}
        onClick={()=>{
            this.selectAttribute(element.name, this.state.uniqueNameData1,  "attributesNames1", "uniqueNameData1" )
            this.props.reRenderListPageComp()
            this.props.changeFilterParameterUrl(this.state.uniqueNameData1)
        }}
        className = {element.isSelected?"giveDarkGreyBackgroundColor": "giveMediumGreyBackground"}
        >{element.name}</div></Link>
        
    
    )
    
    const renderAttributes2 = this.state.uniqueNameData2.map(element => 

        <Link key={element.name} to={`/${this.props.categoryUrl}/${JSON.parse(localStorage.getItem("filterParameterUrlTech")) === element.name  ? "": element.name}`  } className="removeLinkDefaultStyle" >
        <div key={element.name}
        onClick={()=>{
            this.selectAttribute(element.name, this.state.uniqueNameData2,  "attributesNames2", "uniqueNameData2" )
            this.props.reRenderListPageComp() 
            this.props.changeFilterParameterUrl(this.state.uniqueNameData2)
        }}
        className = {element.isSelected?"giveDarkGreyBackgroundColor": "giveMediumGreyBackground"}
        >{element.name}</div>
        </Link>

 )
    const category = this.props.category
    return (
      <div className='filter' onClick={()=>{this.setState({isOptionsShown: !this.state.isOptionsShown})}} >
          <div className='filter__heading-div'> 
            <h1>Filter by attributes</h1>
            <FaArrowCircleDown className='filter__icon'/>
         </div>
         {this.state.isOptionsShown && <div className='filter__options-div' >
            <>
            {category === 0 && renderAttributes0}
            {category === 1 && renderAttributes1}
            {category === 2 && renderAttributes2}
            </>
        </div>}
      </div>
    )
  }
}



export default graphql(getAttributes)(Filter);




