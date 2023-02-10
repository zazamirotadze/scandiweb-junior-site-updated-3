import nodeid from 'node-id';
import React, {Component} from 'react';





export default class RenderOptions extends Component {
  render() {
    // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
    //

    
    const { attributes, selectMethod, attribute, classNameData, classNameDataGeneral } = this.props
    const object = attributes.find(element => element.id === attribute);
    const  renderOptions =  object && object.items.map((element) => {
        return (

          <option
            key={nodeid()}
            className={classNameData}
            onClick={(event) => {
              selectMethod(element)
            }}
            style={{
              background: element.isSelected ? `${colorBlack}` : ` ${colorWhite}`,
              color: element.isSelected ? `${colorWhite}` : `${colorBlack}`
            }}
          >
            {element.displayValue}
          </option>

        )
      
      }  

      );
     
    return (
      <>
     {renderOptions ? <div className={classNameDataGeneral}>
        {object.name} 
        <select size={object.items.length} >
          {renderOptions}
        </select>
      </div> : ""}
      </>
    );
  }
}

