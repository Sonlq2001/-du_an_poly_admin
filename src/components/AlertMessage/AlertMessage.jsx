import React, { memo } from 'react';
import { ToastContainer } from 'react-toastify';

import { GroupAlert } from './AlertMessage.styles';

const AlertMessage = () => {
  return (
    <GroupAlert>
      <ToastContainer
        autoClose={1500}
        position="top-right"
        toastClassName="alert-main"
      />
    </GroupAlert>
  );
};

export default memo(AlertMessage);
