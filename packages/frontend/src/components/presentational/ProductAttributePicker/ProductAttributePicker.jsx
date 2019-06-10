import React from 'react';
import Select from 'react-select';
import './ProductAttributePicker.scss';

const ProductAttributePicker = ({ attributes, handleAttributeSelect, selectedAttributes }) => {
  const sizeAttributes = attributes
    .filter(attribute => attribute.attribute_name === 'Size')
    .map(att => ({ value: att.attribute_value, label: att.attribute_value }));

  const colorAttributes = attributes
    .filter(attribute => attribute.attribute_name === 'Color')
    .map(att => ({ value: att.attribute_value, label: att.attribute_value }));

  return (
    <div className="attribute-picker-container">
      <div className="picker-group">
        <small>Size</small>
        <Select
          value={selectedAttributes[0]}
          className="attribute-picker"
          onChange={handleAttributeSelect}
          placeholder="Size"
          options={sizeAttributes}
          isSearchable={false}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#cacaca',
              primary25: '#e9e9e9',
            },
          })}
        />
      </div>

      <div className="picker-group">
        <small>Color</small>
        <Select
          value={selectedAttributes[1]}
          className="attribute-picker"
          onChange={handleAttributeSelect}
          placeholder="Color"
          options={colorAttributes}
          isSearchable={false}
          theme={theme => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary: '#cacaca',
              primary25: '#e9e9e9',
            },
          })}
        />
      </div>
    </div>
  );
};

export default ProductAttributePicker;
