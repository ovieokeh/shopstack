import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setLimit } from '../../../actions/filterActions';
import Select from 'react-select';

const Limit = props => {
  const limitFilters = [
    { value: 10, label: 10 },
    { value: 20, label: 20 },
    { value: 50, label: 50 },
  ];
  const [productsPerPage, setProductsPerPage] = useState(limitFilters[1]);

  const handleLimitFilterSelect = selectedOption => {
    setProductsPerPage(selectedOption);
    props.setLimit(selectedOption.value);
    props.onFilterSelect && props.onFilterSelect();
  };

  return (
    <Select
      value={productsPerPage}
      onChange={handleLimitFilterSelect}
      options={limitFilters}
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
  );
};

const mapDispatchToProps = dispatch => ({
  setLimit: limit => dispatch(setLimit(limit)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Limit);
