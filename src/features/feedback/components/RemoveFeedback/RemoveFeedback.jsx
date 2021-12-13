import React, { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveFeedback.styles';
import { deleteFeedback } from './../../redux/feedback.slice';

const RemoveFeedback = ({ item, open, setOpen }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    const response = await dispatch(deleteFeedback(item));
    if (deleteFeedback.fulfilled.match(response)) {
      toast.success('Xóa thành công !');
    } else {
      toast.error(response.payload);
    }
    setIsLoading(false);
    setOpen(false);
  };

  return (
    <>
      <PopupOverlay
        open={open}
        setOpen={setOpen}
        isAction
        textOk="Đồng ý"
        onOk={handleRemove}
        loading={isLoading}
      >
        <MessagePopup>Bạn có thực sư muốn xóa nội dung này !</MessagePopup>
      </PopupOverlay>
    </>
  );
};

export default memo(RemoveFeedback);
