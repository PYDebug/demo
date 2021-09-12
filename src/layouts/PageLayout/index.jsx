import React from 'react';
import PropTypes from 'prop-types';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './index.module.scss';

function PageLayout(props) {
  return (
    <div className={styles.container}>
      <Header
        logo={
          <div>
            <span className={styles.logo}>BROCCOLI & CO.</span>
          </div>
        }
      />
      <div className={styles.content}>{props.children}</div>
      <Footer
        desc={
          <div className={styles.footerDesc}>
            <span className={styles.desc}>Made with ❤ in Melbourne</span>
            <span className={styles.desc}>
              © 2016 Broccoli & Co. All rights reserved
            </span>
          </div>
        }
      />
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default PageLayout;
