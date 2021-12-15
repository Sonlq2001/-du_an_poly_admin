import React, { memo } from 'react';

import { LoadingPage } from './Loading.styles';

const Loading = ({ isFullScreen }) => {
  if (isFullScreen) {
    return (
      <LoadingPage isFullScreen={true}>
        <div className="loader" />
      </LoadingPage>
    );
  }
  return (
    <LoadingPage>
      <div className="loader" />
    </LoadingPage>
  );
};

export default memo(Loading);
