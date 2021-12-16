import React, { useState } from 'react';

import { WrapApp } from './DefaultLayout.styles';
import Sidebar from './../../components/Sidebar/Sidebar';
import Navbar from './../../components/Navbar/Navbar';

const DefaultLayout = ({ children }) => {
  const [isShowBar, setIsShowBar] = useState(false);

  const handleShowBar = () => {
    setIsShowBar(!isShowBar);
  };

  return (
    <WrapApp>
      {isShowBar && (
        <div className="overlay" onClick={() => setIsShowBar(!isShowBar)}></div>
      )}

      <Sidebar isShowBar={isShowBar} clickBar={handleShowBar} />
      <div className="wrap-main">
        <Navbar clickBar={handleShowBar} />
        <div className="wrap-content">{children}</div>
      </div>
    </WrapApp>
  );
};

export default DefaultLayout;
