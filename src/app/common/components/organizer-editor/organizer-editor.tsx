import { Input, Modal } from 'antd';
import Form, { useForm } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import React, { useCallback, useEffect, FC } from 'react';

interface IOrganizerEditor {
  organizer: string;
  visible: boolean;
  onOrganizerEdit: (organizer: string) => void;
  onCancelClick: () => void;
}

export const OrganizerEditor: FC<IOrganizerEditor> = ({
  organizer,
  visible,
  onOrganizerEdit,
  onCancelClick,
}) => {
  const [form] = useForm();

  useEffect(() => form.setFieldsValue({ account: organizer }), [form, organizer]);

  const onOk = useCallback(() => {
    form
      .validateFields()
      .then(({ account }) => onOrganizerEdit(account))
      .catch(() => {});
  }, [form, onOrganizerEdit]);

  const onCancel = useCallback(() => {
    onCancelClick();
  }, [onCancelClick]);

  return (
    <Modal
      title="Edit organizer github account"
      visible={visible}
      forceRender
      centered
      onCancel={onCancel}
      onOk={onOk}
    >
      <Form form={form}>
        <FormItem
          name="account"
          label="Github account"
          rules={[{ required: true, message: 'Please, input organizer github account' }]}
        >
          <Input />
        </FormItem>
      </Form>
    </Modal>
  );
};
