import React from 'react';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveProduct.styles';
import { useDispatch } from 'react-redux';
import { removeProduct } from 'features/confirm/redux/product.slice';
import { toast } from 'react-toastify';
import { unwrapResult } from '@reduxjs/toolkit';
import _get from 'lodash.get';
const RemoveProduct = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();
  const handleRemoveProduct = () => {
    setOpen(false);
    dispatch(removeProduct(item?.id))
      .then(unwrapResult)
      .then(toast.success('Xóa thành công !'))
      .catch((err) => toast.error(_get('Thất Bại ! ', 'name[0]')))
      .finally(() => setOpen(false));
  };
  return (
    <PopupOverlay
      open={open}
      setOpen={setOpen}
      isAction
      onOk={handleRemoveProduct}
      textOk="Đồng ý"
    >
      <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
    </PopupOverlay>
  );
};

export default RemoveProduct;
