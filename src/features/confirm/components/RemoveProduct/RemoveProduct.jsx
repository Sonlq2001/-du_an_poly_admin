import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveProduct.styles';
import { deleteProduct } from 'features/confirm/redux/product.slice';

const RemoveProduct = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveProduct = async () => {
    setIsLoading(true);
    const response = await dispatch(deleteProduct(item?.id));
    if (deleteProduct.fulfilled.match(response)) {
      toast.success('Xóa thành công !');
    } else {
      toast.error(response.payload);
    }
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <PopupOverlay
      open={open}
      setOpen={setOpen}
      isAction
      onOk={handleRemoveProduct}
      textOk="Đồng ý"
      loading={isLoading}
    >
      <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
    </PopupOverlay>
  );
};

export default RemoveProduct;
