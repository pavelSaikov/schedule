import { Input } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import Modal from 'antd/lib/modal/Modal';
import React, { useCallback, FC } from 'react';

import { ILinkWithDescription } from '../../../../models/app.models';

interface ILinkEditor {
  linkWithDescription: ILinkWithDescription;
  isVisible: boolean;
  onSubmitClick: (link: ILinkWithDescription) => void;
  onCancelClick: () => void;
}

export const LinkEditor: FC<ILinkEditor> = ({ linkWithDescription, isVisible, onSubmitClick, onCancelClick }) => {
  const [form] = useForm();

  const onSubmit = useCallback(() => {
    form
      .validateFields()
      .then((values: ILinkWithDescription) => {
        form.resetFields();
        onSubmitClick(values);
      })
      .catch(() => {});
  }, []);

  const onCancel = useCallback(() => {
    form.resetFields();
    onCancelClick();
  }, []);

  return (
    <Modal title="Edit Link" visible={isVisible} centered okText={'Submit'} onCancel={onCancel} onOk={onSubmit}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{ linkDescription: linkWithDescription.linkDescription, url: linkWithDescription.url }}
      >
        <FormItem
          name="linkDescription"
          label="Link Description"
          rules={[{ required: true, message: 'Please input link description' }]}
        >
          <Input />
        </FormItem>
        <FormItem name="url" label="Url" rules={[{ required: true, message: 'Please input url' }]}>
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};
