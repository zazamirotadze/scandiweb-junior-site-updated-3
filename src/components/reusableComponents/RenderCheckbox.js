import React, { Component } from 'react'
import nodeid from 'node-id';




export default class RenderCheckbox extends Component {
  render() {
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
    //

    const { attributes, selectMethod, attribute, classNameData, classNameDataMidGeneral, classNameDataGeneral } = this.props
    const object = attributes.find(element => element.id === attribute);
    
    const  renderOptions =  object && object.items.map((element) => {
        
        return (

            <label
            key={nodeid()}
            className = {classNameData}
            style={{
              backgroundColor: element.isSelected ? `${colorBlack}` : `${colorWhite}`,
              color: element.isSelected ? `${colorWhite}`  : `${colorBlack}` ,
            }}
          >
            <input
              type="checkbox"
              checked={element.isSelected}
              onChange={selectMethod ? (event) => selectMethod(element) : null}
              readOnly={!selectMethod}
              style={{ display: "none" }}
            />
            <div>
              {element.displayValue}
            </div>
          </label>

        )
      
      }  

      );

    return (
        <>
        {renderOptions ? <div className={classNameDataGeneral}>
           {object.name} 
            <div className={classNameDataMidGeneral} >
                {renderOptions}
            </div>
         </div> : ""}
         </>
    )
  }
}
