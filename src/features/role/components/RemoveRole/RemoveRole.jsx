import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';

import PopupOverlay from '../../../../components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveRole.styles';
import { removeRoles } from './../../redux/role.slice';

const RemoveRole = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();
  const handleRemoveRole = () => {
    dispatch(removeRoles(item.id))
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
        onOk={handleRemoveRole}
      >
        <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
      </PopupOverlay>
    </>
  );
};

export default RemoveRole;
