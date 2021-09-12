import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@/components/Modal';
import styles from './index.module.scss';

function InviteModal(props) {
  const { visible, title = '', onClose } = props;

  return (
    <Modal
      visible={visible}
      overLayClassName={styles.inviteModal}
      onClose={onClose}
    >
      <div className={styles.modalTitle}>
        <span>{title}</span>
        <div className={styles.divider} />
      </div>
      {props.children}
    </Modal>
  );
}

InviteModal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default InviteModal;
