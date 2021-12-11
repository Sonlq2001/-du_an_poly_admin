import React from 'react';

import NoResult from 'assets/images/no-result.png';
import { GroupNoResult } from './NotFound.styles';

const NotFound = () => {
  return (
    <GroupNoResult>
      <div className="body-no-result">
        <img src={NoResult} alt="" className="img-no-result" />
        <div className="box-no-result">
          <div className="label-no-result">Không tìm thấy kết quả !</div>
        </div>
      </div>
    </GroupNoResult>
  );
};

export default NotFound;
