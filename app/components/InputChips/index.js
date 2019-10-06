/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@chakra-ui/core';
import Chips from './Chips';

import './index.scss';

function InputChips({ value, onChange }) {
  const [chips, setChips] = useState(value ? value.split(',') : []);
  const [formValue, setFormValue] = useState('');

  useEffect(() => {
    onChange(chips.join(','));
  }, [chips]);

  function onChipsDelete(index) {
    setChips(chips.filter((c, i) => i !== index));
  }

  function onInputChange({ target: { value: v } }) {
    if (v.indexOf(',') !== -1) {
      setFormValue('');
      // creation d'une chips dans l'input
      setChips([...chips, v.slice(0, v.length - 1)]);
    } else {
      setFormValue(v);
    }
  }

  return (
    <>
      <Input value={formValue} onChange={onInputChange} />
      <div className="chips-container">
        {chips.map((c, index) => <Chips onDelete={onChipsDelete} index={index} key={index} value={c} />)}
      </div>
    </>
  );
}

InputChips.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default InputChips;
