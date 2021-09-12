/* eslint-disable indent */
/* eslint-disable react/jsx-indent */
import React, { useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import closeImg from '@/icons/close.svg';
import styles from './index.module.scss';

const modalRootElement = document.createElement('div');
modalRootElement.setAttribute('id', 'modal-root');

function Modal(props) {
  const { visible, width, overLayClassName = '', onClose } = props;

  useLayoutEffect(() => {
    const root = document.getElementById('modal-root');

    if (!root) {
      document.body.appendChild(modalRootElement);
    }

    return () => {
      if (root) {
        document.body.removeChild(root);
      }
    };
  }, []);

  return visible
    ? ReactDOM.createPortal(
        <div className={styles.modal}>
          <div className={styles.mask} />
          <div className={styles.content}>
            <div
              className={`${styles.modalBox} ${overLayClassName}`}
              style={{ width }}
            >
              <img className={styles.close} src={closeImg} onClick={onClose} />
              {props.children}
            </div>
          </div>
        </div>,
        modalRootElement,
      )
    : null;
}

Modal.propTypes = {
  visible: PropTypes.bool,
  width: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  overLayClassName: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
