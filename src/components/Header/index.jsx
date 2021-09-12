import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Header(props) {
  const { logo } = props;
  return <header className={styles.header}>{logo}</header>;
}

Header.propTypes = {
  logo: PropTypes.node,
};

Header.defaultProps = {
  logo: '',
};

export default Header;
