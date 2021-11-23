import React from "react";

import { TextStyle } from "./HightLightText.styles";

const HightLightText = ({ children, value }) => {
	let bgColor = null;
	switch (value) {
		case 1:
			bgColor = "#b8daff";
			break;
		case 2:
			bgColor = "#f5c6cb";
			break;
		case 3:
			bgColor = "#c3e6cb";
			break;
		case 4:
			bgColor = "#ffeeba";
			break;
		case 5:
			bgColor = "#bee5eb";
			break;
		default:
			bgColor = null;
	}
	return <TextStyle color={bgColor}>{children}</TextStyle>;
};

export default HightLightText;
