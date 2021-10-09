import React from 'react';
import PopupOverlay from './../../../../components/PopupOverlay/PopupOverlay';

import { MessagePopup } from './RemoveSubject.styles';

const RemoveSubject = ({ item, open, setOpen }) => {
  return (
    <PopupOverlay open={open} setOpen={setOpen} isAction textOk="Đồng ý">
      <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
    </PopupOverlay>
  );
};

export default RemoveSubject;
