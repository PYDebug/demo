import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Button(props) {
  const { type = 'button', disable, className = '', onClick, style = {} } = props;
  return (
    <button type={type} disabled={disable} className={`${styles.button} ${className}`} style={style} onClick={onClick}>
      {props.children}
    </button>
  );
}

Button.propTypes = {
  type: PropTypes.string,
  disable: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
  children: PropTypes.node,
};

export default Button;
