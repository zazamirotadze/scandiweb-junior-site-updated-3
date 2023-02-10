import nodeid from 'node-id';
 // color variebles
    const styles = window.getComputedStyle(document.documentElement);
    const colorBlack = styles.getPropertyValue('--color-black');
    const colorWhite = styles.getPropertyValue('--color-white');
//
export const checkBoxImplementation = (attributes, selectMethod, attribute, classNameData) => {
    const object = attributes.find(element => element.id === attribute);
    return object && object.items.map(element =>
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
    );
}