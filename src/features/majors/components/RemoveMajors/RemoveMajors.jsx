import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import PopupOverlay from '../../../../components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveMajors.styles';
import { removeMajors } from './../../redux/majors.slice';

const RemoveMajors = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();
  const handleRemoveMajors = () => {
    dispatch(removeMajors(item.id))
      .then(unwrapResult)
      .then(toast.success('Xóa chuyên ngành thành công !'));
    setOpen(false);
  };

  return (
    <>
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        isAction
        textOk="Đồng ý"
        onOk={handleRemoveMajors}
      >
        <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
      </PopupOverlay>
    </>
  );
};

export default RemoveMajors;
