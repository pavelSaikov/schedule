import { Input, Modal } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useCallback, useEffect, FC } from 'react';

interface IAddPhotoModal {
  visible: boolean;
  onAddPhoto: (url: string) => void;
  onCancelClick: () => void;
}

export const AddPhotoModal: FC<IAddPhotoModal> = ({ visible, onAddPhoto, onCancelClick }) => {
  const [form] = useForm();

  useEffect(() => form.resetFields(), [form, visible]);

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then(({ url }) => onAddPhoto(url))
      .catch(() => {});
  }, [form, onAddPhoto]);

  const onCancel = useCallback(() => {
    onCancelClick();
  }, [onCancelClick]);

  return (
    <Modal title="Write photo url" visible={visible} forceRender centered onCancel={onCancel} onOk={onOk}>
      <Form form={form}>
        <FormItem
          name="url"
          label="Photo Url"
          rules={[{ required: true, message: 'Please, input photo url' }]}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};
