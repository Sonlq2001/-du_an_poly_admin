import { createGlobalStyle } from 'styled-components';
import ResetCss from './config/reset';
import Variables from './config/variables';

const GlobalStyle = createGlobalStyle(() => {
  return /*css*/ `
     ${ResetCss()}
     ${Variables()}
  `;
});

export default GlobalStyle;
