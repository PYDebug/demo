import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.module.scss';

function Footer(props) {
  const { desc } = props;
  return <footer className={styles.footer}>{desc}</footer>;
}

Footer.propTypes = {
  desc: PropTypes.node,
};

export default Footer;
