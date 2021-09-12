import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Input(props) {
  const { style = {}, placeholder, value = '', onChange } = props;
  const [rawValue, setRawValue] = useState(value);

  const handleChange = useCallback(
    (e) => {
      const val = e.target.value;
      setRawValue(val);
      onChange && onChange(val);
    },
    [onChange],
  );

  return (
    <input
      className={styles.input}
      style={style}
      placeholder={placeholder}
      value={rawValue}
      onChange={handleChange}
    />
  );
}

Input.propTypes = {
  style: PropTypes.objectOf(PropTypes.any),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
