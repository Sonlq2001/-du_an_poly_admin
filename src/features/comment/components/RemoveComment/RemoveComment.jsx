import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import PopupOverlay from 'components/PopupOverlay/PopupOverlay';
import { MessagePopup } from './RemoveComment.styles';
import { deleteComment } from './../../redux/comment.slice';

const RemoveComment = ({ item: id, open, setOpen }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);
    const response = await dispatch(deleteComment(23425));
    if (deleteComment.fulfilled.match(response)) {
      toast.success('Xóa thành công !');
    } else {
      toast.error(response.payload);
    }
    setOpen(false);
    setIsLoading(false);
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

export default RemoveComment;
