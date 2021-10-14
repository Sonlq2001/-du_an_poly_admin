import React from 'react';
import PopupOverlay from './../../../../components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveProduct.styles';
const RemoveProduct = ({ item, open, setOpen }) => {
  const handleRemoveProduct = () => {
    console.log('item  xóa product ', item);
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
