import React from 'react';
import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveProduct.styles';
import { useDispatch } from 'react-redux';
import { removeProduct } from 'features/confirm/redux/product.slice';
import { toast } from 'react-toastify';
import _get from 'lodash.get';
const RemoveProduct = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();
  const handleRemoveProduct = () => {
    setOpen(false);
    // const response = dispatch(removeProduct(item.id));
    // if (removeProduct.fulfilled.match(response)) {
    //   toast.success('Xóa  thành công !');
    //   setOpen(false);
    // } else {
    //   toast.error(_get(response.payload, 'name[0]'));
    // }
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
