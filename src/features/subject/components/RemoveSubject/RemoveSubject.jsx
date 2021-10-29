import React from 'react';
import { removeSubject } from '../../redux/subject.slice';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';

import { MessagePopup } from './RemoveSubject.styles';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const RemoveSubject = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeSubject(item.id))
      .then(unwrapResult)
      .then(toast.success('Xóa môn học thành công !'))
      .finally(() => setOpen(false));
  };

  return (
    <PopupOverlay
      open={open}
      setOpen={setOpen}
      onOk={handleRemove}
      isAction
      textOk="Đồng ý"
    >
      <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
    </PopupOverlay>
  );
};

export default RemoveSubject;
