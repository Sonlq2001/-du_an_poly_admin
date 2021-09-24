import { createGlobalStyle } from "styled-components";

import NeueHass from "./../fonts/NHaasGroteskTXPro/NHaasGroteskTXPro-55Rg.ttf";

const FontsGlobal = createGlobalStyle(() => {
	return /*css*/ `
    @font-face {
      font-family: 'FontNeueHass';
      src: url(${NeueHass}) format('ttf'),
      }
  `;
});

export default FontsGlobal;
