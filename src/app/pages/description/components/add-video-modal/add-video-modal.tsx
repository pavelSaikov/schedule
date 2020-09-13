import { Input, Modal } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useCallback, useEffect, FC } from 'react';

interface IAddVideoModal {
  visible: boolean;
  onAddVideo: (url: string) => void;
  onCancelClick: () => void;
}

export const AddVideoModal: FC<IAddVideoModal> = ({ visible, onAddVideo, onCancelClick }) => {
  const [form] = useForm();

  useEffect(() => form.resetFields(), [form, visible]);

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then(({ url }) => onAddVideo(url))
      .catch(() => {});
  }, [form, onAddVideo]);

  const onCancel = useCallback(() => {
    onCancelClick();
  }, [onCancelClick]);

  return (
    <Modal
      title="Write youtube video url"
      visible={visible}
      forceRender
      centered
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form}>
        <FormItem
          name="url"
          label="Youtube Url"
          rules={[{ required: true, message: 'Please, input Youtube url' }]}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};
