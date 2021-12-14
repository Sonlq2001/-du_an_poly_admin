import React from 'react';

import { valueStatusProduct, labelRankAdmin } from 'constants/app.constants';
import { TextStyle } from './HightLightText.styles';

const HightLightText = ({ children, value, status }) => {
  let bgColor = null;
  if (value) {
    switch (value) {
      case labelRankAdmin.superAdmin:
        bgColor = '#b8daff';
        break;
      case labelRankAdmin.facultyChairman:
        bgColor = '#f5c6cb';
        break;
      case labelRankAdmin.teacher:
        bgColor = '#c3e6cb';
        break;
      case labelRankAdmin.ministry:
        bgColor = '#ffeeba';
        break;
      case 5:
        bgColor = '#bee5eb';
        break;
      default:
        bgColor = null;
    }
  }
  if (status) {
    switch (status) {
      case valueStatusProduct.one:
        bgColor = '#ffeeba';
        break;
      case valueStatusProduct.two:
        bgColor = '#f5c6cb';
        break;
      case valueStatusProduct.three:
        bgColor = '#c3e6cb';
        break;
      default:
        bgColor = null;
    }
  }

  return <TextStyle color={bgColor}>{children}</TextStyle>;
};

export default HightLightText;
