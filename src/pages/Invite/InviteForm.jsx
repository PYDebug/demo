/* eslint-disable indent */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Form from '@/components/Form';
import useRequest from '@/hooks/useRequest';
import styles from './index.module.scss';

function InviteForm(props) {
  const { onSuccess } = props;
  const [errMessage, setErrMessage] = useState('');

  const { loading, run } = useRequest((name, email) => ({
    url: 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
    method: 'post',
    data: { name, email },
  }));

  const handleSubmit = useCallback(
    async (values) => {
      setErrMessage('');
      // 处理提交表单
      const { name, email } = values;
      const res = await run(name, email);
      if (res && res.success) {
        onSuccess && onSuccess();
      } else {
        setErrMessage(res?.message);
      }
    },
    [onSuccess, run],
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: '必填',
          },
          {
            maxLen: 3,
            message: '最大长度为3',
          },
        ]}
      >
        <Input style={{ width: '100%' }} placeholder="Full Name" />
      </Form.Item>
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: '必填',
          },
          {
            pattern: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]+)$/,
            message: '邮箱格式不正确',
          },
        ]}
      >
        <Input style={{ width: '100%' }} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="reEmail"
        rules={[
          {
            validator:
              ({ getField }) =>
              (value) =>
                getField('email') === value,
            message: '必须和邮箱保持一致',
          },
        ]}
      >
        <Input style={{ width: '100%' }} placeholder="Confirm email" />
      </Form.Item>
      <div className={styles.submit}>
        <Button type="submit" disable={loading} style={{ width: '100%' }}>
          {loading ? 'Sending, please wait...' : 'Send'}
        </Button>
        {errMessage ? (
          <span className={styles.errorMessage}>{errMessage}</span>
        ) : null}
      </div>
    </Form>
  );
}

InviteForm.propTypes = {
  onSuccess: PropTypes.func,
};

export default InviteForm;
