import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Tag({ children }) {
  return (
    <div className="tag">
      {children}
    </div>
  );
}

Tag.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tag;
