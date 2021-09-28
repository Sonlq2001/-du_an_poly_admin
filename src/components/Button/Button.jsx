import React from "react";
import { Link } from "react-router-dom";

import { ButtonCustom } from "./Buttons.styles";

export const Button = ({ children, color, href, onClick, disabled, size }) => {
	let colorButton = "";
	switch (color) {
		case "warning":
			colorButton = "#FBB837";
			break;
		case "danger":
			colorButton = "#E54B3C";
			break;
		default:
			colorButton = "#3498DB";
	}

	let sizeButton = null;
	switch (size) {
		case "small":
			sizeButton = "1.4rem";
			break;
		case "large":
			sizeButton = "1.8rem";
			break;
		default:
			sizeButton = "1.6rem";
	}

	const isLink = href === undefined ? true : false;
	return isLink ? (
		<ButtonCustom
			color={colorButton}
			onClick={!disabled ? onClick : () => {}}
			size={sizeButton}
			disabled={disabled}
		>
			{children}
		</ButtonCustom>
	) : (
		<ButtonCustom color={colorButton} size={sizeButton}>
			<Link to={href}>{children}</Link>
		</ButtonCustom>
	);
};
