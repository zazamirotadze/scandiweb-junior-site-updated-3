import React, { Component } from 'react'
import nodeid from 'node-id';


export default class RenderSwatchAttribute extends Component {

  render() {
     // color variebles
     const styles = window.getComputedStyle(document.documentElement);
     const colorGreen = styles.getPropertyValue('--color-green');
     const colorWhite = styles.getPropertyValue('--color-white');
     //
     const { attributes, selectMethod, attribute, classNameData, classNameDataMidGeneral, classNameDataGeneral } = this.props
     const object = attributes.find(element => element.type === attribute);
     const  renderOptions =  object && object.items.map((element) => {
         return (
 
            <div key={nodeid()} className= {classNameData}
            style={{
                background: `${element.displayValue}`,
                border: element.isSelected?`2px solid ${colorGreen}`:`2px solid ${colorWhite}`
                }} 
                onClick={ selectMethod ?  (event) =>{ selectMethod(element)  } : null }
                
            >
          
     </div>
 
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
