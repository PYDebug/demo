import React, { useState, useCallback } from 'react';
import PageLayout from '@/layouts/PageLayout';
import Button from '@/components/Button';
import InviteModal from './InviteModal';
import InviteForm from './InviteForm';
import styles from './index.module.scss';

function Invite() {
  const [inviteModalVisible, setInviteModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleInvite = useCallback(() => {
    setInviteModalVisible(true);
  }, []);

  const onInviteOk = useCallback(() => {
    setInviteModalVisible(false);
    setSuccessModalVisible(true);
  }, []);

  const closeInvite = useCallback(() => {
    setInviteModalVisible(false);
  }, []);

  const handleDone = useCallback(() => {
    setSuccessModalVisible(false);
  }, []);

  return (
    <PageLayout>
      <div className={styles.invite}>
        <div className={styles.content}>
          <span className={styles.mainTitle}>A better way</span>
          <span className={styles.mainTitle}>to enjoy every day.</span>
          <span className={styles.subTitle}>
            be the first to know when we launch.
          </span>
          <Button className={styles.openInvite} onClick={handleInvite}>
            Request an invite
          </Button>
        </div>
        <InviteModal
          visible={inviteModalVisible}
          title="Request an invite"
          onClose={closeInvite}
        >
          <InviteForm onSuccess={onInviteOk} />
        </InviteModal>
        <InviteModal
          visible={successModalVisible}
          title="All done!"
          onClose={handleDone}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <span className={styles.successText}>
              You will be one of the first to experience Broccoli & Co. when we
              launch
            </span>
            <Button onClick={handleDone} style={{ width: '100%' }}>
              OK
            </Button>
          </div>
        </InviteModal>
      </div>
    </PageLayout>
  );
}

export default Invite;
