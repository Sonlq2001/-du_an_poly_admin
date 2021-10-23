import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import PopupOverlay from '../../../../components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveSemester.styles';
import { removeSemester } from './../../redux/semester.slice';

const RemoveSemester = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();
  const handleRemoveSemester = () => {
    dispatch(removeSemester(item.id))
      .then(unwrapResult)
      .then(toast.success('Xóa thành công !'))
      .finally(() => setOpen(false));
  };

  return (
    <>
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        isAction
        textOk="Đồng ý"
        onOk={handleRemoveSemester}
      >
        <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
      </PopupOverlay>
    </>
  );
};

export default RemoveSemester;
