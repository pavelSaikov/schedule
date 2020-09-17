import './edit-broadcast-url-modal.scss';

import { Input } from 'antd';
import Modal from 'antd/lib/modal/Modal';
import React, { useCallback, useEffect, useState, FC, ChangeEvent } from 'react';

interface IBroadcastLinkModal {
  defaultLink: string;
  onConfirmClick: (newLink: string) => void;
  onCancelClick: () => void;
  visible: boolean;
}

export const EditBroadcastLinkModal: FC<IBroadcastLinkModal> = ({
  defaultLink,
  onConfirmClick,
  onCancelClick,
  visible,
}) => {
  const [link, setLink] = useState<string>(defaultLink);
  const [prevLink, setPrevLink] = useState<string>(defaultLink);

  const onLinkUpdate = useCallback((event: ChangeEvent<HTMLInputElement>) => setLink(event.target.value), []);
  const onOkClick = useCallback(() => onConfirmClick(link), [link, onConfirmClick]);

  useEffect(() => {
    setLink(defaultLink);
  }, [defaultLink, setLink]);

  useEffect(() => {
    if (prevLink === link) {
      return;
    }

    setLink(link);
    setPrevLink(link);
  }, [prevLink, link]);

  return (
    <Modal title="Edit Broadcast link" visible={visible} onCancel={onCancelClick} onOk={onOkClick} centered>
      <Input placeholder={'enter link'} value={prevLink} onChange={onLinkUpdate} />
    </Modal>
  );
};
