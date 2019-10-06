import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@chakra-ui/core';


function Chips({ index, value, onDelete }) {
  return (
    <div className="chips">
      <span>{value}</span>
      <Icon name="close" size=".7em" onClick={() => onDelete(index)} />
    </div>
  );
}

Chips.propTypes = {
  index: PropTypes.number.isRequired,
  value: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Chips;
